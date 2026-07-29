/* AM Review Dashboard — loaded only when audit-form.html#dashboard */
(function () {
  'use strict';

  if ((location.hash || '') !== '#dashboard') return;

  var API_BASE = 'http://72.61.172.149/pbg-api';
  var AM_PIN = '2468';
  var REFRESH_MS = 60000;
  var LOCK_MS = 30000;
  var MAX_TRIES = 3;
  var SESSION_KEY = 'pbg_am_unlocked';

  var UPGRADE_META = [
    { key: 'type1', label: 'New Project Possible', costKey: 'type1' },
    { key: 'type2', label: 'Old Project Upgrade', costKey: 'type2' },
    { key: 'type3', label: 'Experience Table', costKey: 'type3' },
    { key: 'type4', label: 'New Branding', costKey: 'type4' },
    { key: 'type5', label: 'Hard POSM', costKey: 'type5' }
  ];

  var ASSET_LABELS = {
    'x-zone-island': 'X-Zone Island',
    'x-zone-backwall': 'X-Zone Backwall',
    'shop-in-shop': 'Shop-in-Shop',
    'shop-upgrade': 'Shop Upgrade',
    'customized-zone': 'Customized Zone',
    'ec-single-side': 'EC Single Side',
    'ec-double-side': 'EC Double Side',
    'ec-backwall': 'EC Backwall'
  };

  var PHOTO_LABELS = [
    'Entrance / Outside',
    'Left Side',
    'Right Side',
    'Straight / Front',
    'Competition View',
    'Space Available'
  ];

  var POSITION_SCORES = { '1': 10, '2': 7, '3': 4, '4+': 1, 'hidden': 0 };
  var SQFT_PTS = {
    none: 0, '1-20': 1, '21-50': 2, '51-75': 3,
    '76-100': 4, '101-120': 4.5, '121+': 5
  };

  var state = {
    unlocked: false,
    pinTries: 0,
    lockUntil: 0,
    lockTimer: null,
    audits: [],
    filter: 'all',
    current: null,
    changeLog: [],
    refreshTimer: null,
    bannerTimer: null
  };

  var els = {};

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fmtDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso);
    return d.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  function fmtTime(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso);
    return d.toLocaleString('en-IN', {
      day: '2-digit', month: 'short',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  function statusMeta(st) {
    var s = String(st || '').toLowerCase();
    if (s === 'approved') return { label: 'Approved', cls: 'st-approved' };
    if (s === 'sent_back') return { label: 'Sent Back', cls: 'st-sentback' };
    if (s === 'reopened') return { label: 'Reopened', cls: 'st-reopened' };
    return { label: 'Submitted', cls: 'st-submitted' };
  }

  function channelOf(a) {
    var fd = a.form_data || {};
    var store = (fd.s1 && fd.s1.store) || {};
    return store.channel || a.channel || '—';
  }

  function getByPath(obj, path) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function setByPath(obj, path, value) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      if (cur[parts[i]] == null || typeof cur[parts[i]] !== 'object') {
        cur[parts[i]] = {};
      }
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
  }

  function ensureFormData(a) {
    if (!a.form_data || typeof a.form_data !== 'object') a.form_data = {};
    if (!a.form_data.s0) a.form_data.s0 = {};
    if (!a.form_data.s1) a.form_data.s1 = {};
    if (!a.form_data.s2) a.form_data.s2 = {};
    if (!a.form_data.s3) a.form_data.s3 = {};
    if (!a.form_data.s4) a.form_data.s4 = {};
    if (!a.form_data.s6) a.form_data.s6 = {};
    if (!a.form_data.am_costs) a.form_data.am_costs = {};
    return a.form_data;
  }

  function tierPoints(assets) {
    assets = assets || [];
    var hasProject = assets.some(function (x) {
      return ['x-zone-island', 'x-zone-backwall', 'shop-in-shop',
        'shop-upgrade', 'customized-zone'].indexOf(x.type) !== -1;
    });
    if (hasProject) return { tier: 1, points: 30 };
    var totalEC = assets
      .filter(function (x) { return String(x.type || '').indexOf('ec-') === 0; })
      .reduce(function (sum, x) { return sum + (parseInt(x.qty, 10) || 0); }, 0);
    if (totalEC >= 2) return { tier: 2, points: 20 };
    if (totalEC === 1) return { tier: 3, points: 12 };
    return { tier: 0, points: 0 };
  }

  function sqftSide(sq, side) {
    if (!sq) return 'none';
    if (typeof sq === 'object') return sq[side] || 'none';
    return String(sq);
  }

  function assetListHtml(assets) {
    if (!assets || !assets.length) return '<span class="am-muted">None</span>';
    return assets.map(function (a) {
      var label = ASSET_LABELS[a.type] || a.type;
      var extra = [];
      if (a.size) extra.push(a.size);
      if (a.qty != null && a.qty !== '') extra.push('qty ' + a.qty);
      return '<span class="am-chip">' + esc(label) +
        (extra.length ? ' · ' + esc(extra.join(', ')) : '') + '</span>';
    }).join(' ');
  }

  function d1AssetsFromS2(s2) {
    if (s2.assets && s2.assets.length) return s2.assets;
    var out = [];
    if (s2.xZone && s2.xzoneSubtype) out.push({ type: s2.xzoneSubtype });
    if (s2.sis) out.push({ type: 'shop-in-shop' });
    if (s2.su) out.push({ type: 'shop-upgrade' });
    if (s2.cz) out.push({ type: 'customized-zone' });
    (s2.ecEntries || []).forEach(function (e) {
      if (e.subtype) out.push({ type: e.subtype, size: e.size, qty: e.qty });
    });
    return out;
  }

  function ackFlags(s2) {
    var flags = [];
    function push(on, reason, label) {
      if (on) flags.push({ label: label, reason: reason || 'Acknowledged' });
    }
    push(s2.xzoneAckCheck, s2.xzoneAckReason, 'X-Zone size mismatch');
    push(s2.sisAckCheck, s2.sisAckReason, 'SiS size mismatch');
    push(s2.suAckCheck, s2.suAckReason, 'Shop Upgrade size mismatch');
    push(s2.czAckCheck, s2.czAckReason, 'Customized Zone size mismatch');
    return flags;
  }

  function brandBattleHtml(name, brand, vivoAssets, vivoPos, vivoSqft) {
    if (!brand || !brand.present) {
      return (
        '<div class="am-subcard">' +
          '<div class="am-subhead">' + esc(name) + ' — Absent</div>' +
          '<div class="am-kv"><span>Battle score</span><strong>40 / 40 — Competitor absent</strong></div>' +
        '</div>'
      );
    }
    var assets = [];
    if (brand.xZone) assets.push({ type: brand.xzoneSubtype || 'x-zone-island' });
    if (brand.sis) assets.push({ type: 'shop-in-shop' });
    if (brand.su) assets.push({ type: 'shop-upgrade' });
    if (brand.cz) assets.push({ type: 'customized-zone' });
    if (brand.ec) assets.push({
      type: brand.ecSubtype || 'ec-single-side',
      qty: brand.ecQty
    });
    var sq = brand.brandingSqft;
    var inS = sqftSide(sq, 'inShop');
    var outS = sqftSide(sq, 'outShop');
    if (typeof sq === 'string') { inS = sq; outS = sq; }

    var detail = { score: '—', wins: '—', draws: '—', losses: '—' };
    if (window.PBG && window.PBG.calcBattleDetail) {
      detail = window.PBG.calcBattleDetail(
        vivoAssets,
        vivoPos,
        vivoSqft,
        {
          present: true,
          assets: assets,
          position: brand.position,
          sqft: typeof sq === 'object' ? sq : { inShop: inS, outShop: outS }
        }
      );
    }

    return (
      '<div class="am-subcard">' +
        '<div class="am-subhead">' + esc(name) + ' — Present</div>' +
        '<div class="am-kv"><span>Assets</span><div>' + assetListHtml(assets) + '</div></div>' +
        '<div class="am-kv"><span>Position</span><strong>' + esc(brand.position || '—') + '</strong></div>' +
        '<div class="am-kv"><span>In-shop sq.ft</span><strong>' + esc(inS) + '</strong></div>' +
        '<div class="am-kv"><span>Out-shop sq.ft</span><strong>' + esc(outS) + '</strong></div>' +
        '<div class="am-kv"><span>Battle score</span><strong>' + esc(detail.score) + '</strong></div>' +
        '<div class="am-kv"><span>W / D / L</span><strong>' +
          esc(detail.wins) + ' / ' + esc(detail.draws) + ' / ' + esc(detail.losses) +
        '</strong></div>' +
      '</div>'
    );
  }

  function fieldRow(label, path, value, opts) {
    opts = opts || {};
    var display = value == null || value === '' ? '—' : String(value);
    var amber = opts.amber ? ' am-amber' : '';
    return (
      '<div class="am-field-row' + amber + '" data-path="' + esc(path) + '">' +
        '<div class="am-field-label">' + esc(label) + '</div>' +
        '<div class="am-field-value">' +
          '<span class="am-field-text">' + esc(display) + '</span>' +
          (opts.noEdit ? '' :
            '<button type="button" class="am-edit-btn" title="Edit" aria-label="Edit ' + esc(label) + '">✎</button>') +
        '</div>' +
      '</div>'
    );
  }

  function buildShell() {
    document.documentElement.classList.add('am-mode');

    var root = document.createElement('div');
    root.id = 'amRoot';
    root.className = 'am-root';
    root.innerHTML =
      '<div id="amPinScreen" class="am-pin-screen">' +
        '<div class="am-pin-card">' +
          '<div class="am-logo">Vivo PBG</div>' +
          '<h1 class="am-pin-title">AM REVIEW DASHBOARD</h1>' +
          '<p class="am-pin-sub">Enter PIN to continue</p>' +
          '<input id="amPinInput" class="am-pin-input" type="password" inputmode="numeric" ' +
            'maxlength="4" autocomplete="off" aria-label="PIN" />' +
          '<button type="button" id="amPinEnter" class="am-pin-enter">ENTER</button>' +
          '<div id="amPinError" class="am-pin-error" role="alert"></div>' +
        '</div>' +
      '</div>' +

      '<div id="amDash" class="am-dash" hidden>' +
        '<div id="amBanner" class="am-banner" hidden></div>' +

        '<div id="amListView" class="am-list-view">' +
          '<header class="am-header">' +
            '<h1>PBG STORE AUDIT — AM REVIEW DASHBOARD</h1>' +
            '<p id="amListSub" class="am-header-sub">0 submissions</p>' +
          '</header>' +
          '<div class="am-tabs" id="amTabs" role="tablist">' +
            '<button type="button" class="am-tab active" data-filter="all">All</button>' +
            '<button type="button" class="am-tab" data-filter="submitted">Submitted</button>' +
            '<button type="button" class="am-tab" data-filter="approved">Approved</button>' +
            '<button type="button" class="am-tab" data-filter="sent_back">Sent Back</button>' +
          '</div>' +
          '<div class="am-table-wrap">' +
            '<table class="am-table">' +
              '<thead><tr>' +
                '<th>Store</th><th>Submitted by</th><th>Date</th>' +
                '<th>D1 / D2 / Total</th><th>Status</th><th>Action</th>' +
              '</tr></thead>' +
              '<tbody id="amTableBody"></tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +

        '<div id="amReviewView" class="am-review-view" hidden>' +
          '<button type="button" id="amBackBtn" class="am-back-btn">← Back to list</button>' +
          '<header class="am-review-header" id="amReviewHeader"></header>' +
          '<div id="amReviewBody"></div>' +
          '<div class="am-actions" id="amActions"></div>' +
          '<div class="am-changelog-wrap">' +
            '<h3 class="am-block-title">Change log</h3>' +
            '<div id="amChangeLog" class="am-changelog"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div id="amLightbox" class="am-lightbox" hidden>' +
        '<button type="button" class="am-lightbox-close" id="amLightboxClose">×</button>' +
        '<img id="amLightboxImg" alt="Photo full size" />' +
        '<div id="amLightboxCaption" class="am-lightbox-cap"></div>' +
      '</div>' +

      '<div id="amModal" class="am-modal" hidden>' +
        '<div class="am-modal-card" id="amModalCard"></div>' +
      '</div>';

    document.body.appendChild(root);

    els = {
      pinScreen: $('amPinScreen'),
      pinInput: $('amPinInput'),
      pinEnter: $('amPinEnter'),
      pinError: $('amPinError'),
      dash: $('amDash'),
      banner: $('amBanner'),
      listView: $('amListView'),
      listSub: $('amListSub'),
      tabs: $('amTabs'),
      tableBody: $('amTableBody'),
      reviewView: $('amReviewView'),
      backBtn: $('amBackBtn'),
      reviewHeader: $('amReviewHeader'),
      reviewBody: $('amReviewBody'),
      actions: $('amActions'),
      changeLog: $('amChangeLog'),
      lightbox: $('amLightbox'),
      lightboxImg: $('amLightboxImg'),
      lightboxCap: $('amLightboxCaption'),
      lightboxClose: $('amLightboxClose'),
      modal: $('amModal'),
      modalCard: $('amModalCard')
    };
  }

  function showBanner(msg, kind) {
    els.banner.hidden = false;
    els.banner.className = 'am-banner am-banner-' + (kind || 'ok');
    els.banner.textContent = msg;
    clearTimeout(state.bannerTimer);
    state.bannerTimer = setTimeout(function () {
      els.banner.hidden = true;
    }, 4500);
  }

  function setPinError(msg) {
    els.pinError.textContent = msg || '';
  }

  function updateLockUI() {
    var left = state.lockUntil - Date.now();
    if (left <= 0) {
      state.lockUntil = 0;
      state.pinTries = 0;
      els.pinEnter.disabled = false;
      els.pinInput.disabled = false;
      setPinError('');
      clearInterval(state.lockTimer);
      state.lockTimer = null;
      return;
    }
    els.pinEnter.disabled = true;
    els.pinInput.disabled = true;
    setPinError('Too many attempts. Try again in ' + Math.ceil(left / 1000) + 's');
  }

  function startLockout() {
    state.lockUntil = Date.now() + LOCK_MS;
    updateLockUI();
    clearInterval(state.lockTimer);
    state.lockTimer = setInterval(updateLockUI, 250);
  }

  function unlockDashboard() {
    state.unlocked = true;
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {}
    els.pinScreen.hidden = true;
    els.dash.hidden = false;
    showList();
    loadAudits();
    clearInterval(state.refreshTimer);
    state.refreshTimer = setInterval(loadAudits, REFRESH_MS);
  }

  function tryPin() {
    if (state.lockUntil > Date.now()) {
      updateLockUI();
      return;
    }
    var val = String(els.pinInput.value || '').replace(/\D/g, '').slice(0, 4);
    els.pinInput.value = val;
    if (val.length !== 4) {
      setPinError('Enter a 4-digit PIN');
      return;
    }
    if (val === AM_PIN) {
      setPinError('');
      unlockDashboard();
      return;
    }
    state.pinTries += 1;
    els.pinInput.value = '';
    if (state.pinTries >= MAX_TRIES) {
      startLockout();
      return;
    }
    setPinError('Incorrect PIN. ' + (MAX_TRIES - state.pinTries) + ' attempt(s) left.');
  }

  function annotateLivePending(rows) {
    var byStore = {};
    rows.forEach(function (a) {
      var code = a.store_code || '';
      if (!byStore[code]) byStore[code] = [];
      byStore[code].push(a);
    });
    var out = [];
    Object.keys(byStore).forEach(function (code) {
      var list = byStore[code].slice().sort(function (x, y) {
        return String(y.submitted_at || '').localeCompare(String(x.submitted_at || ''));
      });
      var hasApproved = list.some(function (a) {
        return String(a.status).toLowerCase() === 'approved';
      });
      var hasPending = list.some(function (a) {
        var s = String(a.status).toLowerCase();
        return s === 'submitted' || s === 'reopened';
      });
      list.forEach(function (a) {
        var copy = Object.assign({}, a);
        var st = String(a.status).toLowerCase();
        if (hasApproved && hasPending) {
          if (st === 'approved') copy._liveTag = 'live';
          else if (st === 'submitted' || st === 'reopened') copy._liveTag = 'pending';
        }
        out.push(copy);
      });
    });
    out.sort(function (a, b) {
      return String(b.submitted_at || '').localeCompare(String(a.submitted_at || ''));
    });
    return out;
  }

  function filteredRows() {
    var rows = annotateLivePending(state.audits);
    if (state.filter === 'all') return rows;
    return rows.filter(function (a) {
      return String(a.status || '').toLowerCase() === state.filter;
    });
  }

  function renderList() {
    var rows = filteredRows();
    els.listSub.textContent = state.audits.length + ' submission' +
      (state.audits.length === 1 ? '' : 's');

    if (!rows.length) {
      els.tableBody.innerHTML =
        '<tr><td colspan="6" class="am-empty">No submissions in this filter.</td></tr>';
      return;
    }

    els.tableBody.innerHTML = rows.map(function (a) {
      var st = statusMeta(a.status);
      var ch = channelOf(a);
      var tag = '';
      if (a._liveTag === 'live') {
        tag = '<span class="am-live-tag live"><span class="am-dot"></span> LIVE</span> ';
      } else if (a._liveTag === 'pending') {
        tag = '<span class="am-live-tag pending"><span class="am-dot"></span> PENDING</span> ';
      }
      return (
        '<tr data-id="' + esc(a.id) + '">' +
          '<td>' + tag + '<strong>' + esc(a.store_name || '—') + '</strong>' +
            ' <span class="am-ch-badge">' + esc(ch) + '</span></td>' +
          '<td>' + esc(a.ho_executive_name || '—') +
            '<div class="am-muted">' + esc(a.employee_id || '—') + '</div></td>' +
          '<td>' + esc(fmtDate(a.submitted_at)) + '</td>' +
          '<td>' + esc(a.d1_score) + ' / ' + esc(a.d2_score) + ' / <strong>' +
            esc(a.total_score) + '</strong></td>' +
          '<td><span class="am-status ' + st.cls + '">' + esc(st.label) + '</span></td>' +
          '<td><button type="button" class="am-review-btn" data-id="' +
            esc(a.id) + '">Review</button></td>' +
        '</tr>'
      );
    }).join('');
  }

  function loadAudits() {
    return fetch(API_BASE + '/audits', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('list ' + r.status);
        return r.json();
      })
      .then(function (rows) {
        state.audits = Array.isArray(rows) ? rows : [];
        if (!els.reviewView.hidden) return;
        renderList();
      })
      .catch(function () {
        if (els.listView && !els.listView.hidden) {
          els.tableBody.innerHTML =
            '<tr><td colspan="6" class="am-empty">Could not load submissions.</td></tr>';
        }
      });
  }

  function showList() {
    els.listView.hidden = false;
    els.reviewView.hidden = true;
    state.current = null;
    renderList();
  }

  function openReview(id) {
    fetch(API_BASE + '/audits/' + encodeURIComponent(id), { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('detail ' + r.status);
        return r.json();
      })
      .then(function (a) {
        state.current = a;
        state.changeLog = (Array.isArray(a.change_log) ? a.change_log : [])
          .filter(isReadableLogEntry);
        ensureFormData(a);
        els.listView.hidden = true;
        els.reviewView.hidden = false;
        renderReview();
      })
      .catch(function () {
        showBanner('Failed to load audit detail.', 'err');
      });
  }

  function formatLogValue(v) {
    if (v == null || v === '') return '—';
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    if (typeof v === 'number') return String(v);
    if (typeof v === 'object') return null;
    return String(v);
  }

  function isReadableLogEntry(e) {
    if (!e || !e.field) return false;
    var f = String(e.field);
    if (f === 'form_data' || f === 'photos') return false;
    if (typeof e.old_value === 'object' && e.old_value !== null) return false;
    if (typeof e.new_value === 'object' && e.new_value !== null) return false;
    return true;
  }

  function renderChangeLog() {
    var lines = (state.changeLog || []).filter(isReadableLogEntry);
    if (!lines.length) {
      els.changeLog.innerHTML = '<p class="am-muted">No field changes yet.</p>';
      return;
    }
    els.changeLog.innerHTML = lines.slice().reverse().map(function (e) {
      var t = e.timestamp || e.changed_at || '';
      var field = e.field || 'field';
      var oldV = formatLogValue(e.old_value);
      var newV = formatLogValue(e.new_value);
      return (
        '<div class="am-log-line">Field <strong>' + esc(field) +
        '</strong> changed from <em>' + esc(oldV) +
        '</em> to <em>' + esc(newV) +
        '</em> at ' + esc(fmtTime(t)) + '</div>'
      );
    }).join('');
  }

  function renderReview() {
    var a = state.current;
    var fd = ensureFormData(a);
    var s0 = fd.s0 || {};
    var s1 = fd.s1 || {};
    var store = s1.store || {};
    var s2 = fd.s2 || {};
    var s3 = fd.s3 || {};
    var s4 = fd.s4 || {};
    var s6 = fd.s6 || {};
    var costs = fd.am_costs || {};
    var st = statusMeta(a.status);
    var ch = channelOf(a);
    var assets = d1AssetsFromS2(s2);
    var tier = tierPoints(assets);
    var pos = s2.position || '';
    var posPts = POSITION_SCORES[pos] || 0;
    var inOn = !!s2.inshop;
    var outOn = !!s2.outshop;
    var inSq = sqftSide(s2.brandingSqft || s2.sqft, 'inShop');
    var outSq = sqftSide(s2.brandingSqft || s2.sqft, 'outShop');
    if (typeof (s2.brandingSqft || s2.sqft) === 'string') {
      inSq = s2.brandingSqft || s2.sqft || 'none';
      outSq = inSq;
    }
    var inPts = inOn ? 5 : 0;
    var outPts = outOn ? 5 : 0;
    var inSqPts = inOn ? (SQFT_PTS[inSq] || 0) : 0;
    var outSqPts = outOn ? (SQFT_PTS[outSq] || 0) : 0;
    var acks = ackFlags(s2);
    var vivoSqft = typeof s2.brandingSqft === 'object'
      ? s2.brandingSqft
      : { inShop: inSq, outShop: outSq };

    els.reviewHeader.innerHTML =
      '<div class="am-review-title">' +
        '<h2>' + esc(a.store_name || '—') + '</h2>' +
        '<span class="am-ch-badge">' + esc(ch) + '</span>' +
        '<span class="am-status ' + st.cls + '">' + esc(st.label) + '</span>' +
      '</div>' +
      '<p class="am-muted">Audit ID · ' + esc(a.id) + '</p>';

    var html = '';

    html += '<section class="am-card"><h3 class="am-block-title">Section A — Submission Summary</h3>';

    html += '<div class="am-block"><h4>Auditor Info</h4>';
    html += fieldRow('Employee ID', 's0.employeeId', s0.employeeId || a.employee_id);
    html += fieldRow('Name', 's0.name', s0.name || a.ho_executive_name);
    html += fieldRow('Phone', 's0.phone', s0.phone || a.ho_executive_phone);
    html += fieldRow('Audit Date', 's0.date', s0.date || a.audit_date);
    html += '</div>';

    html += '<div class="am-block"><h4>Store Info</h4>';
    html += fieldRow('Store Code', 's1.storeCode', s1.storeCode || a.store_code);
    html += fieldRow('Store Name', 'top.store_name', a.store_name);
    html += fieldRow('Chain', 's1.store.chain', store.chain, { noEdit: true });
    html += fieldRow('Channel', 's1.store.channel', store.channel || ch, { noEdit: true });
    html += fieldRow('Zone', 's1.store.zone', store.zone, { noEdit: true });
    html += fieldRow('Store Type', 's1.store.store_type', store.store_type, { noEdit: true });
    html += '</div>';

    html += '<div class="am-block"><h4>D1 — Vivo Brand Strength</h4>';
    html += '<div class="am-kv"><span>Asset types</span><div>' + assetListHtml(assets) + '</div></div>';
    if (s2.xZone) {
      html += fieldRow('X-Zone sub-type', 's2.xzoneSubtype', s2.xzoneSubtype);
      html += fieldRow('X-Zone sq.ft', 's2.xzoneSqft', s2.xzoneSqft);
    }
    if (s2.ec && (s2.ecEntries || []).length) {
      (s2.ecEntries || []).forEach(function (e, i) {
        html += fieldRow('EC #' + (i + 1) + ' sub-type', 's2.ecEntries.' + i + '.subtype', e.subtype);
        html += fieldRow('EC #' + (i + 1) + ' size', 's2.ecEntries.' + i + '.size', e.size);
        html += fieldRow('EC #' + (i + 1) + ' qty', 's2.ecEntries.' + i + '.qty', e.qty);
      });
    }
    if (acks.length) {
      acks.forEach(function (f) {
        html += '<div class="am-ack">⚠ ' + esc(f.label) + ': ' + esc(f.reason) + '</div>';
      });
    }
    html += fieldRow('Asset Tier', '_display.tier', 'Tier ' + tier.tier + ' · ' + tier.points + ' pts', { noEdit: true });
    html += fieldRow('Position', 's2.position', pos ? ('Pos ' + pos + ' · ' + posPts + ' pts') : '—');
    html += fieldRow('In-shop presence', 's2.inshop', inOn ? ('Yes · ' + inPts + ' pts') : 'No');
    html += fieldRow('In-shop sq.ft', 's2.brandingSqft.inShop', inSq + (inOn ? ' · ' + inSqPts + ' pts' : ''));
    html += fieldRow('Out-shop presence', 's2.outshop', outOn ? ('Yes · ' + outPts + ' pts') : 'No');
    html += fieldRow('Out-shop sq.ft', 's2.brandingSqft.outShop', outSq + (outOn ? ' · ' + outSqPts + ' pts' : ''));
    html += '<div class="am-total-line">D1 Total: <strong>' + esc(a.d1_score) + '</strong> / 60</div>';
    html += '</div>';

    html += '<div class="am-block"><h4>D2 — Fighting Score</h4>';
    html += brandBattleHtml('Samsung', s3.samsung, assets, pos, vivoSqft);
    html += brandBattleHtml('Apple', s3.apple, assets, pos, vivoSqft);
    html += '<div class="am-total-line">D2 Total: <strong>' + esc(a.d2_score) + '</strong> / 40</div>';
    html += '</div>';

    html += '<div class="am-block"><h4>Upgrade Assessment</h4>';
    UPGRADE_META.forEach(function (u) {
      var t = s4[u.key] || {};
      var yes = !!t.yes;
      html += '<div class="am-subcard">';
      html += '<div class="am-subhead">' + esc(u.label) + ' — ' + (yes ? 'Yes' : 'No') + '</div>';
      html += fieldRow('Possible?', 's4.' + u.key + '.yes', yes ? 'Yes' : 'No');
      if (yes) {
        if (u.key === 'type1' || u.key === 'type2') {
          html += fieldRow('Project type', 's4.' + u.key + '.projectType', t.projectType);
          html += fieldRow('X-Zone sub-type', 's4.' + u.key + '.xzoneSubtype', t.xzoneSubtype);
          html += fieldRow('Sq.ft', 's4.' + u.key + '.sqft', t.sqft);
          if (t.ackCheck) {
            html += '<div class="am-ack">⚠ Size ack: ' + esc(t.ackReason || 'Acknowledged') + '</div>';
          }
        } else if (u.key === 'type3') {
          html += fieldRow('Table type', 's4.type3.tableType', t.tableType);
          html += fieldRow('Size', 's4.type3.size', t.size);
          html += fieldRow('Qty', 's4.type3.qty', t.qty);
        } else if (u.key === 'type4') {
          html += fieldRow('Location', 's4.type4.location', t.location);
          html += fieldRow('In-shop type', 's4.type4.inshopType', t.inshopType);
          html += fieldRow('In-shop qty', 's4.type4.inshopQty', t.inshopQty);
          html += fieldRow('Out-shop type', 's4.type4.outshopType', t.outshopType);
          html += fieldRow('Out-shop qty', 's4.type4.outshopQty', t.outshopQty);
        } else if (u.key === 'type5') {
          html += fieldRow('Lit qty', 's4.type5.litQty', t.litQty);
          html += fieldRow('Pedestal qty', 's4.type5.pedestalQty', t.pedestalQty);
          html += fieldRow('MDF qty', 's4.type5.mdfQty', t.mdfQty);
          html += fieldRow('Other', 's4.type5.other', t.other);
        }
      }
      html += '</div>';
    });
    html += '</div>';

    html += '<div class="am-block"><h4>Photos</h4><div class="am-photo-grid">';
    var photos = Array.isArray(a.photos) ? a.photos : [];
    if (!photos.length) {
      html += '<p class="am-muted">No photos uploaded.</p>';
    } else {
      photos.forEach(function (url, i) {
        var label = PHOTO_LABELS[i] || ('Photo ' + (i + 1));
        html +=
          '<button type="button" class="am-photo-thumb" data-url="' + esc(url) +
          '" data-label="' + esc(label) + '">' +
            '<img src="' + esc(url) + '" alt="' + esc(label) + '" />' +
            '<span>' + esc(label) + '</span>' +
          '</button>';
      });
    }
    html += '</div></div>';

    html += '<div class="am-block"><h4>Remarks</h4>';
    html += fieldRow('Remarks', 's6.remarks', s6.remarks || '');
    html += '</div></section>';

    /* Section B — AM Actions */
    html += '<section class="am-card"><h3 class="am-block-title">Section B — AM Actions</h3>';
    html += '<div class="am-block"><h4>Upgrade costs (AM only)</h4>';
    var anyCost = false;
    var costSum = 0;
    UPGRADE_META.forEach(function (u) {
      var t = s4[u.key] || {};
      if (!t.yes) return;
      anyCost = true;
      var c = costs[u.costKey];
      var n = parseFloat(c);
      if (!isNaN(n)) costSum += n;
      html +=
        '<div class="am-cost-row" data-cost-key="' + esc(u.costKey) + '">' +
          '<label>' + esc(u.label) + '</label>' +
          '<div class="am-cost-input">' +
            '<span class="am-rupee">₹</span>' +
            '<input type="number" min="0" step="1" inputmode="numeric" ' +
              'value="' + esc(c == null ? '' : c) + '" data-cost="' + esc(u.costKey) + '" />' +
          '</div>' +
        '</div>';
    });
    if (!anyCost) {
      html += '<p class="am-muted">No upgrade types marked Yes. Cost fields appear when an upgrade is possible.</p>';
    } else {
      html += '<div class="am-cost-total" id="amCostTotal">Total Projected Upgrade Cost: ₹' +
        esc(Math.round(costSum)) + '</div>';
    }
    html += '</div></section>';

    els.reviewBody.innerHTML = html;

    var stLower = String(a.status || '').toLowerCase();
    var actions =
      '<button type="button" class="am-act am-act-approve" id="amBtnApprove">APPROVE</button>' +
      '<button type="button" class="am-act am-act-sendback" id="amBtnSendback">SEND BACK</button>';
    if (stLower === 'approved') {
      actions += '<button type="button" class="am-act am-act-reopen" id="amBtnReopen">REOPEN</button>';
    }
    els.actions.innerHTML = actions;

    renderChangeLog();
    bindReviewEvents();
  }

  function bindReviewEvents() {
    els.reviewBody.querySelectorAll('.am-edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        startInlineEdit(btn.closest('.am-field-row'));
      });
    });

    els.reviewBody.querySelectorAll('.am-photo-thumb').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openLightbox(btn.getAttribute('data-url'), btn.getAttribute('data-label'));
      });
    });

    els.reviewBody.querySelectorAll('input[data-cost]').forEach(function (inp) {
      inp.addEventListener('change', onCostChange);
      inp.addEventListener('input', updateCostSum);
    });

    var approve = $('amBtnApprove');
    var sendback = $('amBtnSendback');
    var reopen = $('amBtnReopen');
    if (approve) approve.addEventListener('click', confirmApprove);
    if (sendback) sendback.addEventListener('click', confirmSendback);
    if (reopen) reopen.addEventListener('click', confirmReopen);
  }

  function updateCostSum() {
    var totalEl = $('amCostTotal');
    if (!totalEl) return;
    var sum = 0;
    els.reviewBody.querySelectorAll('input[data-cost]').forEach(function (inp) {
      var n = parseFloat(inp.value);
      if (!isNaN(n)) sum += n;
    });
    totalEl.textContent = 'Total Projected Upgrade Cost: ₹' + Math.round(sum);
  }

  function onCostChange(e) {
    var key = e.target.getAttribute('data-cost');
    var raw = e.target.value;
    var val = raw === '' ? null : Number(raw);
    if (raw !== '' && isNaN(val)) return;
    var fd = ensureFormData(state.current);
    var old = fd.am_costs[key];
    if (old === val || (old == null && val == null)) return;
    fd.am_costs[key] = val;
    pushChange('am_costs.' + key, old, val);
    persistAudit();
    updateCostSum();
  }

  function startInlineEdit(row) {
    if (!row || row.querySelector('input.am-inline')) return;
    var path = row.getAttribute('data-path');
    var textEl = row.querySelector('.am-field-text');
    var cur = textEl.textContent;
    if (cur === '—') cur = '';
    /* Strip display suffixes like " · 10 pts" for editable raw values */
    var rawPath = path;
    var a = state.current;
    var fd = ensureFormData(a);
    var existing;
    if (path === 'top.store_name') existing = a.store_name;
    else if (path === 's2.inshop' || path === 's2.outshop' || path.indexOf('.yes') !== -1) {
      existing = getByPath(fd, path);
      cur = existing ? 'Yes' : 'No';
    } else if (path === 's2.position') {
      existing = fd.s2.position || '';
      cur = String(existing);
    } else if (path.indexOf('brandingSqft') !== -1) {
      existing = getByPath(fd, path);
      if (existing == null && typeof fd.s2.brandingSqft === 'string') {
        existing = fd.s2.brandingSqft;
      }
      cur = existing == null ? '' : String(existing);
    } else {
      existing = getByPath(fd, path);
      cur = existing == null ? '' : String(existing);
    }

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'am-inline';
    input.value = cur;
    textEl.hidden = true;
    textEl.parentNode.insertBefore(input, textEl);
    input.focus();
    input.select();

    function finish() {
      var next = input.value;
      input.removeEventListener('blur', finish);
      input.removeEventListener('keydown', onKey);
      if (!input.parentNode) return;
      input.parentNode.removeChild(input);
      textEl.hidden = false;
      applyFieldEdit(rawPath, existing, next, textEl);
    }
    function onKey(ev) {
      if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); }
      if (ev.key === 'Escape') {
        input.value = cur;
        input.blur();
      }
    }
    input.addEventListener('blur', finish);
    input.addEventListener('keydown', onKey);
  }

  function coerceYesNo(v) {
    var s = String(v || '').trim().toLowerCase();
    if (s === 'yes' || s === 'true' || s === '1') return true;
    if (s === 'no' || s === 'false' || s === '0' || s === '') return false;
    return !!s;
  }

  function applyFieldEdit(path, oldVal, nextRaw, textEl) {
    var a = state.current;
    var fd = ensureFormData(a);
    var next = nextRaw;

    if (path === 's2.inshop' || path === 's2.outshop' || /\.yes$/.test(path)) {
      next = coerceYesNo(nextRaw);
    }

    if (path === 'top.store_name') {
      if (String(a.store_name || '') === String(next)) {
        textEl.textContent = a.store_name || '—';
        return;
      }
      pushChange('store_name', a.store_name, next);
      a.store_name = next;
      textEl.textContent = next || '—';
      persistAudit({ store_name: next });
      return;
    }

    /* Normalize brandingSqft to object when editing a side */
    if (path === 's2.brandingSqft.inShop' || path === 's2.brandingSqft.outShop') {
      if (typeof fd.s2.brandingSqft !== 'object' || !fd.s2.brandingSqft) {
        var legacy = typeof fd.s2.brandingSqft === 'string' ? fd.s2.brandingSqft : (fd.s2.sqft || 'none');
        fd.s2.brandingSqft = { inShop: legacy, outShop: legacy };
      }
    }

    var prev = getByPath(fd, path);
    if (path === 's2.position') {
      next = String(nextRaw || '').trim();
    }

    if (String(prev) === String(next) && typeof prev !== 'boolean') {
      textEl.textContent = nextRaw === '' ? '—' : nextRaw;
      return;
    }
    if (typeof next === 'boolean' && prev === next) {
      textEl.textContent = next ? 'Yes' : 'No';
      return;
    }

    setByPath(fd, path, next);
    pushChange(path, prev, next);
    textEl.textContent = typeof next === 'boolean' ? (next ? 'Yes' : 'No') : (next === '' || next == null ? '—' : String(next));

    /* Sync top-level auditor mirrors */
    var patch = { form_data: fd };
    if (path === 's0.name') {
      a.ho_executive_name = next;
      patch.ho_executive_name = next;
    }
    if (path === 's0.phone') {
      a.ho_executive_phone = next;
      patch.ho_executive_phone = next;
    }
    if (path === 's0.employeeId') {
      a.employee_id = next;
      patch.employee_id = next;
    }
    if (path === 's1.storeCode') {
      a.store_code = next;
      patch.store_code = next;
    }

    persistAudit(patch).then(function () {
      /* Re-render so Yes upgrade cost fields appear */
      if (/\.yes$/.test(path) || path.indexOf('s2.') === 0 || path.indexOf('s4.') === 0) {
        renderReview();
      }
    });
  }

  function pushChange(field, oldVal, newVal) {
    if (field === 'form_data' || field === 'photos') return;
    if (typeof oldVal === 'object' && oldVal !== null) return;
    if (typeof newVal === 'object' && newVal !== null) return;
    state.changeLog.push({
      field: field,
      old_value: oldVal,
      new_value: newVal,
      timestamp: new Date().toISOString(),
      changed_by: 'HO AM'
    });
    state.changeLog = state.changeLog.filter(isReadableLogEntry);
    renderChangeLog();
  }

  function persistAudit(extra) {
    var a = state.current;
    var cleanLog = (state.changeLog || []).filter(isReadableLogEntry);
    state.changeLog = cleanLog;
    var body = Object.assign({
      form_data: a.form_data,
      change_log: cleanLog,
      changed_by: 'HO AM'
    }, extra || {});
    return fetch(API_BASE + '/audits/' + encodeURIComponent(a.id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(function (r) {
        if (!r.ok) throw new Error('save ' + r.status);
        return r.json();
      })
      .then(function (updated) {
        state.current = updated;
        ensureFormData(updated);
        var serverLog = Array.isArray(updated.change_log)
          ? updated.change_log.filter(isReadableLogEntry)
          : [];
        /* Older API may only echo form_data blobs — keep the field-level log we sent */
        state.changeLog = serverLog.length ? serverLog : cleanLog;
        renderChangeLog();
        return updated;
      })
      .catch(function () {
        showBanner('Failed to save changes.', 'err');
      });
  }

  function openLightbox(url, label) {
    els.lightboxImg.src = url;
    els.lightboxCap.textContent = label || '';
    els.lightbox.hidden = false;
  }

  function closeLightbox() {
    els.lightbox.hidden = true;
    els.lightboxImg.src = '';
  }

  function openModal(html) {
    els.modalCard.innerHTML = html;
    els.modal.hidden = false;
  }

  function closeModal() {
    els.modal.hidden = true;
    els.modalCard.innerHTML = '';
  }

  function confirmApprove() {
    openModal(
      '<h3>Approve submission?</h3>' +
      '<p>Approve this submission? Scores will go live in the CEO tool.</p>' +
      '<div class="am-modal-actions">' +
        '<button type="button" class="am-act am-act-approve" id="amModalConfirm">Confirm Approve</button>' +
        '<button type="button" class="am-act am-act-ghost" id="amModalCancel">Cancel</button>' +
      '</div>'
    );
    $('amModalCancel').addEventListener('click', closeModal);
    $('amModalConfirm').addEventListener('click', function () {
      var a = state.current;
      fetch(API_BASE + '/audits/' + encodeURIComponent(a.id) + '/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approved_by: 'HO AM',
          channel: channelOf(a)
        })
      })
        .then(function (r) {
          if (!r.ok) throw new Error('approve ' + r.status);
          return r.json();
        })
        .then(function () {
          closeModal();
          showBanner('Submission approved. Scores are live.', 'ok');
          return loadAudits().then(showList);
        })
        .catch(function () {
          showBanner('Approve failed.', 'err');
        });
    });
  }

  function confirmSendback() {
    openModal(
      '<h3>Send back</h3>' +
      '<p>Provide a reason for the HO Executive.</p>' +
      '<textarea id="amSendReason" class="am-reason" rows="4" placeholder="Reason (required)"></textarea>' +
      '<div class="am-modal-actions">' +
        '<button type="button" class="am-act am-act-sendback" id="amModalConfirm" disabled>Confirm Send Back</button>' +
        '<button type="button" class="am-act am-act-ghost" id="amModalCancel">Cancel</button>' +
      '</div>'
    );
    var reason = $('amSendReason');
    var confirmBtn = $('amModalConfirm');
    reason.addEventListener('input', function () {
      confirmBtn.disabled = !String(reason.value || '').trim();
    });
    $('amModalCancel').addEventListener('click', closeModal);
    confirmBtn.addEventListener('click', function () {
      var text = String(reason.value || '').trim();
      if (!text) return;
      var a = state.current;
      fetch(API_BASE + '/audits/' + encodeURIComponent(a.id) + '/sendback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: text, sent_by: 'HO AM' })
      })
        .then(function (r) {
          if (!r.ok) throw new Error('sendback ' + r.status);
          return r.json();
        })
        .then(function () {
          closeModal();
          showBanner('Submission sent back.', 'ok');
          return loadAudits().then(showList);
        })
        .catch(function () {
          showBanner('Send back failed.', 'err');
        });
    });
  }

  function confirmReopen() {
    openModal(
      '<h3>Reopen submission?</h3>' +
      '<p>Reopen this submission? Current live scores will remain until re-approved.</p>' +
      '<div class="am-modal-actions">' +
        '<button type="button" class="am-act am-act-reopen" id="amModalConfirm">Confirm Reopen</button>' +
        '<button type="button" class="am-act am-act-ghost" id="amModalCancel">Cancel</button>' +
      '</div>'
    );
    $('amModalCancel').addEventListener('click', closeModal);
    $('amModalConfirm').addEventListener('click', function () {
      var a = state.current;
      fetch(API_BASE + '/audits/' + encodeURIComponent(a.id) + '/reopen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
        .then(function (r) {
          if (!r.ok) throw new Error('reopen ' + r.status);
          return r.json();
        })
        .then(function () {
          closeModal();
          showBanner('Submission reopened.', 'ok');
          return loadAudits().then(showList);
        })
        .catch(function () {
          showBanner('Reopen failed.', 'err');
        });
    });
  }

  function bindGlobal() {
    els.pinEnter.addEventListener('click', tryPin);
    els.pinInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryPin();
    });
    els.pinInput.addEventListener('input', function () {
      els.pinInput.value = els.pinInput.value.replace(/\D/g, '').slice(0, 4);
    });

    els.tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.am-tab');
      if (!btn) return;
      state.filter = btn.getAttribute('data-filter');
      els.tabs.querySelectorAll('.am-tab').forEach(function (t) {
        t.classList.toggle('active', t === btn);
      });
      renderList();
    });

    els.tableBody.addEventListener('click', function (e) {
      var btn = e.target.closest('.am-review-btn');
      if (!btn) return;
      openReview(btn.getAttribute('data-id'));
    });

    els.backBtn.addEventListener('click', function () {
      showList();
      loadAudits();
    });

    els.lightboxClose.addEventListener('click', closeLightbox);
    els.lightbox.addEventListener('click', function (e) {
      if (e.target === els.lightbox) closeLightbox();
    });
    els.modal.addEventListener('click', function (e) {
      if (e.target === els.modal) closeModal();
    });
  }

  function boot() {
    buildShell();
    bindGlobal();
    var unlocked = false;
    try { unlocked = sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) {}
    if (unlocked) {
      unlockDashboard();
    } else {
      els.pinScreen.hidden = false;
      els.dash.hidden = true;
      setTimeout(function () { els.pinInput.focus(); }, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
