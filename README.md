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

| Popup | Blocked Page (Rosé Pine) |
|:---:|:---:|
| <img src="<img width="318" height="345" alt="image" src="https://github.com/user-attachments/assets/6e97fa1d-84e4-4783-a10a-57305ed3a2cb" />
" width="280"/> | <img src="<img width="1869" height="1018" alt="image" src="https://github.com/user-attachments/assets/ae1dcaca-5d14-4f72-8176-f73282b6c2fc" />
" width="500"/> |

</div>

---

## ✨ Features

- **Instant blocking** — pages go blank the moment they load, no flicker
- **8 beautiful themes** — each one styles both the popup AND the blocked page
- **Per-site stat counter** — tracks how many times you've tried to visit each blocked site today, all-time, and your block streak
- **Motivational roasts** — escalating messages the more you try (*"Legendary focus issues. 🏆"*)
- **On/Off toggle** — pause all blocking instantly without removing your list
- **Persistent settings** — your blocked sites and theme survive browser restarts

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
| 🔴 | **Sammy** 🦉 | Deep maroon with rose pink — the crown jewel |

---

## 🚀 Installation

> **No Chrome Web Store needed** — load it directly in 4 steps.

1. **Download** the latest release zip and unzip it
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer Mode** (toggle in the top-right corner)
4. Click **"Load unpacked"** and select the unzipped folder

Done. The ⛔ icon will appear in your toolbar.

---

## 🛠 Usage

1. Click the **⛔ Blocker** icon in your Chrome toolbar
2. Type a domain (e.g. `youtube.com`, `reddit.com`) and press **+ Add** or hit Enter
3. Switch between themes using the color dot row
4. Visit any blocked site — the page goes blank and your stats update
5. Use the **ON/OFF toggle** to pause blocking temporarily
6. Click **✕** next to any site to unblock it

> **Note:** Reload the tab after adding or removing a site for changes to take effect.

---

## 📊 Stat Counter

Every time you try to visit a blocked site, the blocked page shows:

| Stat | Description |
|---|---|
| **Today** | Attempts on this site today |
| **All Time** | Total attempts ever |
| **Day Streak** | Consecutive days you've been blocked from it |

Stats are tracked **per site** independently, so YouTube and Reddit have their own counters.

---

## 📁 Project Structure

```
site-blocker/
├── manifest.json      # Chrome extension manifest (V3)
├── background.js      # Service worker — initializes storage
├── content.js         # Injected into every page — handles blocking + stats
├── popup.html         # Extension popup UI
├── popup.js           # Popup logic — theme, add/remove sites, toggle
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🔒 Permissions

| Permission | Why |
|---|---|
| `storage` | Save your blocked sites list, theme, and stats |
| `declarativeNetRequest` | Efficient request handling |
| `host_permissions: <all_urls>` | Inject the content script to detect and block pages |

No data ever leaves your browser. Everything is stored locally via `chrome.storage.local`.

---

## 📄 License

MIT LICENSE
