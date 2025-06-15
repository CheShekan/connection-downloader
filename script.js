
const softwareData = {
  "android": {
    "v2rayNG": {
      "1.10.6": [
        "v2rayNG_1.10.6_arm64-v8a.apk"
      ]
    },
    "WG Tunnel": {
      "1.10.6": [
        "WG_Tunnel_1.10.6.apk"
      ]
    },
    "NekoBox": {
      "1.10.6": [
        "NekoBox_1.10.6.apk"
      ]
    },
    "StrongSwan": {
      "1.10.6": [
        "StrongSwan_1.10.6.apk"
      ]
    }
  },
  "windows": {
    "Persian Nekoray": {
      "3.25": [
        "Nekoray_3.25.exe"
      ]
    },
    "Hiddify": {
      "1.0": [
        "Hiddify_1.0.exe"
      ]
    },
    "V2rayN": {
      "6.28": [
        "V2rayN_6.28.exe"
      ]
    }
  },
  "ios": {
    "Streisand (App Store)": {
      "store": [
        "https://apps.apple.com/us/app/streisand/id6450534064"
      ]
    },
    "v2RayTun (App Store)": {
      "store": [
        "https://apps.apple.com/us/app/v2raytun/id6476628951"
      ]
    },
    "OpenVPN (App Store)": {
      "store": [
        "https://apps.apple.com/us/app/openvpn-connect-openvpn-app/id590379981"
      ]
    },
    "WireGuard (App Store)": {
      "store": [
        "https://apps.apple.com/us/app/wireguard/id1441195209"
      ]
    }
  },
  "mac": {}
};

const osSelect = document.getElementById('os');
const appSelect = document.getElementById('app');
const versionSelect = document.getElementById('version');
const fileSelect = document.getElementById('file');
const downloadBtn = document.getElementById('download-btn');
const notice = document.getElementById('notice');
const appStoreBtn = document.getElementById('appstore-btn');

function resetOptions(select) {
  select.innerHTML = '<option disabled selected value="">--</option>';
}

function showNotice(msg) {
  notice.textContent = msg;
  notice.style.display = 'block';
}

function hideNotice() {
  notice.style.display = 'none';
}

osSelect.addEventListener('change', () => {
  resetOptions(appSelect);
  resetOptions(versionSelect);
  resetOptions(fileSelect);
  downloadBtn.style.display = 'none';
  appStoreBtn.style.display = 'none';
  hideNotice();
  const os = osSelect.value;
  const apps = softwareData[os];
  if (!apps || Object.keys(apps).length === 0) {
    showNotice("برنامه‌ای برای این سیستم‌عامل وجود ندارد");
    return;
  }
  for (const app in apps) {
    appSelect.innerHTML += `<option value="${app}">${app}</option>`;
  }
});

appSelect.addEventListener('change', () => {
  resetOptions(versionSelect);
  resetOptions(fileSelect);
  downloadBtn.style.display = 'none';
  appStoreBtn.style.display = 'none';
  hideNotice();
  const os = osSelect.value;
  const app = appSelect.value;
  const versions = softwareData[os][app];
  for (const version in versions) {
    versionSelect.innerHTML += `<option value="${version}">${version}</option>`;
  }
});

versionSelect.addEventListener('change', () => {
  resetOptions(fileSelect);
  downloadBtn.style.display = 'none';
  appStoreBtn.style.display = 'none';
  hideNotice();
  const os = osSelect.value;
  const app = appSelect.value;
  const version = versionSelect.value;
  const files = softwareData[os][app][version];
  files.forEach(f => {
    fileSelect.innerHTML += `<option value="${f}">${f}</option>`;
  });
});

fileSelect.addEventListener('change', () => {
  const os = osSelect.value;
  const app = appSelect.value;
  const version = versionSelect.value;
  const file = fileSelect.value;
  if (version === 'store') {
    appStoreBtn.style.display = 'inline-block';
    appStoreBtn.onclick = () => window.open(file, '_blank');
  } else {
    downloadBtn.style.display = 'inline-block';
    downloadBtn.onclick = () => alert(`در نسخه نهایی لینک مستقیم برای ${file} قرار می‌گیرد.`);
  }
});
