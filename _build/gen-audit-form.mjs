/**
 * Generator for audit-form.html — run once, then delete _build if desired.
 * Output: ../audit-form.html
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "audit-form.html");

const STORES = [
  { storeCode: "TND00157411", storeName: "Supreme Mobiles Tambaram 2", area: "Tambaram", district: "Chengalpattu", channel: "MT", lat: 12.9249, lng: 80.1000 },
  { storeCode: "TND092245", storeName: "Poorvika Appliances Mogappair", area: "Mogappair", district: "Chennai", channel: "MT", lat: 13.0838, lng: 80.1847 },
  { storeCode: "TND092270", storeName: "Poorvika Parrys3", area: "Parrys", district: "Chennai", channel: "MT", lat: 13.0878, lng: 80.2840 },
  { storeCode: "TND092281", storeName: "Poorvika Porur HIFI", area: "Porur", district: "Chennai", channel: "MT", lat: 13.0382, lng: 80.1565 },
  { storeCode: "TND092601", storeName: "Sangeetha Mobiles Anna Nagar", area: "Anna Nagar", district: "Chennai", channel: "MT", lat: 13.0850, lng: 80.2101 },
  { storeCode: "TND00137364", storeName: "Poorvika Appliances Porur", area: "Porur", district: "Chennai", channel: "MT", lat: 13.0365, lng: 80.1550 },
  { storeCode: "TND092367", storeName: "Poorvika Appliances Shanthi Colony", area: "Anna Nagar", district: "Chennai", channel: "MT", lat: 13.0825, lng: 80.2080 },
  { storeCode: "TND101609", storeName: "Poorvika Appliances Kodambakkam", area: "Kodambakkam", district: "Chennai", channel: "MT", lat: 13.0520, lng: 80.2210 },
  { storeCode: "TND091846", storeName: "Chennai Mobiles OMR", area: "OMR", district: "Chennai", channel: "MT", lat: 12.9500, lng: 80.2400 },
  { storeCode: "TND091857", storeName: "Chennai Mobiles Porur", area: "Porur", district: "Chennai", channel: "MT", lat: 13.0370, lng: 80.1575 },
  { storeCode: "TND092338", storeName: "Poorvika Triplicane", area: "Triplicane", district: "Chennai", channel: "MT", lat: 13.0580, lng: 80.2750 },
  { storeCode: "TND091833", storeName: "Chennai Mobiles Kelambakkam", area: "Kelambakkam", district: "Chengalpattu", channel: "MT", lat: 12.7880, lng: 80.2200 },
  { storeCode: "TND084801", storeName: "Mayur Mobiles", area: "Chennai Central", district: "Chennai", channel: "GT", lat: 13.0827, lng: 80.2707 },
  { storeCode: "TND087865", storeName: "Sun Mobiles Tiruttani", area: "Tiruttani", district: "Tiruvallur", channel: "GT", lat: 13.1750, lng: 79.6110 },
  { storeCode: "TND128851", storeName: "Poorvika Appliances Thiruvallur", area: "Thiruvallur", district: "Tiruvallur", channel: "MT", lat: 13.1439, lng: 79.9090 },
  { storeCode: "TND091901", storeName: "Croma Mount Road", area: "Mount Road", district: "Chennai", channel: "MT", lat: 13.0600, lng: 80.2600 },
  { storeCode: "TND093040", storeName: "Vasanth Co Tambaram", area: "Tambaram", district: "Chengalpattu", channel: "MT", lat: 12.9220, lng: 80.1270 },
  { storeCode: "TND128836", storeName: "Poorvika Appliances Poonmalle", area: "Poonamallee", district: "Chennai", channel: "MT", lat: 13.0470, lng: 80.0950 },
  { storeCode: "TND092175", storeName: "Poorvika Kumananchavadi", area: "Kumananchavadi", district: "Chennai", channel: "MT", lat: 13.0500, lng: 80.1100 },
  { storeCode: "TND091811", storeName: "Chennai Mobiles Anna Nagar", area: "Anna Nagar", district: "Chennai", channel: "MT", lat: 13.0870, lng: 80.2180 },
  { storeCode: "TND091838", storeName: "Chennai Mobiles Medavakkam", area: "Medavakkam", district: "Chennai", channel: "MT", lat: 12.9200, lng: 80.1920 },
  { storeCode: "TND092096", storeName: "Poorvika Adyar", area: "Adyar", district: "Chennai", channel: "MT", lat: 13.0067, lng: 80.2570 },
  { storeCode: "TND092258", storeName: "Poorvika Appliances Old Washermenpet", area: "Washermenpet", district: "Chennai", channel: "MT", lat: 13.1100, lng: 80.2900 },
  { storeCode: "TND092130", storeName: "Poorvika Chengalpet HIFI", area: "Chengalpattu", district: "Chengalpattu", channel: "MT", lat: 12.6819, lng: 79.9888 },
  { storeCode: "TND092191", storeName: "Poorvika Medavakkam", area: "Medavakkam", district: "Chennai", channel: "MT", lat: 12.9170, lng: 80.1910 },
  { storeCode: "TND092294", storeName: "Poorvika Redhills", area: "Redhills", district: "Chennai", channel: "MT", lat: 13.1900, lng: 80.1900 },
  { storeCode: "TND092316", storeName: "Poorvika Tambaram West", area: "Tambaram", district: "Chengalpattu", channel: "MT", lat: 12.9240, lng: 80.1100 },
  { storeCode: "TND092118", storeName: "Poorvika Appliances Avadi", area: "Avadi", district: "Chennai", channel: "MT", lat: 13.1143, lng: 80.1018 },
  { storeCode: "TND091814", storeName: "Chennai Mobiles Ashok Nagar", area: "Ashok Nagar", district: "Chennai", channel: "MT", lat: 13.0350, lng: 80.2120 },
  { storeCode: "TND092371", storeName: "Pothys Hyper Chrompet", area: "Chrompet", district: "Chengalpattu", channel: "GT", lat: 12.9516, lng: 80.1400 }
].map((s) => ({ ...s, storeId: s.storeCode, gpsRadiusM: 500, active: true, phase: 1 }));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" />
<meta name="theme-color" content="#0a0a0f" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<title>PBG Store Audit Form</title>
<style>
:root {
  --bg: #0a0a0f;
  --gold: #C9A84C;
  --text: #ffffff;
  --muted: #999999;
  --card: rgba(255,255,255,0.045);
  --border: rgba(201,168,76,0.35);
  --danger: #ef4444;
  --ok: #22c55e;
  --warn: #eab308;
  --glass-blur: 14px;
  --tap: 44px;
  --radius: 12px;
  --font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--bg); color: var(--text); font-family: var(--font); min-height: 100%; }
body {
  background:
    radial-gradient(ellipse at 20% 0%, rgba(201,168,76,0.08), transparent 50%),
    radial-gradient(ellipse at 80% 100%, rgba(201,168,76,0.05), transparent 40%),
    linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 50%, #100d08 100%);
  background-attachment: fixed;
}
button, input, select, textarea { font: inherit; color: inherit; }
button { cursor: pointer; }
.hidden { display: none !important; }
#app { max-width: 560px; margin: 0 auto; min-height: 100vh; padding: 0 0 96px; position: relative; }

/* Top bar */
.topbar {
  position: sticky; top: 0; z-index: 40;
  backdrop-filter: blur(var(--glass-blur));
  background: rgba(10,10,15,0.85);
  border-bottom: 1px solid var(--border);
  padding: 10px 16px 12px;
}
.topbar-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.brand { font-size: 13px; letter-spacing: 0.08em; color: var(--gold); font-weight: 700; text-transform: uppercase; }
.role-chip { font-size: 11px; color: var(--muted); border: 1px solid var(--border); padding: 4px 8px; border-radius: 999px; }
.progress-wrap { margin-top: 10px; }
.progress-meta { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); margin-bottom: 4px; }
.progress-track { height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--gold); width: 0%; transition: width .25s ease; }
.sync-banner {
  display: none; margin-top: 8px; font-size: 12px; padding: 8px 10px; border-radius: 8px;
  border: 1px solid var(--border); background: var(--card);
}
.sync-banner.show { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.sync-banner.warn { border-color: rgba(234,179,8,.5); color: var(--warn); }
.sync-banner.ok { border-color: rgba(34,197,94,.4); color: var(--ok); }
.sync-banner.err { border-color: rgba(239,68,68,.5); color: var(--danger); }

/* Screens */
.screen { padding: 20px 16px; animation: fadeIn .25s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
h1 { font-size: 22px; margin: 0 0 8px; font-weight: 650; }
h2 { font-size: 16px; margin: 0 0 12px; color: var(--gold); font-weight: 600; }
h3 { font-size: 14px; margin: 0 0 10px; color: var(--gold); }
.sub { color: var(--muted); font-size: 13px; margin: 0 0 20px; line-height: 1.45; }
.gold-rule { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin: 20px 0; border: 0; }

/* Cards / glass */
.card {
  background: var(--card);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 12px;
}
.role-grid { display: grid; gap: 12px; }
.role-btn, .primary-btn, .ghost-btn, .danger-btn, .chip-btn {
  min-height: var(--tap); border-radius: 10px; border: 1.5px solid var(--gold);
  padding: 12px 16px; width: 100%; display: flex; align-items: center; justify-content: center;
  gap: 8px; transition: background .15s, transform .1s;
}
.role-btn, .primary-btn { background: var(--gold); color: #0a0a0f; font-weight: 700; }
.role-btn:active, .primary-btn:active { transform: scale(0.98); }
.ghost-btn { background: transparent; color: var(--gold); }
.danger-btn { background: transparent; color: var(--danger); border-color: var(--danger); }
.chip-btn { width: auto; display: inline-flex; padding: 8px 12px; font-size: 12px; background: transparent; color: var(--gold); }
.role-btn .hint { display: block; font-size: 11px; font-weight: 500; opacity: .75; margin-top: 2px; }
.role-btn { flex-direction: column; align-items: flex-start; text-align: left; }

/* Form controls */
.field { margin-bottom: 14px; }
.field label { display: block; font-size: 13px; margin-bottom: 6px; color: #ddd; }
.field .req { color: var(--gold); }
.field input[type="text"],
.field input[type="tel"],
.field input[type="date"],
.field input[type="password"],
.field input[type="number"],
.field select,
.field textarea {
  width: 100%; min-height: var(--tap); padding: 10px 12px;
  background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px; outline: none;
}
.field textarea { min-height: 96px; resize: vertical; }
.field input:focus, .field select:focus, .field textarea:focus { border-color: var(--gold); }
.field .readonly {
  min-height: var(--tap); display: flex; align-items: center; padding: 10px 12px;
  background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 10px; color: var(--muted); font-size: 14px;
}
.yn { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.yn button, .opt-grid button {
  min-height: var(--tap); border-radius: 10px; border: 1px solid rgba(255,255,255,0.15);
  background: rgba(0,0,0,0.3); color: #ccc; padding: 8px 10px; text-align: left; font-size: 13px;
}
.yn button.active, .opt-grid button.active {
  border-color: var(--gold); background: rgba(201,168,76,0.15); color: var(--gold); font-weight: 600;
}
.opt-grid { display: grid; gap: 8px; }
.ref-box {
  margin: 8px 0 12px; min-height: 110px; border: 1px dashed rgba(255,255,255,0.2);
  border-radius: 10px; background: rgba(255,255,255,0.04);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: var(--muted); font-size: 11px; gap: 4px; padding: 12px; text-align: center;
}
.ref-box strong { color: #bbb; font-size: 12px; font-weight: 600; }
.section-title {
  display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
  margin: 8px 0 14px;
}
.section-title .max { font-size: 11px; color: var(--muted); }
.nav-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
.nav-row .primary-btn, .nav-row .ghost-btn { width: 100%; }
.list-item {
  display: flex; flex-direction: column; gap: 4px; text-align: left;
  width: 100%; min-height: var(--tap); padding: 12px; margin-bottom: 8px;
  background: var(--card); border: 1px solid var(--border); border-radius: 10px; color: inherit;
}
.list-item .meta { font-size: 12px; color: var(--muted); }
.status-pill {
  display: inline-block; font-size: 10px; letter-spacing: .04em; text-transform: uppercase;
  padding: 3px 8px; border-radius: 999px; border: 1px solid var(--border); color: var(--gold);
}
.kpi-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 14px; }
.kpi { padding: 12px; border-radius: 10px; border: 1px solid var(--border); background: var(--card); }
.kpi .n { font-size: 22px; color: var(--gold); font-weight: 700; }
.kpi .l { font-size: 11px; color: var(--muted); margin-top: 2px; }
.photo-cat { margin-bottom: 16px; }
.photo-thumbs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.photo-thumb {
  width: 88px; height: 88px; border-radius: 8px; overflow: hidden; position: relative;
  border: 1px solid var(--border); background: #111;
}
.photo-thumb img { width: 100%; height: 100%; object-fit: cover; }
.photo-thumb .rm {
  position: absolute; top: 2px; right: 2px; width: 28px; height: 28px; border: 0;
  border-radius: 50%; background: rgba(0,0,0,.7); color: #fff; font-size: 14px;
}
.toast {
  position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%) translateY(120%);
  background: #1a1a22; border: 1px solid var(--gold); color: #fff; padding: 12px 16px;
  border-radius: 10px; z-index: 100; max-width: 90vw; font-size: 13px; transition: transform .25s;
  box-shadow: 0 8px 32px rgba(0,0,0,.5);
}
.toast.show { transform: translateX(-50%) translateY(0); }
.modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.65); z-index: 80;
  display: flex; align-items: flex-end; justify-content: center; padding: 16px;
}
.modal {
  width: 100%; max-width: 480px; background: #12121a; border: 1px solid var(--border);
  border-radius: 16px 16px 12px 12px; padding: 18px; max-height: 80vh; overflow: auto;
}
.modal h3 { margin-bottom: 8px; }
.score-preview {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 12px 0;
  font-size: 12px; text-align: center;
}
.score-preview div { padding: 8px 4px; border: 1px solid var(--border); border-radius: 8px; background: var(--card); }
.score-preview strong { display: block; color: var(--gold); font-size: 16px; }
.change-log { font-size: 11px; color: var(--muted); max-height: 160px; overflow: auto; }
.change-log div { padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.footer-actions {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 30;
  padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
  background: rgba(10,10,15,0.92); backdrop-filter: blur(14px);
  border-top: 1px solid var(--border); max-width: 560px; margin: 0 auto;
}
@media (min-width: 561px) {
  .footer-actions { left: 50%; transform: translateX(-50%); width: 560px; }
}
.err-text { color: var(--danger); font-size: 12px; margin-top: 4px; }
.offline-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ok); display: inline-block; }
.offline-dot.off { background: var(--danger); }
</style>
</head>
<body>
<div id="app">
  <div class="topbar">
    <div class="topbar-row">
      <div class="brand">PBG · Store Audit</div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="offline-dot" id="netDot" title="Network"></span>
        <span class="role-chip" id="roleChip">Select role</span>
      </div>
    </div>
    <div class="progress-wrap hidden" id="progressWrap">
      <div class="progress-meta"><span id="progressLabel">Form progress</span><span id="progressPct">0%</span></div>
      <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
    </div>
    <div class="sync-banner" id="syncBanner">
      <span id="syncText">Offline — drafts saved locally</span>
      <button type="button" class="chip-btn" id="retrySyncBtn">Retry sync</button>
    </div>
  </div>

  <div id="screens"></div>
</div>
<div class="toast" id="toast"></div>
<div id="modalRoot"></div>

<script type="module">
/* ========== Firebase config — replace before production deploy ========== */
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
const FIREBASE_READY = FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.startsWith("YOUR_");

/* Demo PIN map used when Firebase is not configured.
   Production: PIN signs into Firebase Auth email accounts mapped in users collection. */
const DEMO_PINS = {
  "2468": { role: "AM", displayName: "Area Manager", email: "am@pbg.local" },
  "1357": { role: "SK", displayName: "SK Management", email: "sk@pbg.local" },
  "9999": { role: "CEO", displayName: "CEO", email: "ceo@pbg.local" }
};

const STORE_MASTER = ${JSON.stringify(STORES, null, 2)};

const STATUS = {
  LocalDraft: "Local Draft",
  ReadyToSubmit: "Ready to Submit",
  Syncing: "Syncing",
  SubmittedToHO: "Submitted to HO",
  HOReviewed: "HO Reviewed",
  SubmittedToAM: "Submitted to AM",
  AMApproved: "AM Approved",
  PendingSKValidation: "Pending SK Validation",
  Validated: "Validated",
  Flagged: "Flagged",
  SentBack: "Sent Back",
  FailedSync: "Failed Sync"
};

const PHOTO_CATS = [
  { id: "PH-01", label: "Main Signage Board exterior", min: 1, max: 2, required: () => true },
  { id: "PH-02", label: "Store entrance / exterior wide shot", min: 1, max: 2, required: () => true },
  { id: "PH-03", label: "Store interior wide shot", min: 1, max: 1, required: () => true },
  { id: "PH-04", label: "Vivo primary in-store asset", min: 1, max: 3, required: (f) => ["D1B-01","D1B-02","D1B-03","D1B-04"].some(k => f[k] === "Yes") },
  { id: "PH-05", label: "Competitor Samsung in-store presence", min: 1, max: 2, required: (f) => f["D2-S-01"] === "Yes" },
  { id: "PH-06", label: "Competitor Apple in-store presence", min: 1, max: 2, required: (f) => f["D2-A-01"] === "Yes" },
  { id: "PH-07", label: "Vivo visibility branding", min: 1, max: 2, required: (f) => f["D1C-01"] === "Yes" || f["D1C-02"] === "Yes" }
];

const REF = {
  "SI-09": ["ref/SI-09-type1.jpg","ref/SI-09-type2.jpg","ref/SI-09-type3.jpg","ref/SI-09-type4.jpg"],
  "D1A-02": ["ref/D1A-02-header1.jpg","ref/D1A-02-header2.jpg","ref/D1A-02-header3.jpg"],
  "D1B-01": ["ref/D1B-01.jpg"],
  "D1B-02": ["ref/D1B-02.jpg"],
  "D1B-03": ["ref/D1B-03.jpg"],
  "D1B-04": ["ref/D1B-04.jpg"],
  "D1B-05": ["ref/D1B-05-pos1.jpg","ref/D1B-05-pos2.jpg","ref/D1B-05-pos3.jpg","ref/D1B-05-pos4.jpg","ref/D1B-05-notvisible.jpg"],
  "D1C-05": ["ref/D1C-05-yes.jpg","ref/D1C-05-no.jpg"],
  "D2-06": ["ref/D2-06-large.jpg","ref/D2-06-medium.jpg","ref/D2-06-small.jpg"]
};

/* ========== Scoring engine ========== */
const MSB_RANK = { "Header 1": 3, "Header 2": 2, "Header 3 or below": 1, "Not present on board": 0 };
const TIER_RANK = { "Special Projects": 4, "Zone equivalent": 3, "Asset Presence": 2, "Domestic Elements": 1, "None": 0 };
const POS_RANK = { "Position 1": 4, "Position 2": 3, "Position 3": 2, "Position 4 or beyond": 1, "Not visible": 0, "Not visible or below knee level": 0 };
const COUNT_RANK = { "6+ elements": 3, "3-5 elements": 2, "1-2 elements": 1, "None": 0 };
const SPACE_RANK = { "Large (dedicated wall + floor combined)": 3, "Medium (wall or floor only, not both)": 2, "Small (single standee or minimal shelf)": 1, "None": 0 };
const D1A_POS = { "Header 1": 5, "Header 2": 3, "Header 3 or below": 1 };
const D1B_POS = { "Position 1": 4, "Position 2": 3, "Position 3": 2, "Position 4 or beyond": 1, "Not visible or below knee level": 0 };
const SELLOUT = { "0 units": 0, "0": 0, "1-2 units": 2, "1-2": 2, "3-4 units": 3, "3-4": 3, "5+ units": 4, "5+": 4 };
const LOC = { "Mall or High Street Prime": 4, "High Street Secondary": 3, "Residential Main Road": 2, "Market or Bylane": 1 };
const ACCESS = { "Ground floor + Main road direct visibility": 3, "Ground floor + Bylane or not directly visible": 2, "First floor": 1, "Second floor or above": 0 };
const PARK = { "Dedicated store parking": 2, "Roadside parking": 1, "No parking": 0 };

function yn(v) { return v === "Yes" ? 1 : 0; }
function round(n) { return Math.round(n); }

function scoreD1A(f) {
  if (f["D1A-01"] !== "Yes") return { total: 0, position: 0, condition: 0 };
  const position = D1A_POS[f["D1A-02"]] || 0;
  const condition = ["D1A-03","D1A-04","D1A-05","D1A-06","D1A-07"].reduce((s,k) => s + yn(f[k]), 0);
  return { total: Math.min(10, position + condition), position, condition };
}

function scoreD1B(f) {
  const anyTier = ["D1B-01","D1B-02","D1B-03","D1B-04"].some(k => f[k] === "Yes");
  const tierRaw = yn(f["D1B-01"]) * 8 + yn(f["D1B-02"]) * 5 + yn(f["D1B-03"]) * 3 + yn(f["D1B-04"]) * 1;
  const tierScore = Math.min(tierRaw, 12);
  const positionScore = anyTier ? (D1B_POS[f["D1B-05"]] ?? 0) : 0;
  const conditionScore = anyTier
    ? ["D1B-06","D1B-07","D1B-08","D1B-09"].reduce((s,k) => s + yn(f[k]), 0)
    : 0;
  return {
    total: Math.min(20, tierScore + positionScore + conditionScore),
    tierRaw, tierScore, positionScore, conditionScore
  };
}

function scoreD1C(f) {
  const parts = {
    "D1C-01": 1, "D1C-02": 1, "D1C-03": 1, "D1C-04": 1,
    "D1C-05": 2, "D1C-06": 1, "D1C-07": 1, "D1C-08": 1, "D1C-09": 1
  };
  let total = 0;
  for (const [k, pts] of Object.entries(parts)) if (f[k] === "Yes") total += pts;
  return { total: Math.min(10, total) };
}

function brandParams(f, prefix) {
  if (f[prefix + "-01"] !== "Yes") return null;
  const custom = ["07","08","09","10","11"].reduce((s, n) => s + yn(f[prefix + "-" + n]), 0);
  return {
    present: true,
    msb: MSB_RANK[f[prefix + "-02"]] ?? 0,
    tier: TIER_RANK[f[prefix + "-03"]] ?? 0,
    pos: POS_RANK[f[prefix + "-04"]] ?? 0,
    count: COUNT_RANK[f[prefix + "-05"]] ?? 0,
    space: SPACE_RANK[f[prefix + "-06"]] ?? 0,
    custom,
    msbAbsent: (MSB_RANK[f[prefix + "-02"]] ?? 0) === 0 && f[prefix + "-02"] === "Not present on board",
    tierNone: (TIER_RANK[f[prefix + "-03"]] ?? 0) === 0,
    posNone: (POS_RANK[f[prefix + "-04"]] ?? 0) === 0,
    countNone: (COUNT_RANK[f[prefix + "-05"]] ?? 0) === 0,
    spaceNone: (SPACE_RANK[f[prefix + "-06"]] ?? 0) === 0,
    customNone: custom === 0
  };
}

function compareParam(vRank, cRank, bothAbsent) {
  if (bothAbsent) return null; // skip
  if (vRank > cRank) return 1;
  if (vRank === cRank) return 0.5;
  return 0;
}

function battleScore(vivo, competitor) {
  // Competitor absent → Vivo wins full battle
  if (!competitor) return 30;
  if (!vivo) {
    // Vivo absent but competitor present — Vivo loses all contested params
    // Still compare using zero ranks vs competitor
    vivo = { msb: 0, tier: 0, pos: 0, count: 0, space: 0, custom: 0,
      msbAbsent: true, tierNone: true, posNone: true, countNone: true, spaceNone: true, customNone: true };
  }
  const checks = [
    compareParam(vivo.msb, competitor.msb, vivo.msbAbsent && competitor.msbAbsent),
    compareParam(vivo.tier, competitor.tier, vivo.tierNone && competitor.tierNone),
    compareParam(vivo.pos, competitor.pos, vivo.posNone && competitor.posNone),
    compareParam(vivo.count, competitor.count, vivo.countNone && competitor.countNone),
    compareParam(vivo.space, competitor.space, vivo.spaceNone && competitor.spaceNone),
    compareParam(vivo.custom, competitor.custom, vivo.customNone && competitor.customNone)
  ].filter((x) => x !== null);
  if (checks.length === 0) return 30; // all parameters both-absent
  const pts = checks.reduce((s, x) => s + x, 0);
  return round((pts / checks.length) * 30);
}

function scoreD2(f) {
  const vivo = brandParams(f, "D2-V");
  const sam = brandParams(f, "D2-S");
  const apple = brandParams(f, "D2-A");
  const vsSam = battleScore(vivo, sam);
  const vsApple = battleScore(vivo, apple);
  const samPresent = f["D2-S-01"] === "Yes";
  const applePresent = f["D2-A-01"] === "Yes";
  let final;
  if (!samPresent && !applePresent) final = 30; // both competitors absent
  else if (samPresent && applePresent) final = round((vsSam + vsApple) / 2);
  else if (samPresent) final = vsSam;
  else final = vsApple;
  return { total: final, vsSam, vsApple, samPresent, applePresent };
}

function scoreD3A(f) {
  const vivo = SELLOUT[f["D3A-01"]] ?? 0;
  const apple = SELLOUT[f["D3A-03"]] ?? 0;
  const samsung = SELLOUT[f["D3A-05"]] ?? 0;
  return {
    total: Math.min(12, vivo + apple + samsung),
    vivo, apple, samsung,
    confidence: { vivo: f["D3A-02"] || null, apple: f["D3A-04"] || null, samsung: f["D3A-06"] || null }
  };
}

function scoreD3B(f) {
  const loc = LOC[f["D3B-01"]] ?? 0;
  const catchments = ["D3B-02","D3B-03","D3B-04","D3B-05"].reduce((s,k) => s + yn(f[k]), 0);
  return { total: Math.min(8, loc + catchments), loc, catchments };
}

function scoreD3C(f) {
  return { total: Math.min(5, (ACCESS[f["D3C-01"]] ?? 0) + (PARK[f["D3C-02"]] ?? 0)) };
}

function scoreD3D(f) {
  const total = yn(f["D3D-01"]) * 2 + yn(f["D3D-02"]) * 2 + yn(f["D3D-03"]) * 1;
  return { total: Math.min(5, total) };
}

function computeScores(fields) {
  const d1a = scoreD1A(fields);
  const d1b = scoreD1B(fields);
  const d1c = scoreD1C(fields);
  const d1 = round(d1a.total + d1b.total + d1c.total);
  const d2b = scoreD2(fields);
  const d2 = round(d2b.total);
  const d3a = scoreD3A(fields);
  const d3b = scoreD3B(fields);
  const d3c = scoreD3C(fields);
  const d3d = scoreD3D(fields);
  const d3 = round(d3a.total + d3b.total + d3c.total + d3d.total);
  const total = d1 + d2 + d3;
  return {
    d1, d2, d3, total,
    tier: null, // never hardcoded — SK sets after re-audit
    breakdown: { d1a, d1b, d1c, d2: d2b, d3a, d3b, d3c, d3d },
    confidence: d3a.confidence,
    computedAt: new Date().toISOString()
  };
}

/* Expose for console verification of edge cases */
window.__PBG_SCORE__ = computeScores;
window.__PBG_EDGE_CASES__ = {
  bothCompetitorsAbsent: () => computeScores({ "D2-V-01": "Yes", "D2-V-02": "Header 1", "D2-V-03": "Special Projects", "D2-V-04": "Position 1", "D2-V-05": "6+ elements", "D2-V-06": "Large (dedicated wall + floor combined)", "D2-V-07": "Yes", "D2-V-08": "Yes", "D2-V-09": "Yes", "D2-V-10": "Yes", "D2-V-11": "Yes", "D2-S-01": "No", "D2-A-01": "No" }),
  oneCompetitorAbsent: () => computeScores({ "D2-V-01": "Yes", "D2-V-02": "Header 1", "D2-V-03": "Zone equivalent", "D2-V-04": "Position 2", "D2-V-05": "3-5 elements", "D2-V-06": "Medium (wall or floor only, not both)", "D2-V-07": "No", "D2-V-08": "No", "D2-V-09": "No", "D2-V-10": "No", "D2-V-11": "No", "D2-S-01": "Yes", "D2-S-02": "Header 2", "D2-S-03": "Asset Presence", "D2-S-04": "Position 3", "D2-S-05": "1-2 elements", "D2-S-06": "Small (single standee or minimal shelf)", "D2-S-07": "No", "D2-S-08": "No", "D2-S-09": "No", "D2-S-10": "No", "D2-S-11": "No", "D2-A-01": "No" }),
  allD1BAbsent: () => computeScores({ "D1B-01": "No", "D1B-02": "No", "D1B-03": "No", "D1B-04": "No" }),
  allD2ParamsBothAbsent: () => computeScores({
    "D2-V-01": "Yes", "D2-V-02": "Not present on board", "D2-V-03": "None", "D2-V-04": "Not visible", "D2-V-05": "None", "D2-V-06": "None",
    "D2-V-07": "No", "D2-V-08": "No", "D2-V-09": "No", "D2-V-10": "No", "D2-V-11": "No",
    "D2-S-01": "Yes", "D2-S-02": "Not present on board", "D2-S-03": "None", "D2-S-04": "Not visible", "D2-S-05": "None", "D2-S-06": "None",
    "D2-S-07": "No", "D2-S-08": "No", "D2-S-09": "No", "D2-S-10": "No", "D2-S-11": "No",
    "D2-A-01": "No"
  })
};

/* ========== Utilities ========== */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
function uid(prefix = "id") {
  return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
}
function todayISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + m + "-" + day;
}
function toast(msg, ms = 2800) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), ms);
}
function haversineM(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toR = (x) => x * Math.PI / 180;
  const dLat = toR(lat2 - lat1);
  const dLon = toR(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;","'":"&#39;" }[c]));
}

/* ========== IndexedDB ========== */
const DB_NAME = "pbg_audit_v1";
const DB_VER = 1;
let db;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = () => {
      const d = req.result;
      if (!d.objectStoreNames.contains("drafts")) d.createObjectStore("drafts", { keyPath: "auditId" });
      if (!d.objectStoreNames.contains("photos")) d.createObjectStore("photos", { keyPath: "photoId" });
      if (!d.objectStoreNames.contains("outbox")) d.createObjectStore("outbox", { keyPath: "jobId" });
      if (!d.objectStoreNames.contains("meta")) d.createObjectStore("meta", { keyPath: "key" });
      if (!d.objectStoreNames.contains("audits_cache")) d.createObjectStore("audits_cache", { keyPath: "auditId" });
    };
    req.onsuccess = () => { db = req.result; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}
function idb(store, mode, fn) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, mode);
    const st = tx.objectStore(store);
    const result = fn(st);
    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error);
  });
}
function idbReq(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function putDraft(draft) {
  draft.updatedAt = new Date().toISOString();
  await idb("drafts", "readwrite", (st) => st.put(draft));
  await idb("audits_cache", "readwrite", (st) => st.put({ ...draft, photos: undefined }));
}
async function getDraft(auditId) {
  return idbReq(db.transaction("drafts").objectStore("drafts").get(auditId));
}
async function allDrafts() {
  return idbReq(db.transaction("drafts").objectStore("drafts").getAll());
}
async function putPhoto(photo) {
  await idb("photos", "readwrite", (st) => st.put(photo));
}
async function getPhotosForAudit(auditId) {
  const all = await idbReq(db.transaction("photos").objectStore("photos").getAll());
  return all.filter((p) => p.auditId === auditId);
}
async function deletePhoto(photoId) {
  await idb("photos", "readwrite", (st) => st.delete(photoId));
}
async function enqueueOutbox(job) {
  job.jobId = job.jobId || uid("job");
  job.attempts = job.attempts || 0;
  job.createdAt = job.createdAt || new Date().toISOString();
  await idb("outbox", "readwrite", (st) => st.put(job));
  return job;
}
async function allOutbox() {
  return idbReq(db.transaction("outbox").objectStore("outbox").getAll());
}
async function removeOutbox(jobId) {
  await idb("outbox", "readwrite", (st) => st.delete(jobId));
}
async function metaGet(key) {
  const row = await idbReq(db.transaction("meta").objectStore("meta").get(key));
  return row ? row.value : null;
}
async function metaSet(key, value) {
  await idb("meta", "readwrite", (st) => st.put({ key, value }));
}
async function cacheAudit(audit) {
  await idb("audits_cache", "readwrite", (st) => st.put(audit));
}
async function allCachedAudits() {
  return idbReq(db.transaction("audits_cache").objectStore("audits_cache").getAll());
}

/* ========== App state ========== */
const state = {
  role: null,           // field | ho | am | sk | ceo
  identity: { name: "", phone: "" },
  authUser: null,
  screen: "role",
  audit: null,
  formStep: 0,
  dirty: false,
  online: navigator.onLine,
  firebase: null
};

const FORM_STEPS = [
  { id: "si", title: "Store Information" },
  { id: "d1a", title: "D1-A · Main Signage" },
  { id: "d1b", title: "D1-B · In-Store Assets" },
  { id: "d1c", title: "D1-C · Visibility Branding" },
  { id: "d2v", title: "D2 · Vivo Presence" },
  { id: "d2s", title: "D2 · Samsung Presence" },
  { id: "d2a", title: "D2 · Apple Presence" },
  { id: "d3a", title: "D3-A · Sellout Signal" },
  { id: "d3bcd", title: "D3-B/C/D · Location & Readiness" },
  { id: "photos", title: "Photos" },
  { id: "remarks", title: "Remarks & Submit" }
];

function newAudit() {
  return {
    schemaVersion: 1,
    auditId: uid("audit"),
    storeId: "",
    storeCode: "",
    storeName: "",
    area: "",
    district: "",
    channel: "",
    auditDate: todayISO(),
    auditorName: state.identity.name,
    auditorPhone: state.identity.phone,
    layoutType: "",
    fields: {},
    scores: null,
    confidence: null,
    status: "LocalDraft",
    photoCount: 0,
    photosComplete: false,
    duplicateOverrideReason: null,
    parentAuditId: null,
    changeLog: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    submittedAt: null,
    hoReviewedAt: null,
    amApprovedAt: null,
    skValidatedAt: null,
    lastEditedBy: null,
    deviceId: null,
    tier: null
  };
}

/* ========== Firebase (optional) ========== */
async function initFirebase() {
  if (!FIREBASE_READY) return null;
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
    const { getAuth, signInWithEmailAndPassword, signOut } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const { getFirestore, doc, setDoc, getDoc, getDocs, collection, query, where, updateDoc, arrayUnion, enableIndexedDbPersistence } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js");
    const app = initializeApp(FIREBASE_CONFIG);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    try { await enableIndexedDbPersistence(firestore); } catch (_) {}
    const storage = getStorage(app);
    return { app, auth, firestore, storage, api: { signInWithEmailAndPassword, signOut, doc, setDoc, getDoc, getDocs, collection, query, where, updateDoc, arrayUnion, ref, uploadBytes, getDownloadURL } };
  } catch (e) {
    console.warn("Firebase init failed — running local/demo mode", e);
    return null;
  }
}

