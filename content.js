// content.js - runs at document_start on every page

(function () {
  chrome.storage.local.get(['blockedSites', 'blockEnabled', 'theme', 'blockStats'], function (data) {
    const enabled = data.blockEnabled !== false;
    const blockedSites = data.blockedSites || [];
    if (!enabled || blockedSites.length === 0) return;

    const currentHost = window.location.hostname.replace(/^www\./, '');
    const matchedSite = blockedSites.find(site => {
      const clean = site.replace(/^www\./, '').toLowerCase().trim();
      return currentHost === clean || currentHost.endsWith('.' + clean);
    });

    if (!matchedSite) return;

    // ── Update stats ──────────────────────────────────────
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const stats = data.blockStats || {};

    if (!stats[matchedSite]) stats[matchedSite] = {};
    if (!stats[matchedSite][today]) stats[matchedSite][today] = 0;
    stats[matchedSite][today]++;

    // total all-time for this site
    const totalCount = Object.values(stats[matchedSite]).reduce((a, b) => a + b, 0);
    const todayCount = stats[matchedSite][today];

    // streak: consecutive days blocked
    let streak = 0;
    let d = new Date();
    while (true) {
      const key = d.toISOString().slice(0, 10);
      if (stats[matchedSite] && stats[matchedSite][key]) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else break;
    }

    chrome.storage.local.set({ blockStats: stats });

    // ── Theme map ─────────────────────────────────────────
    const themes = {
      'dark':      { bg:'#0d0d0d', surface:'#141414', accent:'#e8ff47', text:'#e0e0e0', muted:'#252525', muted2:'#3a3a3a', label:'#ff4444' },
      'mocha':     { bg:'#1e1e2e', surface:'#181825', accent:'#cba6f7', text:'#cdd6f4', muted:'#313244', muted2:'#45475a', label:'#f38ba8' },
      'sammy':     { bg:'#1a0a0f', surface:'#240d15', accent:'#e8637a', text:'#f0ccd4', muted:'#3a1a24', muted2:'#5a2a38', label:'#e8637a' },
      'dracula':   { bg:'#282a36', surface:'#21222c', accent:'#50fa7b', text:'#f8f8f2', muted:'#44475a', muted2:'#6272a4', label:'#ff5555' },
      'nord':      { bg:'#2e3440', surface:'#3b4252', accent:'#88c0d0', text:'#eceff4', muted:'#434c5e', muted2:'#4c566a', label:'#bf616a' },
      'rose-pine': { bg:'#191724', surface:'#1f1d2e', accent:'#ebbcba', text:'#e0def4', muted:'#26233a', muted2:'#403d52', label:'#eb6f92' },
      'gruvbox':   { bg:'#282828', surface:'#32302f', accent:'#b8bb26', text:'#ebdbb2', muted:'#3c3836', muted2:'#504945', label:'#fb4934' },
      'tokyo':     { bg:'#1a1b26', surface:'#16161e', accent:'#7aa2f7', text:'#c0caf5', muted:'#292e42', muted2:'#3d59a1', label:'#f7768e' },
    };

    const t = themes[data.theme] || themes['dark'];
    const domain = window.location.hostname;

    // ── Motivational messages based on today's count ──────
    const messages = [
      { min: 1,  max: 1,  msg: "First attempt today. Stay strong! 💪" },
      { min: 2,  max: 3,  msg: "Again? You got this. 👀" },
      { min: 4,  max: 6,  msg: "Really? Stay focused. 😤" },
      { min: 7,  max: 10, msg: "Bro... close the tab. 💀" },
      { min: 11, max: 20, msg: "You need an intervention. 😭" },
      { min: 21, max: Infinity, msg: "Legendary focus issues. 🏆" },
    ];
    const msgObj = messages.find(m => todayCount >= m.min && todayCount <= m.max);
    const motivMsg = msgObj ? msgObj.msg : "";

    document.open();
    document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blocked — ${domain}</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body {
      width:100%; height:100%;
      background:${t.bg};
      display:flex; align-items:center; justify-content:center;
      font-family:'Space Mono','Courier New',monospace;
      overflow:hidden;
    }
    .wrap {
      text-align:center;
      animation: up 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    @keyframes up {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .badge {
      display:inline-block;
      background:${t.label};
      color:${t.bg};
      font-size:9px; font-weight:700;
      letter-spacing:3px; text-transform:uppercase;
      padding:4px 12px; border-radius:2px;
      margin-bottom:28px;
    }
    .icon {
      font-size:52px; display:block;
      margin-bottom:20px;
      filter: drop-shadow(0 0 20px ${t.accent}55);
      animation: pulse 3s ease-in-out infinite;
    }
    @keyframes pulse {
      0%,100% { filter: drop-shadow(0 0 20px ${t.accent}44); }
      50%      { filter: drop-shadow(0 0 32px ${t.accent}99); }
    }
    .domain {
      font-size:18px; font-weight:700;
      color:${t.text};
      letter-spacing:1px;
      margin-bottom:6px;
    }
    .motiv {
      font-size:11px;
      color:${t.label};
      letter-spacing:1px;
      margin-bottom:4px;
      min-height:16px;
    }
    .line {
      width:32px; height:2px;
      background:${t.accent};
      margin:18px auto;
      border-radius:2px;
    }

    /* ── Stats row ── */
    .stats {
      display:flex;
      gap:1px;
      margin:0 auto 18px;
      width:fit-content;
      border:1px solid ${t.muted2};
      border-radius:6px;
      overflow:hidden;
    }
    .stat {
      padding:10px 20px;
      background:${t.surface};
      text-align:center;
      min-width:80px;
    }
    .stat + .stat { border-left:1px solid ${t.muted2}; }
    .stat-val {
      font-size:22px; font-weight:700;
      color:${t.accent};
      line-height:1;
      margin-bottom:5px;
      animation: countUp 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    @keyframes countUp {
      from { opacity:0; transform:scale(0.7); }
      to   { opacity:1; transform:scale(1); }
    }
    .stat-label {
      font-size:8px; letter-spacing:2px;
      text-transform:uppercase;
      color:${t.muted2};
    }

    .hint {
      font-size:9px; letter-spacing:2px;
      text-transform:uppercase;
      color:${t.muted};
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="badge">blocked</div>
    <span class="icon">⛔</span>
    <div class="domain">${domain}</div>
    <div class="motiv">${motivMsg}</div>
    <div class="line"></div>
    <div class="stats">
      <div class="stat">
        <div class="stat-val">${todayCount}</div>
        <div class="stat-label">Today</div>
      </div>
      <div class="stat">
        <div class="stat-val">${totalCount}</div>
        <div class="stat-label">All Time</div>
      </div>
      <div class="stat">
        <div class="stat-val">${streak}</div>
        <div class="stat-label">Day Streak</div>
      </div>
    </div>
    <div class="hint">manage via site blocker extension</div>
  </div>
</body>
</html>`);
    document.close();
  });
})();
