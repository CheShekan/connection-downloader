
const appData = {
  android: {
    v2rayNG: "2dust/v2rayNG"
  },
  windows: {
    nekoray: "Mahdi-zarei/nekoray"
  }
};

const osSelect = document.getElementById("os-select");
const appSelect = document.getElementById("app-select");
const versionSelect = document.getElementById("version-select");
const fileSelect = document.getElementById("file-select");
const downloadBtn = document.getElementById("download-btn");
const changelogBtn = document.getElementById("changelog-btn");
const latestBox = document.getElementById("latest-version-box");

let currentReleases = [];

// بروزرسانی لیست برنامه‌ها بر اساس سیستم‌عامل
function updateAppList() {
  const os = osSelect.value;
  appSelect.innerHTML = "";

  if (!appData[os]) {
    return;
  }

  Object.keys(appData[os]).forEach(app => {
    const opt = document.createElement("option");
    opt.value = app;
    opt.textContent = app === "v2rayNG" ? "v2rayNG" : 
                      app === "nekoray" ? "Persian Nekoray" : app;
    appSelect.appendChild(opt);
  });

  loadVersions(); // فراخوانی مجدد پس از تغییر اپ
}

// دریافت نسخه‌ها و فایل‌های برنامه از GitHub API
function loadVersions() {
  const os = osSelect.value;
  const app = appSelect.value;

  if (!appData[os] || !appData[os][app]) {
    versionSelect.innerHTML = "";
    fileSelect.innerHTML = "";
    latestBox.textContent = "برنامه‌ای برای این سیستم‌عامل وجود ندارد";
    return;
  }

  const repo = appData[os][app];

  fetch(`https://api.github.com/repos/${repo}/releases`)
    .then(res => res.json())
    .then(releases => {
      currentReleases = releases;

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

// لود فایل‌های قابل دانلود برای نسخه انتخابی
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

// لیسنرها
osSelect.addEventListener("change", () => {
  updateAppList();
});
appSelect.addEventListener("change", loadVersions);
versionSelect.addEventListener("change", () => {
  loadAssets(versionSelect.value);
});

downloadBtn.addEventListener("click", () => {
  const url = fileSelect.value;
  if (url) window.open(url, "_blank");
});

changelogBtn.addEventListener("click", () => {
  const release = currentReleases[versionSelect.value];
  if (release.html_url) window.open(release.html_url, "_blank");
});

// بارگذاری اولیه
updateAppList();