async function pinLogin(pin) {
  if (state.firebase) {
    // Expect users docs: { pinEmail, role } — PIN is password for role email
    const emailGuess = DEMO_PINS[pin]?.email;
    if (!emailGuess) throw new Error("Invalid PIN");
    const cred = await state.firebase.api.signInWithEmailAndPassword(state.firebase.auth, emailGuess, pin);
    const uref = state.firebase.api.doc(state.firebase.firestore, "users", cred.user.uid);
    const snap = await state.firebase.api.getDoc(uref);
    const role = snap.exists() ? snap.data().role : (DEMO_PINS[pin]?.role || "AM");
    return { uid: cred.user.uid, role, displayName: snap.exists() ? snap.data().displayName : DEMO_PINS[pin].displayName, email: emailGuess };
  }
  const demo = DEMO_PINS[pin];
  if (!demo) throw new Error("Invalid PIN");
  return { uid: "demo_" + demo.role, role: demo.role, displayName: demo.displayName, email: demo.email, demo: true };
}

/* ========== Sync engine ========== */
async function processOutbox() {
  if (!state.online) {
    updateSyncBanner("Offline — changes queued locally", "warn");
    return;
  }
  const jobs = (await allOutbox()).sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
  if (!jobs.length) {
    updateSyncBanner("", "");
    return;
  }
  updateSyncBanner("Syncing " + jobs.length + " item(s)…", "warn");
  for (const job of jobs) {
    try {
      await runJob(job);
      await removeOutbox(job.jobId);
    } catch (e) {
      job.attempts = (job.attempts || 0) + 1;
      job.lastError = String(e.message || e);
      await idb("outbox", "readwrite", (st) => st.put(job));
      console.error("Sync job failed", job, e);
      updateSyncBanner("Sync failed — will retry. " + job.lastError, "err");
      return;
    }
  }
  updateSyncBanner("All changes synced", "ok");
  setTimeout(() => updateSyncBanner("", ""), 2500);
}

