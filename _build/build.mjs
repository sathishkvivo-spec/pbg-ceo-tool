import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "audit-form.html");

const STORES = [
  ["TND00157411","Supreme Mobiles Tambaram 2","Tambaram","Chengalpattu","MT",12.9249,80.1000],
  ["TND092245","Poorvika Appliances Mogappair","Mogappair","Chennai","MT",13.0838,80.1847],
  ["TND092270","Poorvika Parrys3","Parrys","Chennai","MT",13.0878,80.2840],
  ["TND092281","Poorvika Porur HIFI","Porur","Chennai","MT",13.0382,80.1565],
  ["TND092601","Sangeetha Mobiles Anna Nagar","Anna Nagar","Chennai","MT",13.0850,80.2101],
  ["TND00137364","Poorvika Appliances Porur","Porur","Chennai","MT",13.0365,80.1550],
  ["TND092367","Poorvika Appliances Shanthi Colony","Anna Nagar","Chennai","MT",13.0825,80.2080],
  ["TND101609","Poorvika Appliances Kodambakkam","Kodambakkam","Chennai","MT",13.0520,80.2210],
  ["TND091846","Chennai Mobiles OMR","OMR","Chennai","MT",12.9500,80.2400],
  ["TND091857","Chennai Mobiles Porur","Porur","Chennai","MT",13.0370,80.1575],
  ["TND092338","Poorvika Triplicane","Triplicane","Chennai","MT",13.0580,80.2750],
  ["TND091833","Chennai Mobiles Kelambakkam","Kelambakkam","Chengalpattu","MT",12.7880,80.2200],
  ["TND084801","Mayur Mobiles","Chennai Central","Chennai","GT",13.0827,80.2707],
  ["TND087865","Sun Mobiles Tiruttani","Tiruttani","Tiruvallur","GT",13.1750,79.6110],
  // storeCode PENDING_SK — empty in V1–V4 master; do not go live until real VChat ID is set
  ["TND128851","Poorvika Appliances Thiruvallur","Thiruvallur","Tiruvallur","MT",13.1439,79.9090],
  ["TND091901","Croma Mount Road","Mount Road","Chennai","MT",13.0600,80.2600],
  ["TND093040","Vasanth Co Tambaram","Tambaram","Chengalpattu","MT",12.9220,80.1270],
  ["TND128836","Poorvika Appliances Poonmalle","Poonamallee","Chennai","MT",13.0470,80.0950],
  ["TND092175","Poorvika Kumananchavadi","Kumananchavadi","Chennai","MT",13.0500,80.1100],
  ["TND091811","Chennai Mobiles Anna Nagar","Anna Nagar","Chennai","MT",13.0870,80.2180],
  ["TND091838","Chennai Mobiles Medavakkam","Medavakkam","Chennai","MT",12.9200,80.1920],
  ["TND092096","Poorvika Adyar","Adyar","Chennai","MT",13.0067,80.2570],
  ["TND092258","Poorvika Appliances Old Washermenpet","Washermenpet","Chennai","MT",13.1100,80.2900],
  ["TND092130","Poorvika Chengalpet HIFI","Chengalpattu","Chengalpattu","MT",12.6819,79.9888],
  ["TND092191","Poorvika Medavakkam","Medavakkam","Chennai","MT",12.9170,80.1910],
  ["TND092294","Poorvika Redhills","Redhills","Chennai","MT",13.1900,80.1900],
  ["TND092316","Poorvika Tambaram West","Tambaram","Chengalpattu","MT",12.9240,80.1100],
  ["TND092118","Poorvika Appliances Avadi","Avadi","Chennai","MT",13.1143,80.1018],
  ["TND091814","Chennai Mobiles Ashok Nagar","Ashok Nagar","Chennai","MT",13.0350,80.2120],
  ["TND092371","Pothys Hyper Chrompet","Chrompet","Chengalpattu","GT",12.9516,80.1400]
].map(([storeCode,storeName,area,district,channel,lat,lng]) => ({
  storeId: storeCode, storeCode, storeName, area, district, channel, lat, lng, gpsRadiusM: 500, active: true, phase: 1
}));

const css = fs.readFileSync(path.join(__dirname, "part-css.css"), "utf8");
const js = fs.readFileSync(path.join(__dirname, "part-app.js"), "utf8");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" />
<meta name="theme-color" content="#0a0a0f" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="description" content="PBG Store Audit Form — Vivo Tamil Nadu" />
<title>PBG Store Audit Form</title>
<style>
${css}
</style>
</head>
<body>
<div id="app">
  <div class="topbar">
    <div class="topbar-row">
      <div class="brand">PBG · Store Audit</div>
      <div class="topbar-right">
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
<script type="module">
window.__STORE_MASTER__ = ${JSON.stringify(STORES)};
${js}
</script>
</body>
</html>
`;

fs.writeFileSync(out, html);
console.log("Wrote", out, "(" + html.length + " bytes)");
