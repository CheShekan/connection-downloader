const data = {
  "ویندوز": {
    "v2rayN": {
      "1.10.6": ["v2rayN_1.10.6.zip"]
    },
    "Hiddify": {
      "2025.1": ["hiddify_setup_2025.exe"]
    }
  },
  "اندروید": {
    "v2rayNG": {
      "1.10.6": ["v2rayNG_1.10.6_arm64-v8a.apk"]
    },
    "WG Tunnel": {
      "1.2": ["wgtunnel.apk"]
    }
  },
  "آیفون": {
    "Streisand": "https://apps.apple.com/us/app/streisand/id6450534064",
    "v2RayTun": "https://apps.apple.com/us/app/v2raytun/id6476628951"
  }
};

const osSelect = document.getElementById('os-select');
const appSelect = document.getElementById('app-select');
const versionSelect = document.getElementById('version-select');
const fileSelect = document.getElementById('file-select');
const alertBox = document.getElementById('alert-box');
const downloadBtn = document.getElementById('download-btn');

Object.keys(data).forEach(os => {
  const opt = new Option(os, os);
  osSelect.add(opt);
});

osSelect.addEventListener('change', () => {
  appSelect.innerHTML = '';
  versionSelect.innerHTML = '';
  fileSelect.innerHTML = '';
  const apps = data[osSelect.value];
  if (typeof apps === 'object') {
    Object.keys(apps).forEach(app => appSelect.add(new Option(app, app)));
    alertBox.classList.add('hidden');
  } else {
    alertBox.classList.remove('hidden');
  }
});

appSelect.addEventListener('change', () => {
  versionSelect.innerHTML = '';
  fileSelect.innerHTML = '';
  const versions = data[osSelect.value][appSelect.value];
  Object.keys(versions).forEach(ver => versionSelect.add(new Option(ver, ver)));
});

versionSelect.addEventListener('change', () => {
  fileSelect.innerHTML = '';
  const files = data[osSelect.value][appSelect.value][versionSelect.value];
  files.forEach(file => fileSelect.add(new Option(file, file)));
});

downloadBtn.addEventListener('click', () => {
  const os = osSelect.value;
  const app = appSelect.value;
  const version = versionSelect.value;
  const file = fileSelect.value;
  const base = 'https://example.com/files/';
  if (file && !file.startsWith('http')) {
    window.open(base + file, '_blank');
  } else if (file) {
    window.open(file, '_blank');
  }
});