async function runJob(job) {
  if (job.type === "upsert_audit") {
    const draft = await getDraft(job.auditId);
    if (!draft) return;
    if (state.firebase) {
      const { doc, setDoc } = state.firebase.api;
      const payload = { ...draft };
      delete payload._localOnly;
      await setDoc(doc(state.firebase.firestore, "audits", draft.auditId), payload, { merge: true });
    }
    // Always mirror to local cache (demo / offline mirror)
    await cacheAudit(draft);
    if (draft.status === "Syncing") {
      const photos = await getPhotosForAudit(draft.auditId);
      const pending = photos.filter((p) => p.uploadState !== "uploaded");
      if (!pending.length) {
        draft.status = "SubmittedToHO";
        draft.submittedAt = draft.submittedAt || new Date().toISOString();
        await putDraft(draft);
        await cacheAudit(draft);
        if (state.firebase) {
          const { doc, setDoc } = state.firebase.api;
          await setDoc(doc(state.firebase.firestore, "audits", draft.auditId), { status: draft.status, submittedAt: draft.submittedAt }, { merge: true });
        }
      }
    }
  } else if (job.type === "upload_photo") {
    const photos = await getPhotosForAudit(job.auditId);
    const photo = photos.find((p) => p.photoId === job.photoId);
    if (!photo || photo.uploadState === "uploaded") return;
    photo.uploadState = "uploading";
    await putPhoto(photo);
    let url = "local://" + photo.photoId;
    if (state.firebase && photo.blob) {
      const { ref, uploadBytes, getDownloadURL, doc, setDoc } = state.firebase.api;
      const path = "audits/" + job.auditId + "/" + photo.photoId + ".jpg";
      const sref = ref(state.firebase.storage, path);
      await uploadBytes(sref, photo.blob, { contentType: "image/jpeg" });
      url = await getDownloadURL(sref);
      await setDoc(doc(state.firebase.firestore, "audit_photos", photo.photoId), {
        photoId: photo.photoId,
        auditId: job.auditId,
        category: photo.category,
        storagePath: path,
        storageUrl: url,
        contentType: "image/jpeg",
        bytes: photo.bytes,
        capturedAt: photo.capturedAt,
        lat: photo.lat,
        lng: photo.lng,
        distanceM: photo.distanceM,
        gpsWarning: photo.gpsWarning || false,
        uploadState: "uploaded",
        idempotencyKey: photo.idempotencyKey
      }, { merge: true });
    }
    photo.storageUrl = url;
    photo.uploadState = "uploaded";
    // Keep blob for offline preview; strip if large after upload success in firebase mode
    if (state.firebase) delete photo.blob;
    await putPhoto(photo);
    // Re-check audit sync status
    await enqueueOutbox({ type: "upsert_audit", auditId: job.auditId });
  } else if (job.type === "status_update") {
    if (state.firebase) {
      const { doc, setDoc } = state.firebase.api;
      await setDoc(doc(state.firebase.firestore, "audits", job.auditId), job.patch, { merge: true });
    }
    const cached = (await allCachedAudits()).find((a) => a.auditId === job.auditId);
    if (cached) {
      Object.assign(cached, job.patch);
      await cacheAudit(cached);
    }
    const draft = await getDraft(job.auditId);
    if (draft) {
      Object.assign(draft, job.patch);
      await putDraft(draft);
    }
  }
}

