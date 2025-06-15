
const appData = {
  android: {
    v2rayNG: "2dust/v2rayNG",
    nekobox: "MatsuriDayo/NekoBoxForAndroid",
    wgtunnel: "wgtunnel/wgtunnel",
    strongswan: "strongswan/strongswan"
  },
  windows: {
    nekoray: "Mahdi-zarei/nekoray",
    hiddify: "hiddify/hiddify-app",
    v2rayn: "2dust/v2rayN"
  },
  mac: {},
  ios: {
    streisand: null,
    v2raytun: null,
    openvpn: null,
    wireguard: null
  }
};

const appStoreLinks = {
  streisand: "https://apps.apple.com/us/app/streisand/id6450534064",
  v2raytun: "https://apps.apple.com/us/app/v2raytun/id6476628951",
  openvpn: "https://apps.apple.com/us/app/openvpn-connect-openvpn-app/id590379981",
  wireguard: "https://apps.apple.com/us/app/wireguard/id1441195209"
};

const osSelect = document.getElementById("os-select");
const appSelect = document.getElementById("app-select");
const versionSelect = document.getElementById("version-select");
const fileSelect = document.getElementById("file-select");
const downloadBtn = document.getElementById("download-btn");
const changelogBtn = document.getElementById("changelog-btn");
const latestBox = document.getElementById("latest-version-box");

let currentReleases = [];

function updateAppList() {
  const os = osSelect.value;
  appSelect.innerHTML = "";

  if (!appData[os]) return;

  Object.keys(appData[os]).forEach(app => {
    const opt = document.createElement("option");
    opt.value = app;
    opt.textContent =
      app === "v2rayNG" ? "v2rayNG" :
      app === "nekoray" ? "Persian Nekoray" :
      app === "nekobox" ? "NekoBox" :
      app === "wgtunnel" ? "WG Tunnel" :
      app === "strongswan" ? "StrongSwan" :
      app === "hiddify" ? "Hiddify" :
      app === "v2rayn" ? "v2rayN" :
      app === "streisand" ? "Streisand (App Store)" :
      app === "v2raytun" ? "v2RayTun (App Store)" :
      app === "openvpn" ? "OpenVPN (App Store)" :
      app === "wireguard" ? "WireGuard (App Store)" :
      app;
    appSelect.appendChild(opt);
  });

  loadVersions();
}

function loadVersions() {
  const os = osSelect.value;
  const app = appSelect.value;

  if (!appData[os] || !(app in appData[os])) {
    versionSelect.innerHTML = "";
    fileSelect.innerHTML = "";
    latestBox.textContent = "برنامه‌ای برای این سیستم‌عامل وجود ندارد";
    return;
  }

  // iOS App Store links
  if (os === "ios" && appStoreLinks[app]) {
    versionSelect.innerHTML = "";
    fileSelect.innerHTML = "";
    latestBox.textContent = "📲 این برنامه فقط از App Store قابل دریافت است";
    document.getElementById("version-wrapper").style.display = "none";
    document.getElementById("file-wrapper").style.display = "none";
    downloadBtn.textContent = "📲 رفتن به App Store";
    changelogBtn.style.display = "none";
    downloadBtn.onclick = () => window.open(appStoreLinks[app], "_blank");
    return;
  }

  // Regular GitHub Repo Load
  const repo = appData[os][app];
  if (!repo) return;

  document.getElementById("version-wrapper").style.display = "block";
    document.getElementById("file-wrapper").style.display = "block";
    fetch(`https://api.github.com/repos/${repo}/releases`)
    .then(res => res.json())
    .then(releases => {
      currentReleases = releases;

      changelogBtn.style.display = "inline-block";
      downloadBtn.textContent = "⬇️ دانلود نسخه انتخاب شده";
      downloadBtn.onclick = () => {
        const url = fileSelect.value;
        if (url) window.open(url, "_blank");
      };

      if (latestBox && releases.length > 0 && releases[0].tag_name) {
        latestBox.textContent = `⭐ آخرین نسخه: ${releases[0].tag_name}`;
      }

      versionSelect.innerHTML = "";
      releases.forEach((release, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = release.name || release.tag_name;
        versionSelect.appendChild(opt);
      });
      loadAssets(0);
    });
}

function loadAssets(index) {
  const release = currentReleases[index];
  fileSelect.innerHTML = "";
  release.assets.forEach(asset => {
    const opt = document.createElement("option");
    opt.value = asset.browser_download_url;
    opt.textContent = asset.name;
    fileSelect.appendChild(opt);
  });
}

osSelect.addEventListener("change", updateAppList);
appSelect.addEventListener("change", loadVersions);
versionSelect.addEventListener("change", () => {
  loadAssets(versionSelect.value);
});

changelogBtn.addEventListener("click", () => {
  const release = currentReleases[versionSelect.value];
  if (release.html_url) window.open(release.html_url, "_blank");
});

updateAppList();
