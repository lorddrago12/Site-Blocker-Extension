<div align="center">

# ⛔ Site Blocker

**A beautiful, themeable Chrome extension to block distracting websites.**  
Block any site instantly. Watch your attempt counter climb. Feel the shame. Stay focused.

![Chrome](https://img.shields.io/badge/Chrome-Extension-yellow?style=flat-square&logo=googlechrome&logoColor=black)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-pink?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## 📸 Preview

<div align="center">

### Popup
<img src="https://github.com/user-attachments/assets/6e97fa1d-84e4-4783-a10a-57305ed3a2cb" width="280"/>

### Blocked Page (Rosé Pine)
<img src="https://github.com/user-attachments/assets/3f48c9bf-e1d6-4f96-bd78-c7fc03c7f09a" width="700"/>

</div>

## ✨ Features

- **Zero-flicker blocking** — blocked pages are intercepted instantly before distractions can load
- **8 beautiful themes** — every theme styles both the popup and blocked page
- **Per-site stat tracking** — monitor attempts today, all-time visits, and streaks
- **Motivational roasts** — escalating messages the more you try (*"Legendary focus issues. 🏆"*)
- **On/Off toggle** — disable blocking instantly without deleting your list
- **Persistent settings** — sites, themes, and stats survive browser restarts
- **Fully local** — no accounts, no analytics, no data collection

---

## 🎨 Themes

| | Theme | Vibe |
|---|---|---|
| 🟡 | **Dark** | Sharp black with electric yellow |
| 🟣 | **Catppuccin Mocha** | Soft lavender on deep blue-black |
| 🟢 | **Dracula** | Classic dark purple with neon green |
| 🔵 | **Nord** | Arctic blue-grey, ultra clean |
| 🌸 | **Rosé Pine** | Muted pink on deep purple |
| 🟩 | **Gruvbox** | Warm retro earth tones |
| 💙 | **Tokyo Night** | Deep navy with electric blue |
| 🔴 | **Sammy** 🦉 | Deep maroon with rose pink |

---

## 🚀 Installation

> No Chrome Web Store needed — load it manually in under a minute.

1. Download or clone this repository
2. Open Chrome and go to:

```txt
chrome://extensions
```

3. Enable **Developer Mode** (top-right corner)
4. Click **Load unpacked**
5. Select the extension folder

Done. The ⛔ icon should now appear in your toolbar.

---

## 🛠 Usage

1. Click the **⛔ Blocker** icon in your Chrome toolbar
2. Enter a domain (`youtube.com`, `reddit.com`, etc.)
3. Press **+ Add** or hit Enter
4. Choose a theme using the color selector
5. Visit a blocked site to trigger the block page
6. Use the **ON/OFF toggle** anytime to pause blocking
7. Click **✕** beside a site to remove it

> **Note:** Refresh already-open tabs after changing your block list.

---

## 📊 Stat Counter

Every blocked site tracks its own statistics independently.

| Stat | Description |
|---|---|
| **Today** | Attempts made today |
| **All Time** | Total blocked attempts |
| **Day Streak** | Consecutive days you've attempted to visit |

The more you try to bypass your blocklist, the harsher the roast messages become.

---

## 📁 Project Structure

```txt
site-blocker/
├── manifest.json      # Chrome extension manifest (MV3)
├── background.js      # Service worker + storage setup
├── content.js         # Page blocking + stat tracking
├── popup.html         # Popup interface
├── popup.js           # Popup logic and interactions
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🔒 Permissions

| Permission | Purpose |
|---|---|
| `storage` | Save settings, themes, and stats locally |
| `declarativeNetRequest` | Efficient request handling |
| `host_permissions: <all_urls>` | Detect and block pages |

No data leaves your browser.  
Everything is stored locally using `chrome.storage.local`.

---

## 📄 License

MIT License