function updateSyncBanner(text, cls) {
  const b = $("#syncBanner");
  if (!text) { b.className = "sync-banner"; return; }
  b.className = "sync-banner show " + (cls || "");
  $("#syncText").textContent = text;
}

function updateNetUI() {
  state.online = navigator.onLine;
  const dot = $("#netDot");
  dot.classList.toggle("off", !state.online);
  if (!state.online) updateSyncBanner("Offline — drafts & photos queued locally", "warn");
  else processOutbox();
}

/* ========== Photo capture ========== */
function getGps() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  });
}

async function compressBlob(file, maxBytes = 800 * 1024) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  let w = bitmap.width, h = bitmap.height;
  const maxSide = 1600;
  if (Math.max(w, h) > maxSide) {
    const scale = maxSide / Math.max(w, h);
    w = Math.round(w * scale); h = Math.round(h * scale);
  }
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  let quality = 0.85;
  let blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", quality));
  while (blob && blob.size > maxBytes && quality > 0.4) {
    quality -= 0.1;
    blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", quality));
  }
  if (!blob || blob.size > maxBytes) {
    // further downscale
    canvas.width = Math.round(w * 0.7); canvas.height = Math.round(h * 0.7);
    ctx.drawImage(canvas, 0, 0); // wrong — redraw from file
    const bm2 = await createImageBitmap(file);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(bm2, 0, 0, canvas.width, canvas.height);
    bm2.close();
    blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.7));
  }
  return blob;
}

async function capturePhoto(category) {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.setAttribute("capture", "environment"); // camera-only intent on mobile
    input.onchange = async () => {
      try {
        const file = input.files && input.files[0];
        if (!file) return reject(new Error("No photo"));
        // Reject obvious gallery picks when possible: still enforce capture attr UX
        const gps = await getGps();
        const blob = await compressBlob(file);
        const store = STORE_MASTER.find((s) => s.storeCode === state.audit.storeCode);
        let distanceM = null, gpsWarning = false;
        if (gps && store) {
          distanceM = Math.round(haversineM(gps.lat, gps.lng, store.lat, store.lng));
          if (distanceM > (store.gpsRadiusM || 500)) {
            gpsWarning = true;
            toast("GPS is " + distanceM + "m from store (limit 500m). Photo kept — please verify location.");
          }
        } else if (!gps) {
          toast("GPS unavailable — photo saved without location fix.");
        }
        const photoId = uid("photo");
        const photo = {
          photoId,
          auditId: state.audit.auditId,
          category,
          blob,
          bytes: blob.size,
          capturedAt: new Date().toISOString(),
          lat: gps?.lat ?? null,
          lng: gps?.lng ?? null,
          distanceM,
          gpsWarning,
          uploadState: "local",
          idempotencyKey: photoId,
          previewUrl: URL.createObjectURL(blob)
        };
        await putPhoto(photo);
        await enqueueOutbox({ type: "upload_photo", auditId: state.audit.auditId, photoId });
        state.dirty = true;
        resolve(photo);
      } catch (e) { reject(e); }
    };
    input.click();
  });
}

/* ========== Validation / progress ========== */
function fieldVisible(id, f) {
  if (id.startsWith("D1A-") && id !== "D1A-01") return f["D1A-01"] === "Yes";
  if (["D1B-05","D1B-06","D1B-07","D1B-08","D1B-09"].includes(id))
    return ["D1B-01","D1B-02","D1B-03","D1B-04"].some((k) => f[k] === "Yes");
  for (const brand of ["V","S","A"]) {
    const p = "D2-" + brand + "-";
    if (id.startsWith(p) && id !== p + "01") return f[p + "01"] === "Yes";
  }
  return true;
}

function requiredFieldsForProgress(f) {
  const ids = [
    "SI-01","SI-08","SI-09",
    "D1A-01",
    "D1B-01","D1B-02","D1B-03","D1B-04",
    "D1C-01","D1C-02","D1C-03","D1C-04","D1C-05","D1C-06","D1C-07","D1C-08","D1C-09",
    "D2-V-01","D2-S-01","D2-A-01",
    "D3A-01","D3A-02","D3A-03","D3A-04","D3A-05","D3A-06",
    "D3B-01","D3B-02","D3B-03","D3B-04","D3B-05",
    "D3C-01","D3C-02",
    "D3D-01","D3D-02","D3D-03"
  ];
  if (f["D1A-01"] === "Yes") ids.push("D1A-02","D1A-03","D1A-04","D1A-05","D1A-06","D1A-07");
  if (["D1B-01","D1B-02","D1B-03","D1B-04"].some((k) => f[k] === "Yes"))
    ids.push("D1B-05","D1B-06","D1B-07","D1B-08","D1B-09");
  for (const brand of ["V","S","A"]) {
    if (f["D2-" + brand + "-01"] === "Yes") {
      for (let i = 2; i <= 11; i++) ids.push("D2-" + brand + "-" + String(i).padStart(2,"0"));
    }
  }
  return ids;
}

function updateProgress() {
  if (!state.audit) { $("#progressWrap").classList.add("hidden"); return; }
  $("#progressWrap").classList.remove("hidden");
  const f = state.audit.fields;
  const req = requiredFieldsForProgress(f);
  const done = req.filter((id) => f[id] != null && f[id] !== "").length;
  let pct = req.length ? Math.round((done / req.length) * 90) : 0;
  // photos contribute last 10%
  const photosOk = PHOTO_CATS.filter((c) => c.required(f)).every((c) => true); // filled check async in submit
  pct = Math.min(99, pct);
  $("#progressPct").textContent = pct + "%";
  $("#progressFill").style.width = pct + "%";
  $("#progressLabel").textContent = FORM_STEPS[state.formStep]?.title || "Audit";
}

async function validatePhotos(audit) {
  const photos = await getPhotosForAudit(audit.auditId);
  const f = audit.fields;
  const errors = [];
  for (const cat of PHOTO_CATS) {
    if (!cat.required(f)) continue;
    const n = photos.filter((p) => p.category === cat.id).length;
    if (n < cat.min) errors.push(cat.id + ": need at least " + cat.min + " photo(s) — " + cat.label);
    if (n > cat.max) errors.push(cat.id + ": max " + cat.max + " photos");
  }
  return { ok: !errors.length, errors, photos };
}

function validateStep(stepId, f) {
  const err = [];
  const need = (id, label) => { if (f[id] == null || f[id] === "") err.push(label || id); };
  if (stepId === "si") {
    need("SI-01", "Store Name"); need("SI-08", "Audit Date"); need("SI-09", "Store Layout Type");
    if (f["SI-08"] && f["SI-08"] > todayISO()) err.push("Audit date cannot be future");
  }
  if (stepId === "d1a") {
    need("D1A-01");
    if (f["D1A-01"] === "Yes") ["D1A-02","D1A-03","D1A-04","D1A-05","D1A-06","D1A-07"].forEach((id) => need(id));
  }
  if (stepId === "d1b") {
    ["D1B-01","D1B-02","D1B-03","D1B-04"].forEach((id) => need(id));
    if (["D1B-01","D1B-02","D1B-03","D1B-04"].some((k) => f[k] === "Yes"))
      ["D1B-05","D1B-06","D1B-07","D1B-08","D1B-09"].forEach((id) => need(id));
  }
  if (stepId === "d1c") ["D1C-01","D1C-02","D1C-03","D1C-04","D1C-05","D1C-06","D1C-07","D1C-08","D1C-09"].forEach((id) => need(id));
  if (stepId === "d2v") validateBrand(f, "V", err);
  if (stepId === "d2s") validateBrand(f, "S", err);
  if (stepId === "d2a") validateBrand(f, "A", err);
  if (stepId === "d3a") ["D3A-01","D3A-02","D3A-03","D3A-04","D3A-05","D3A-06"].forEach((id) => need(id));
  if (stepId === "d3bcd") ["D3B-01","D3B-02","D3B-03","D3B-04","D3B-05","D3C-01","D3C-02","D3D-01","D3D-02","D3D-03"].forEach((id) => need(id));
  return err;
}
function validateBrand(f, b, err) {
  const p = "D2-" + b + "-";
  if (f[p + "01"] == null) err.push(p + "01");
  if (f[p + "01"] === "Yes") for (let i = 2; i <= 11; i++) {
    const id = p + String(i).padStart(2,"0");
    if (f[id] == null || f[id] === "") err.push(id);
  }
}

/* ========== UI helpers ========== */
function setRoleChip() {
  const map = { field: "Field Executive", ho: "HO Auditor", am: "AM", sk: "SK", ceo: "CEO" };
  $("#roleChip").textContent = map[state.role] || "Select role";
}

function refPlaceholders(paths) {
  return (paths || []).map((p) =>
    '<div class="ref-box"><strong>Reference image</strong><span>' + escapeHtml(p) + '</span></div>'
  ).join("");
}

function ynControl(id, value) {
  return '<div class="yn" data-field="' + id + '">' +
    '<button type="button" data-v="Yes"' + (value === "Yes" ? ' class="active"' : '') + '>Yes</button>' +
    '<button type="button" data-v="No"' + (value === "No" ? ' class="active"' : '') + '>No</button></div>';
}

function optControl(id, options, value) {
  return '<div class="opt-grid" data-field="' + id + '">' +
    options.map((o) => '<button type="button" data-v="' + escapeHtml(o) + '"' + (value === o ? ' class="active"' : '') + '>' + escapeHtml(o) + '</button>').join("") +
    '</div>';
}

function fieldBlock(id, label, controlHtml, refs) {
  return '<div class="field" data-fid="' + id + '"><label>' + escapeHtml(label) + ' <span class="req">*</span></label>' +
    (refs ? refPlaceholders(refs) : '') + controlHtml + '</div>';
}

async function setField(id, value, opts = {}) {
  if (!state.audit) return;
  const prev = state.audit.fields[id];
  if (prev === value) return;
  state.audit.fields[id] = value;
  // Sync SI mapped fields
  if (id === "SI-01") {
    const store = STORE_MASTER.find((s) => s.storeCode === value || s.storeName === value);
    if (store) {
      state.audit.storeId = store.storeId;
      state.audit.storeCode = store.storeCode;
      state.audit.storeName = store.storeName;
      state.audit.area = store.area;
      state.audit.district = store.district;
      state.audit.channel = store.channel;
      state.audit.fields["SI-01"] = store.storeName;
      state.audit.fields["SI-02"] = store.storeCode;
      state.audit.fields["SI-03"] = store.area;
      state.audit.fields["SI-04"] = store.district;
      state.audit.fields["SI-05"] = store.channel;
    }
  }
  if (id === "SI-08") state.audit.auditDate = value;
  if (id === "SI-09") state.audit.layoutType = value;
  if (id === "D1A-01" && value === "No") {
    ["D1A-02","D1A-03","D1A-04","D1A-05","D1A-06","D1A-07"].forEach((k) => { state.audit.fields[k] = null; });
  }
  if (["D1B-01","D1B-02","D1B-03","D1B-04"].includes(id)) {
    const any = ["D1B-01","D1B-02","D1B-03","D1B-04"].some((k) => state.audit.fields[k] === "Yes");
    if (!any) ["D1B-05","D1B-06","D1B-07","D1B-08","D1B-09"].forEach((k) => { state.audit.fields[k] = null; });
  }
  for (const brand of ["V","S","A"]) {
    const p = "D2-" + brand + "-";
    if (id === p + "01" && value === "No") {
      for (let i = 2; i <= 11; i++) state.audit.fields[p + String(i).padStart(2,"0")] = null;
    }
  }
  if (opts.logChange && (state.role === "ho" || state.role === "am") && prev !== undefined && prev !== null && prev !== value) {
    state.audit.changeLog = state.audit.changeLog || [];
    state.audit.changeLog.push({
      at: new Date().toISOString(),
      who: state.identity.name || state.authUser?.displayName || state.role,
      role: state.role,
      fieldId: id,
      originalValue: prev,
      newValue: value,
      reason: opts.reason || ""
    });
  }
  state.audit.lastEditedBy = { roleMode: state.role, name: state.identity.name || state.authUser?.displayName || "", at: new Date().toISOString() };
  state.dirty = true;
  await putDraft(state.audit);
  updateProgress();
}

function bindFieldControls(root) {
  $$(".yn, .opt-grid", root).forEach((wrap) => {
    const id = wrap.getAttribute("data-field");
    $$("button", wrap).forEach((btn) => {
      btn.addEventListener("click", async () => {
        const v = btn.getAttribute("data-v");
        if ((state.role === "ho" || state.role === "am") && state.audit && state.audit.fields[id] != null && state.audit.fields[id] !== v) {
          const reason = prompt("Reason for change (required for audit trail):");
          if (!reason || reason.trim().length < 3) { toast("Change cancelled — reason required"); return; }
          await setField(id, v, { logChange: true, reason: reason.trim() });
        } else {
          await setField(id, v);
        }
        // re-render step for conditionals
        render();
      });
    });
  });
  $$("select[data-field], input[data-field], textarea[data-field]", root).forEach((el) => {
    const handler = async () => {
      const id = el.getAttribute("data-field");
      let v = el.value;
      if (id === "SI-08" && v > todayISO()) { toast("Future dates not allowed"); el.value = todayISO(); v = todayISO(); }
      await setField(id, v, { logChange: state.role === "ho" || state.role === "am" });
      if (id === "SI-01") render();
    };
    el.addEventListener("change", handler);
    if (el.tagName === "TEXTAREA" || el.type === "text" || el.type === "tel") {
      el.addEventListener("input", async () => {
        const id = el.getAttribute("data-field");
        await setField(id, el.value);
      });
    }
  });
}

/* ========== Screens ========== */
function render() {
  const root = $("#screens");
  setRoleChip();
  updateProgress();
  const map = {
    role: renderRole,
    identity: renderIdentity,
    pin: renderPin,
    fieldHome: renderFieldHome,
    form: renderForm,
    hoList: renderHoList,
    hoDetail: renderReviewDetail,
    amList: renderAmList,
    amDetail: renderReviewDetail,
    skDash: renderSkDash,
    ceoDash: renderCeoDash
  };
  const fn = map[state.screen] || renderRole;
  root.innerHTML = fn();
  afterRender();
}

function afterRender() {
  bindFieldControls($("#screens"));
  // wire buttons via data-action
  $$("[data-action]", $("#screens")).forEach((el) => {
    el.addEventListener("click", onAction);
  });
  const footer = $(".footer-actions");
  if (footer) $$("[data-action]", footer).forEach((el) => el.addEventListener("click", onAction));
}

async function onAction(e) {
  const btn = e.currentTarget;
  const action = btn.getAttribute("data-action");
  try {
    if (action === "role") {
      const role = btn.getAttribute("data-role");
      state.role = role;
      if (role === "field" || role === "ho") { state.screen = "identity"; }
      else { state.screen = "pin"; state._pinTarget = role === "am" ? "am" : "mgmt"; }
      render();
    } else if (action === "identity-continue") {
      const name = $("#idName").value.trim();
      const phone = $("#idPhone").value.trim();
      if (name.length < 3) return toast("Name must be at least 3 characters");
      if (!/^[6-9]\\d{9}$/.test(phone)) return toast("Enter valid 10-digit Indian mobile");
      state.identity = { name, phone };
      await metaSet("identity", state.identity);
      state.screen = state.role === "field" ? "fieldHome" : "hoList";
      render();
    } else if (action === "pin-submit") {
      const pin = $("#pinInput").value.trim();
      const user = await pinLogin(pin);
      state.authUser = user;
      if (user.role === "AM") { state.role = "am"; state.screen = "amList"; }
      else if (user.role === "SK") { state.role = "sk"; state.screen = "skDash"; }
      else if (user.role === "CEO") { state.role = "ceo"; state.screen = "ceoDash"; }
      else return toast("Unknown role for PIN");
      render();
    } else if (action === "back-role") {
      state.role = null; state.authUser = null; state.screen = "role"; state.audit = null;
      $("#progressWrap").classList.add("hidden");
      render();
    } else if (action === "new-audit") {
      state.audit = newAudit();
      state.audit.deviceId = await ensureDeviceId();
      state.audit.fields["SI-06"] = state.identity.name;
      state.audit.fields["SI-07"] = state.identity.phone;
      state.audit.fields["SI-08"] = todayISO();
      state.formStep = 0;
      await putDraft(state.audit);
      state.screen = "form";
      state.dirty = true;
      render();
    } else if (action === "open-draft") {
      const id = btn.getAttribute("data-id");
      state.audit = await getDraft(id);
      state.formStep = 0;
      state.screen = "form";
      render();
    } else if (action === "form-next") {
      const step = FORM_STEPS[state.formStep];
      const errs = validateStep(step.id, state.audit.fields);
      if (errs.length) return toast("Please complete: " + errs.slice(0, 3).join(", "));
      if (state.formStep < FORM_STEPS.length - 1) { state.formStep++; render(); window.scrollTo(0,0); }
    } else if (action === "form-back") {
      if (state.formStep > 0) { state.formStep--; render(); window.scrollTo(0,0); }
      else { state.screen = "fieldHome"; render(); }
    } else if (action === "submit-audit") {
      await submitAudit();
    } else if (action === "capture") {
      const cat = btn.getAttribute("data-cat");
      const photos = await getPhotosForAudit(state.audit.auditId);
      const meta = PHOTO_CATS.find((c) => c.id === cat);
      const n = photos.filter((p) => p.category === cat).length;
      if (n >= meta.max) return toast("Max " + meta.max + " photos for " + cat);
      await capturePhoto(cat);
      render();
    } else if (action === "rm-photo") {
      await deletePhoto(btn.getAttribute("data-id"));
      state.dirty = true;
      render();
    } else if (action === "open-audit") {
      const id = btn.getAttribute("data-id");
      const all = await allCachedAudits();
      state.audit = all.find((a) => a.auditId === id) || await getDraft(id);
      if (!state.audit) return toast("Audit not found");
      state.screen = state.role === "ho" ? "hoDetail" : state.role === "am" ? "amDetail" : "hoDetail";
      render();
    } else if (action === "ho-submit-am") {
      await transitionStatus("SubmittedToAM", { hoReviewedAt: new Date().toISOString() });
      toast("Submitted to AM");
      state.screen = "hoList";
      render();
    } else if (action === "send-back") {
      const reason = prompt("Send-back reason:");
      if (!reason) return;
      await sendBack(reason);
    } else if (action === "am-approve") {
      await amApprove();
    } else if (action === "sk-validate") {
      await skSetStatus("Validated");
    } else if (action === "sk-flag") {
      await skSetStatus("Flagged");
    } else if (action === "export-csv") {
      await exportCsv();
    } else if (action === "refresh-lists") {
      await refreshRemoteAudits();
      render();
    }
  } catch (err) {
    console.error(err);
    toast(err.message || String(err));
  }
}

async function ensureDeviceId() {
  let id = await metaGet("deviceId");
  if (!id) { id = uid("device"); await metaSet("deviceId", id); }
  return id;
}

async function findDuplicate(storeCode, auditDate, excludeId) {
  const local = await allCachedAudits();
  const hit = local.find((a) => a.storeCode === storeCode && a.auditDate === auditDate && a.auditId !== excludeId && a.status !== "SentBack");
  if (hit) return hit;
  if (state.firebase) {
    const { collection, query, where, getDocs } = state.firebase.api;
    const q = query(collection(state.firebase.firestore, "audits"), where("storeCode", "==", storeCode), where("auditDate", "==", auditDate));
    const snap = await getDocs(q);
    const docs = snap.docs.map((d) => d.data()).filter((a) => a.auditId !== excludeId && a.status !== "SentBack");
    return docs[0] || null;
  }
  return null;
}

async function submitAudit() {
  const f = state.audit.fields;
  for (const step of FORM_STEPS) {
    if (step.id === "photos" || step.id === "remarks") continue;
    const errs = validateStep(step.id, f);
    if (errs.length) { toast("Incomplete section: " + step.title); return; }
  }
  const photoCheck = await validatePhotos(state.audit);
  if (!photoCheck.ok) { toast(photoCheck.errors[0]); return; }

  const dup = await findDuplicate(state.audit.storeCode, state.audit.auditDate, state.audit.auditId);
  if (dup && !state.audit.duplicateOverrideReason) {
    const reason = prompt("An audit already exists for this store + date. Enter override reason to continue, or Cancel:");
    if (!reason || reason.trim().length < 5) return toast("Submission cancelled");
    state.audit.duplicateOverrideReason = reason.trim();
  }

  state.audit.status = "Syncing";
  state.audit.photosComplete = true;
  state.audit.photoCount = photoCheck.photos.length;
  state.audit.auditorName = state.identity.name;
  state.audit.auditorPhone = state.identity.phone;
  await putDraft(state.audit);
  await enqueueOutbox({ type: "upsert_audit", auditId: state.audit.auditId });
  for (const p of photoCheck.photos) {
    if (p.uploadState !== "uploaded") await enqueueOutbox({ type: "upload_photo", auditId: state.audit.auditId, photoId: p.photoId });
  }
  toast(state.online ? "Submitting / syncing…" : "Queued offline — will sync when online");
  state.dirty = false;
  await processOutbox();
  state.screen = "fieldHome";
  render();
}

async function transitionStatus(status, extra = {}) {
  Object.assign(state.audit, extra, { status, updatedAt: new Date().toISOString() });
  await cacheAudit(state.audit);
  await putDraft(state.audit).catch(() => {});
  await enqueueOutbox({ type: "status_update", auditId: state.audit.auditId, patch: { status, ...extra, updatedAt: state.audit.updatedAt } });
  await processOutbox();
}

async function sendBack(reason) {
  const original = { ...state.audit, status: "SentBack", updatedAt: new Date().toISOString() };
  original.changeLog = [...(original.changeLog || []), { at: new Date().toISOString(), who: state.identity.name || state.authUser?.displayName, role: state.role, action: "send_back", reason }];
  await cacheAudit(original);
  await enqueueOutbox({ type: "status_update", auditId: original.auditId, patch: { status: "SentBack", changeLog: original.changeLog } });

  const linked = newAudit();
  linked.parentAuditId = original.auditId;
  linked.storeId = original.storeId;
  linked.storeCode = original.storeCode;
  linked.storeName = original.storeName;
  linked.area = original.area;
  linked.district = original.district;
  linked.channel = original.channel;
  linked.auditDate = original.auditDate;
  linked.fields = { ...original.fields };
  linked.layoutType = original.layoutType;
  linked.status = "LocalDraft";
  await putDraft(linked);
  await cacheAudit(linked);
  toast("Sent back — linked draft created");
  state.screen = state.role === "am" ? "amList" : "hoList";
  render();
}

async function amApprove() {
  const skip = confirm("OK = mark spot-check skipped with reason prompt\\nCancel = I reviewed at least one photo / store identity");
  let spot = {};
  if (skip) {
    const reason = prompt("Spot-check skip reason:");
    if (!reason) return;
    spot = { spotCheckSkipped: true, spotCheckReason: reason };
  } else {
    spot = { spotCheckSkipped: false, spotCheckConfirmed: true };
  }
  const scores = computeScores(state.audit.fields);
  state.audit.scores = scores;
  state.audit.confidence = scores.confidence;
  state.audit.tier = null;
  state.audit.status = "PendingSKValidation";
  state.audit.amApprovedAt = new Date().toISOString();
  Object.assign(state.audit, spot);
  await cacheAudit(state.audit);
  await enqueueOutbox({
    type: "status_update",
    auditId: state.audit.auditId,
    patch: {
      status: "PendingSKValidation",
      scores,
      confidence: scores.confidence,
      tier: null,
      amApprovedAt: state.audit.amApprovedAt,
      ...spot
    }
  });
  await processOutbox();
  toast("Approved — scores computed. D1 " + scores.d1 + " · D2 " + scores.d2 + " · D3 " + scores.d3 + " · Total " + scores.total);
  state.screen = "amList";
  render();
}

async function skSetStatus(status) {
  const patch = { status, skValidatedAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  Object.assign(state.audit, patch);
  await cacheAudit(state.audit);
  await enqueueOutbox({ type: "status_update", auditId: state.audit.auditId, patch });
  await processOutbox();
  toast(status);
  render();
}

async function refreshRemoteAudits() {
  if (!state.firebase) return;
  const { collection, getDocs } = state.firebase.api;
  const snap = await getDocs(collection(state.firebase.firestore, "audits"));
  for (const d of snap.docs) await cacheAudit(d.data());
  // also refresh stores if present
  try {
    const ss = await getDocs(collection(state.firebase.firestore, "stores"));
    if (!ss.empty) {
      const remote = ss.docs.map((x) => x.data());
      await metaSet("stores", remote);
    }
  } catch (_) {}
}

async function exportCsv() {
  const audits = (await allCachedAudits()).filter((a) => a.scores && (a.status === "Validated" || a.status === "PendingSKValidation" || a.status === "Flagged"));
  const header = ["storeCode","storeName","area","channel","d1","d2","d3","total","tier","auditDate","auditorName","confidenceVivo","confidenceApple","confidenceSamsung","status"];
  const rows = audits.map((a) => [
    a.storeCode, a.storeName, a.area, a.channel,
    a.scores?.d1, a.scores?.d2, a.scores?.d3, a.scores?.total,
    a.tier ?? "", a.auditDate, a.auditorName,
    a.confidence?.vivo || "", a.confidence?.apple || "", a.confidence?.samsung || "",
    a.status
  ].map((x) => '"' + String(x ?? "").replace(/"/g, '""') + '"').join(","));
  const csv = [header.join(","), ...rows].join("\\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pbg-audits-" + todayISO() + ".csv";
  a.click();
}

/* ========== Screen HTML ========== */
function renderRole() {
  return '<div class="screen"><h1>PBG Store Audit</h1><p class="sub">Vivo Tamil Nadu · mobile-first · works offline</p><div class="role-grid">' +
    '<button class="role-btn" data-action="role" data-role="field"><span>Fill Audit</span><span class="hint">Field Executive · no login</span></button>' +
    '<button class="role-btn" data-action="role" data-role="ho"><span>Review Audit</span><span class="hint">HO Auditor · no login</span></button>' +
    '<button class="role-btn" data-action="role" data-role="am"><span>AM Approval</span><span class="hint">PIN required</span></button>' +
    '<button class="role-btn" data-action="role" data-role="sk"><span>SK / Management</span><span class="hint">SK or CEO · PIN required</span></button>' +
    '</div><p class="sub" style="margin-top:24px">Demo PINs (local mode): AM <strong>2468</strong> · SK <strong>1357</strong> · CEO <strong>9999</strong></p></div>';
}

function renderIdentity() {
  return '<div class="screen"><h1>Your identity</h1><p class="sub">Stored with every audit. No Firebase login for this role.</p>' +
    '<div class="field"><label>Full Name <span class="req">*</span></label><input id="idName" type="text" minlength="3" placeholder="Full name" value="' + escapeHtml(state.identity.name) + '" /></div>' +
    '<div class="field"><label>Phone Number <span class="req">*</span></label><input id="idPhone" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit mobile" value="' + escapeHtml(state.identity.phone) + '" /></div>' +
    '<button class="primary-btn" data-action="identity-continue">Continue</button>' +
    '<div style="height:10px"></div><button class="ghost-btn" data-action="back-role">Back</button></div>';
}

function renderPin() {
  return '<div class="screen"><h1>PIN entry</h1><p class="sub">Maps to Firebase Auth role account when configured.</p>' +
    '<div class="field"><label>PIN</label><input id="pinInput" type="password" inputmode="numeric" maxlength="8" placeholder="Enter PIN" /></div>' +
    '<button class="primary-btn" data-action="pin-submit">Unlock</button>' +
    '<div style="height:10px"></div><button class="ghost-btn" data-action="back-role">Back</button></div>';
}

function renderFieldHome() {
  return '<div class="screen" id="fieldHomeScreen"><h1>Field Executive</h1><p class="sub">' + escapeHtml(state.identity.name) + ' · ' + escapeHtml(state.identity.phone) + '</p>' +
    '<button class="primary-btn" data-action="new-audit">Start new audit</button><hr class="gold-rule" /><h2>Local drafts</h2><div id="draftList">Loading…</div>' +
    '<button class="ghost-btn" data-action="back-role" style="margin-top:16px">Switch role</button></div>';
}

async function fillDraftList() {
  const el = $("#draftList");
  if (!el) return;
  const drafts = (await allDrafts()).filter((d) => ["LocalDraft","ReadyToSubmit","Syncing","FailedSync"].includes(d.status));
  if (!drafts.length) { el.innerHTML = '<p class="sub">No drafts yet.</p>'; return; }
  el.innerHTML = drafts.map((d) =>
    '<button class="list-item" data-action="open-draft" data-id="' + d.auditId + '"><strong>' + escapeHtml(d.storeName || "Unnamed store") + '</strong>' +
    '<span class="meta">' + escapeHtml(d.auditDate || "") + ' · <span class="status-pill">' + escapeHtml(STATUS[d.status] || d.status) + '</span></span></button>'
  ).join("");
  $$("[data-action=open-draft]", el).forEach((b) => b.addEventListener("click", onAction));
}

function renderForm() {
  const step = FORM_STEPS[state.formStep];
  const f = state.audit.fields;
  let body = "";
  if (step.id === "si") body = renderSI(f);
  else if (step.id === "d1a") body = renderD1A(f);
  else if (step.id === "d1b") body = renderD1B(f);
  else if (step.id === "d1c") body = renderD1C(f);
  else if (step.id === "d2v") body = renderD2Brand(f, "V", "Vivo");
  else if (step.id === "d2s") body = renderD2Brand(f, "S", "Samsung");
  else if (step.id === "d2a") body = renderD2Brand(f, "A", "Apple");
  else if (step.id === "d3a") body = renderD3A(f);
  else if (step.id === "d3bcd") body = renderD3BCD(f);
  else if (step.id === "photos") body = '<div id="photoSection">Loading photos…</div>';
  else if (step.id === "remarks") body = renderRemarks(f);

  const isLast = state.formStep === FORM_STEPS.length - 1;
  return '<div class="screen"><div class="section-title"><h2>' + escapeHtml(step.title) + '</h2><span class="max">Step ' + (state.formStep+1) + '/' + FORM_STEPS.length + '</span></div>' +
    body +
    '<div class="nav-row"><button class="ghost-btn" data-action="form-back">Back</button>' +
    (isLast
      ? '<button class="primary-btn" data-action="submit-audit">Submit audit</button>'
      : '<button class="primary-btn" data-action="form-next">Next</button>') +
    '</div></div>';
}

function renderSI(f) {
  const opts = STORE_MASTER.map((s) => '<option value="' + escapeHtml(s.storeCode) + '"' + (f["SI-02"] === s.storeCode ? " selected" : "") + '>' + escapeHtml(s.storeName) + '</option>').join("");
  return '<div class="card">' +
    '<div class="field"><label>SI-01 Store Name <span class="req">*</span></label><select data-field="SI-01"><option value="">Select store…</option>' + opts + '</select></div>' +
    '<div class="field"><label>SI-02 Store Code</label><div class="readonly">' + escapeHtml(f["SI-02"] || "—") + '</div></div>' +
    '<div class="field"><label>SI-03 Area</label><div class="readonly">' + escapeHtml(f["SI-03"] || "—") + '</div></div>' +
    '<div class="field"><label>SI-04 District</label><div class="readonly">' + escapeHtml(f["SI-04"] || "—") + '</div></div>' +
    '<div class="field"><label>SI-05 Channel</label><div class="readonly">' + escapeHtml(f["SI-05"] || "—") + '</div></div>' +
    '<div class="field"><label>SI-06 Auditor Name</label><div class="readonly">' + escapeHtml(f["SI-06"] || state.identity.name) + '</div></div>' +
    '<div class="field"><label>SI-07 Auditor Phone</label><div class="readonly">' + escapeHtml(f["SI-07"] || state.identity.phone) + '</div></div>' +
    '<div class="field"><label>SI-08 Audit Date <span class="req">*</span></label><input type="date" data-field="SI-08" max="' + todayISO() + '" value="' + escapeHtml(f["SI-08"] || todayISO()) + '" /></div>' +
    fieldBlock("SI-09", "SI-09 Store Layout Type", optControl("SI-09", [
      "Type 1: Large Format Mixed",
      "Type 2: Compact Counter-Dominant",
      "Type 3: Single Brand Zone in Large Store",
      "Type 4: Appliance + Mobile Mixed"
    ], f["SI-09"]), REF["SI-09"]) +
    '</div>';
}

function renderD1A(f) {
  let html = '<div class="card"><div class="section-title"><h3>D1-A Main Signage Board</h3><span class="max">Max 10</span></div>';
  html += fieldBlock("D1A-01", "D1A-01 Is Vivo present on Main Signage Board?", ynControl("D1A-01", f["D1A-01"]));
  if (f["D1A-01"] === "Yes") {
    html += fieldBlock("D1A-02", "D1A-02 Vivo position on board", optControl("D1A-02", ["Header 1","Header 2","Header 3 or below"], f["D1A-02"]), REF["D1A-02"]);
    ["D1A-03|Board lit and working","D1A-04|Letters intact, no damage","D1A-05|Board clean, no dust","D1A-06|No broken or cracked panels","D1A-07|Vivo branding colours accurate, not faded"]
      .forEach((row) => { const [id, lab] = row.split("|"); html += fieldBlock(id, id + " " + lab, ynControl(id, f[id])); });
  }
  return html + '</div>';
}

function renderD1B(f) {
  let html = '<div class="card"><div class="section-title"><h3>D1-B In-Store Assets</h3><span class="max">Max 20</span></div>';
  html += fieldBlock("D1B-01", "D1B-01 Special Projects present? (X-Zone / Shop-in-Shop / Customised Zone)", ynControl("D1B-01", f["D1B-01"]), REF["D1B-01"]);
  html += fieldBlock("D1B-02", "D1B-02 Vivo Zone present? (table or cabinet + backwall cabinet)", ynControl("D1B-02", f["D1B-02"]), REF["D1B-02"]);
  html += fieldBlock("D1B-03", "D1B-03 Asset Presence? (single or double table or cabinet only)", ynControl("D1B-03", f["D1B-03"]), REF["D1B-03"]);
  html += fieldBlock("D1B-04", "D1B-04 Domestic Elements present? (standees / props / pedestals)", ynControl("D1B-04", f["D1B-04"]), REF["D1B-04"]);
  const any = ["D1B-01","D1B-02","D1B-03","D1B-04"].some((k) => f[k] === "Yes");
  if (any) {
    html += fieldBlock("D1B-05", "D1B-05 Position of primary Vivo asset on customer entry path", optControl("D1B-05", [
      "Position 1","Position 2","Position 3","Position 4 or beyond","Not visible or below knee level"
    ], f["D1B-05"]), REF["D1B-05"]);
    ["D1B-06|Assets clean, no dust","D1B-07|No damage or broken elements","D1B-08|Live handsets working and present","D1B-09|Branding accurate, not faded or outdated"]
      .forEach((row) => { const [id, lab] = row.split("|"); html += fieldBlock(id, id + " " + lab, ynControl(id, f[id])); });
  }
  return html + '</div>';
}

function renderD1C(f) {
  let html = '<div class="card"><div class="section-title"><h3>D1-C Visibility Branding</h3><span class="max">Max 10</span></div>';
  const rows = [
    ["D1C-01","Outside store branding present", null],
    ["D1C-02","Inside store branding present", null],
    ["D1C-03","3 or more branding elements total", null],
    ["D1C-04","X Series or premium product featured in branding", null],
    ["D1C-05","Branding at main entry door or next to entry door", REF["D1C-05"]],
    ["D1C-06","Branding at eye level, visible to passerby outside", null],
    ["D1C-07","Branding in large area near competitors or passerby zone outside", null],
    ["D1C-08","Branding clean, no dust or damage", null],
    ["D1C-09","Lighting working, not faded", null]
  ];
  rows.forEach(([id, lab, refs]) => { html += fieldBlock(id, id + " " + lab, ynControl(id, f[id]), refs); });
  return html + '</div>';
}

function renderD2Brand(f, code, name) {
  const p = "D2-" + code + "-";
  let html = '<div class="card"><div class="section-title"><h3>D2 · ' + name + '</h3><span class="max">Battle vs Vivo</span></div>';
  html += fieldBlock(p+"01", p+"01 Is " + name + " present in this store?", ynControl(p+"01", f[p+"01"]));
  if (f[p+"01"] === "Yes") {
    html += fieldBlock(p+"02", p+"02 " + name + " MSB Position", optControl(p+"02", ["Header 1","Header 2","Header 3 or below","Not present on board"], f[p+"02"]));
    html += fieldBlock(p+"03", p+"03 " + name + " highest In-Store Asset Tier present", optControl(p+"03", ["Special Projects","Zone equivalent","Asset Presence","Domestic Elements","None"], f[p+"03"]));
    html += fieldBlock(p+"04", p+"04 " + name + " primary asset position on entry path", optControl(p+"04", ["Position 1","Position 2","Position 3","Position 4 or beyond","Not visible"], f[p+"04"]));
    html += fieldBlock(p+"05", p+"05 " + name + " visibility branding count", optControl(p+"05", ["None","1-2 elements","3-5 elements","6+ elements"], f[p+"05"]));
    html += fieldBlock(p+"06", p+"06 " + name + " branding space size", optControl(p+"06", [
      "Large (dedicated wall + floor combined)",
      "Medium (wall or floor only, not both)",
      "Small (single standee or minimal shelf)",
      "None"
    ], f[p+"06"]), REF["D2-06"]);
    ["07|Shop-in-Shop or dedicated branded zone present","08|Custom furniture or branded fixtures present","09|Dedicated branded lighting present","10|Brand-painted walls or ceiling branding present","11|Digital screen or LED display installed"]
      .forEach((row) => { const [n, lab] = row.split("|"); html += fieldBlock(p+n, p+n + " " + lab, ynControl(p+n, f[p+n])); });
  }
  return html + '</div>';
}

function renderD3A(f) {
  const units = ["0 units","1-2 units","3-4 units","5+ units"];
  const src = ["Billing records confirmed","Staff verbal estimate","Unknown"];
  let html = '<div class="card"><div class="section-title"><h3>D3-A Sellout Signal</h3><span class="max">Max 12</span></div>';
  html += fieldBlock("D3A-01", "D3A-01 Vivo X Series — avg units sold per month (last 3 months)", optControl("D3A-01", units, f["D3A-01"]));
  html += fieldBlock("D3A-02", "D3A-02 Vivo X Series data source", optControl("D3A-02", src, f["D3A-02"]));
  html += fieldBlock("D3A-03", "D3A-03 Apple iPhone ₹70K+ — avg units per month", optControl("D3A-03", ["0","1-2","3-4","5+"], f["D3A-03"]));
  html += fieldBlock("D3A-04", "D3A-04 Apple data source", optControl("D3A-04", src, f["D3A-04"]));
  html += fieldBlock("D3A-05", "D3A-05 Samsung Ultra/Z Series — avg units per month", optControl("D3A-05", ["0","1-2","3-4","5+"], f["D3A-05"]));
  html += fieldBlock("D3A-06", "D3A-06 Samsung data source", optControl("D3A-06", src, f["D3A-06"]));
  return html + '</div>';
}

function renderD3BCD(f) {
  let html = '<div class="card"><div class="section-title"><h3>D3-B Location & Catchment</h3><span class="max">Max 8</span></div>';
  html += fieldBlock("D3B-01", "D3B-01 Store location type", optControl("D3B-01", ["Mall or High Street Prime","High Street Secondary","Residential Main Road","Market or Bylane"], f["D3B-01"]));
  ["D3B-02|IT Park / Tech Hub / Corporate Office Cluster within 1km","D3B-03|Manufacturing Industry / Industrial Hub within 1km","D3B-04|Premium Residential Zone within 1km","D3B-05|Premium College / University (IIT/NIT/Top B-School) within 1km"]
    .forEach((row) => { const [id, lab] = row.split("|"); html += fieldBlock(id, id + " " + lab, ynControl(id, f[id])); });
  html += '</div><div class="card"><div class="section-title"><h3>D3-C Store Access</h3><span class="max">Max 5</span></div>';
  html += fieldBlock("D3C-01", "D3C-01 Store access level", optControl("D3C-01", [
    "Ground floor + Main road direct visibility",
    "Ground floor + Bylane or not directly visible",
    "First floor",
    "Second floor or above"
  ], f["D3C-01"]));
  html += fieldBlock("D3C-02", "D3C-02 Parking availability", optControl("D3C-02", ["Dedicated store parking","Roadside parking","No parking"], f["D3C-02"]));
  html += '</div><div class="card"><div class="section-title"><h3>D3-D Store Readiness</h3><span class="max">Max 5</span></div>';
  ["D3D-01|Ambience — Premium lighting + clean interior + no clutter","D3D-02|Appearance — Exterior maintained + signage visible + no damage","D3D-03|Attractiveness — Window display present + attractive to passerby"]
    .forEach((row) => { const [id, lab] = row.split("|"); html += fieldBlock(id, id + " " + lab, ynControl(id, f[id])); });
  return html + '</div>';
}

function renderRemarks(f) {
  return '<div class="card"><div class="field"><label>REM-01 General remarks</label><textarea data-field="REM-01" placeholder="Optional notes…">' + escapeHtml(f["REM-01"] || "") + '</textarea></div>' +
    '<p class="sub">Scores are calculated automatically after AM approval. Tier is left blank until SK sets bands.</p></div>';
}

async function fillPhotos() {
  const el = $("#photoSection");
  if (!el || !state.audit) return;
  const photos = await getPhotosForAudit(state.audit.auditId);
  const f = state.audit.fields;
  el.innerHTML = PHOTO_CATS.map((cat) => {
    const req = cat.required(f);
    if (!req) return "";
    const list = photos.filter((p) => p.category === cat.id);
    return '<div class="photo-cat card"><h3>' + cat.id + ' · ' + escapeHtml(cat.label) + '</h3>' +
      '<p class="sub">Mandatory · min ' + cat.min + ' · max ' + cat.max + ' · camera only</p>' +
      '<button type="button" class="primary-btn" data-action="capture" data-cat="' + cat.id + '">Capture photo</button>' +
      '<div class="photo-thumbs">' + list.map((p) =>
        '<div class="photo-thumb"><img src="' + (p.previewUrl || p.storageUrl || "") + '" alt="" /><button type="button" class="rm" data-action="rm-photo" data-id="' + p.photoId + '">×</button></div>'
      ).join("") + '</div></div>';
  }).join("") || '<p class="sub">No photo categories required yet — complete D1/D2 answers first.</p>';
  $$("[data-action]", el).forEach((b) => b.addEventListener("click", onAction));
}

function renderHoList() {
  return '<div class="screen"><h1>HO Review</h1><p class="sub">' + escapeHtml(state.identity.name) + '</p>' +
    '<button class="ghost-btn" data-action="refresh-lists" style="margin-bottom:12px">Refresh</button>' +
    '<div id="hoList"></div><button class="ghost-btn" data-action="back-role" style="margin-top:16px">Switch role</button></div>';
}

function renderAmList() {
  return '<div class="screen"><h1>AM Approval queue</h1><p class="sub">' + escapeHtml(state.authUser?.displayName || "AM") + '</p>' +
    '<button class="ghost-btn" data-action="refresh-lists" style="margin-bottom:12px">Refresh</button>' +
    '<div id="amList"></div><button class="ghost-btn" data-action="back-role" style="margin-top:16px">Switch role</button></div>';
}

async function fillQueue(elId, statuses) {
  const el = $("#" + elId);
  if (!el) return;
  let audits = await allCachedAudits();
  audits = audits.filter((a) => statuses.includes(a.status));
  if (state.role === "ho") {
    // optional area filter UX — show all submitted for v1
  }
  if (!audits.length) { el.innerHTML = '<p class="sub">No audits in queue.</p>'; return; }
  el.innerHTML = audits.map((a) =>
    '<button class="list-item" data-action="open-audit" data-id="' + a.auditId + '"><strong>' + escapeHtml(a.storeName) + '</strong>' +
    '<span class="meta">' + escapeHtml(a.area) + ' · ' + escapeHtml(a.auditDate) + ' · <span class="status-pill">' + escapeHtml(STATUS[a.status]||a.status) + '</span></span></button>'
  ).join("");
  $$("[data-action]", el).forEach((b) => b.addEventListener("click", onAction));
}

function renderReviewDetail() {
  const a = state.audit;
  const scores = a.scores ? '<div class="score-preview"><div><strong>' + a.scores.d1 + '</strong>D1</div><div><strong>' + a.scores.d2 + '</strong>D2</div><div><strong>' + a.scores.d3 + '</strong>D3</div><div><strong>' + a.scores.total + '</strong>Total</div></div>' : '<p class="sub">Scores appear after AM approval.</p>';
  const log = (a.changeLog || []).map((c) => '<div>' + escapeHtml(c.at) + ' · ' + escapeHtml(c.who) + ' · ' + escapeHtml(c.fieldId || c.action) + ': ' + escapeHtml(String(c.originalValue)) + ' → ' + escapeHtml(String(c.newValue || c.reason)) + '</div>').join("") || '<div>No changes logged</div>';
  let actions = '<button class="ghost-btn" data-action="' + (state.role === "am" ? "amList" : "hoList") + '" id="backQueue">Back to list</button>';
  // Fix back via role screen
  actions = "";
  if (state.role === "ho" && (a.status === "SubmittedToHO" || a.status === "HOReviewed")) {
    actions += '<button class="primary-btn" data-action="ho-submit-am">Submit to AM</button><div style="height:8px"></div><button class="danger-btn" data-action="send-back">Send back</button>';
  }
  if (state.role === "am" && a.status === "SubmittedToAM") {
    actions += '<button class="primary-btn" data-action="am-approve">Approve &amp; score</button><div style="height:8px"></div><button class="danger-btn" data-action="send-back">Send back</button>';
  }
  if (state.role === "sk" && (a.status === "PendingSKValidation" || a.status === "Flagged")) {
    actions += '<button class="primary-btn" data-action="sk-validate">Validate</button><div style="height:8px"></div><button class="danger-btn" data-action="sk-flag">Flag</button>';
  }
  return '<div class="screen"><h1>' + escapeHtml(a.storeName) + '</h1><p class="sub">' + escapeHtml(a.storeCode) + ' · ' + escapeHtml(a.auditDate) + ' · <span class="status-pill">' + escapeHtml(STATUS[a.status]||a.status) + '</span></p>' +
    scores +
    '<div class="card"><h3>Field snapshot</h3><p class="sub">Auditor: ' + escapeHtml(a.auditorName) + ' · ' + escapeHtml(a.auditorPhone || "") + '<br>Layout: ' + escapeHtml(a.layoutType || a.fields["SI-09"] || "—") + '<br>Channel: ' + escapeHtml(a.channel) + ' · Area: ' + escapeHtml(a.area) + '</p>' +
    '<p class="sub">D1A-01: ' + escapeHtml(a.fields["D1A-01"]) + ' · D1B tiers: ' + ["D1B-01","D1B-02","D1B-03","D1B-04"].map((k)=>k+":"+escapeHtml(a.fields[k])).join(", ") + '</p>' +
    '<p class="sub">Competitors — Samsung: ' + escapeHtml(a.fields["D2-S-01"]) + ' · Apple: ' + escapeHtml(a.fields["D2-A-01"]) + '</p></div>' +
    '<div class="card"><h3>Change log</h3><div class="change-log">' + log + '</div></div>' +
    actions +
    '<div style="height:10px"></div><button class="ghost-btn" data-action="' + (state.role === "am" ? "goto-am" : state.role === "sk" ? "goto-sk" : "goto-ho") + '" id="backBtn">Back</button></div>';
}

// patch back buttons via action aliases in onAction — add handlers
const _origOnAction = onAction;
// We'll extend in boot

function renderSkDash() {
  return '<div class="screen"><h1>SK Dashboard</h1><p class="sub">Validation · flag · export. Tier bands not set — raw scores only.</p>' +
    '<div class="kpi-row" id="skKpis"></div>' +
    '<button class="primary-btn" data-action="export-csv" style="margin-bottom:10px">Export CSV</button>' +
    '<button class="ghost-btn" data-action="refresh-lists" style="margin-bottom:12px">Refresh</button>' +
    '<div id="skList"></div>' +
    '<button class="ghost-btn" data-action="back-role" style="margin-top:16px">Switch role</button></div>';
}

function renderCeoDash() {
  return '<div class="screen"><h1>CEO Summary</h1><p class="sub">Read-only · Validated audits only · no tier bands</p>' +
    '<div class="kpi-row" id="ceoKpis"></div><div id="ceoList"></div>' +
    '<button class="ghost-btn" data-action="back-role" style="margin-top:16px">Switch role</button></div>';
}

async function fillSk() {
  const audits = await allCachedAudits();
  const pending = audits.filter((a) => a.status === "PendingSKValidation" || a.status === "Flagged");
  const validated = audits.filter((a) => a.status === "Validated");
  const k = $("#skKpis");
  if (k) k.innerHTML = '<div class="kpi"><div class="n">' + pending.length + '</div><div class="l">Pending / Flagged</div></div>' +
    '<div class="kpi"><div class="n">' + validated.length + '</div><div class="l">Validated</div></div>';
  const el = $("#skList");
  if (!el) return;
  const list = audits.filter((a) => ["PendingSKValidation","Flagged","Validated"].includes(a.status));
  el.innerHTML = list.map((a) =>
    '<button class="list-item" data-action="open-audit" data-id="' + a.auditId + '"><strong>' + escapeHtml(a.storeName) + '</strong>' +
    '<span class="meta">Total ' + (a.scores?.total ?? "—") + ' · D1 ' + (a.scores?.d1 ?? "—") + ' · D2 ' + (a.scores?.d2 ?? "—") + ' · D3 ' + (a.scores?.d3 ?? "—") +
    ' · <span class="status-pill">' + escapeHtml(STATUS[a.status]||a.status) + '</span>' +
    ((a.confidence && Object.values(a.confidence).includes("Unknown")) ? ' · confidence flag' : '') +
    '</span></button>'
  ).join("") || '<p class="sub">No scored audits yet.</p>';
  $$("[data-action]", el).forEach((b) => b.addEventListener("click", onAction));
}

async function fillCeo() {
  const audits = (await allCachedAudits()).filter((a) => a.status === "Validated" && a.scores);
  const avg = audits.length ? Math.round(audits.reduce((s, a) => s + a.scores.total, 0) / audits.length) : 0;
  const k = $("#ceoKpis");
  if (k) k.innerHTML = '<div class="kpi"><div class="n">' + audits.length + '</div><div class="l">Validated audits</div></div>' +
    '<div class="kpi"><div class="n">' + avg + '</div><div class="l">Avg total / 100</div></div>';
  const el = $("#ceoList");
  if (!el) return;
  el.innerHTML = audits.map((a) =>
    '<div class="card"><strong>' + escapeHtml(a.storeName) + '</strong><div class="meta" style="color:var(--muted);font-size:12px;margin-top:4px">' +
    escapeHtml(a.area) + ' · ' + escapeHtml(a.auditDate) + ' · Total <span style="color:var(--gold)">' + a.scores.total + '</span> (D1 ' + a.scores.d1 + ' · D2 ' + a.scores.d2 + ' · D3 ' + a.scores.d3 + ')</div></div>'
  ).join("") || '<p class="sub">No validated audits yet.</p>';
}

/* ========== Boot ========== */
async function boot() {
  await openDB();
  state.firebase = await initFirebase();
  const savedId = await metaGet("identity");
  if (savedId) state.identity = savedId;
  await metaSet("storeMasterCache", STORE_MASTER);

  // Extend actions for navigation aliases
  const prev = onAction;
  window.__onAction = async function(e) {
    const action = e.currentTarget.getAttribute("data-action");
    if (action === "goto-ho") { state.screen = "hoList"; render(); return; }
    if (action === "goto-am") { state.screen = "amList"; render(); return; }
    if (action === "goto-sk") { state.screen = "skDash"; render(); return; }
    return prev(e);
  };
  // Rebind — monkeypatch by replacing listeners use window wrapper
  const _bind = afterRender;
  // Simpler: patch onAction body via wrapping
  // Actually redefine handlers on data-action in afterRender to use extended
}

// Fix: properly wrap onAction
const __rawOnAction = onAction;
async function onActionWrapped(e) {
  const action = e.currentTarget.getAttribute("data-action");
  if (action === "goto-ho") { state.screen = "hoList"; render(); return; }
  if (action === "goto-am") { state.screen = "amList"; render(); return; }
  if (action === "goto-sk") { state.screen = "skDash"; render(); return; }
  return __rawOnAction(e);
}
// Replace usages - reassign
// Can't reassign const — change afterRender to use onActionWrapped

</script>
</body>
</html>
`;

// The generator above got too complex with the onAction wrap issue.
// I'll write a cleaner final file in a second pass.
console.log("partial length", html.length);
fs.writeFileSync(out + ".partial", html);
console.log("wrote partial");
