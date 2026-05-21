// popup.js

const siteInput  = document.getElementById('siteInput');
const addBtn     = document.getElementById('addBtn');
const siteList   = document.getElementById('siteList');
const emptyState = document.getElementById('emptyState');
const errorMsg   = document.getElementById('errorMsg');
const countBadge = document.getElementById('countBadge');
const clearAll   = document.getElementById('clearAll');
const toggleWrap = document.getElementById('toggleWrap');
const toggleSw   = document.getElementById('toggleSwitch');
const toggleLbl  = document.getElementById('toggleLabel');

let sites   = [];
let enabled = true;
let theme   = 'dark';

// ── Helpers ──────────────────────────────────────────────

function cleanDomain(raw) {
  try {
    let s = raw.trim().toLowerCase();
    if (!s) return null;
    s = s.replace(/^https?:\/\//i, '');
    s = s.replace(/^www\./i, '');
    s = s.split('/')[0].split('?')[0].split('#')[0];
    if (!/^[a-z0-9]([a-z0-9\-\.]*[a-z0-9])?$/.test(s) || !s.includes('.')) return null;
    return s;
  } catch { return null; }
}

function setError(msg) {
  errorMsg.textContent = msg;
  if (msg) {
    siteInput.style.borderColor = 'var(--danger)';
    setTimeout(() => { errorMsg.textContent = ''; siteInput.style.borderColor = ''; }, 2500);
  }
}

// ── Theme ─────────────────────────────────────────────────

function applyTheme(t) {
  theme = t;
  document.documentElement.setAttribute('data-theme', t);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === t);
  });
}

// ── Render ───────────────────────────────────────────────

function render() {
  [...siteList.querySelectorAll('.site-item')].forEach(el => el.remove());
  emptyState.style.display = sites.length === 0 ? 'block' : 'none';
  sites.forEach((site, i) => {
    const item = document.createElement('div');
    item.className = 'site-item';
    item.innerHTML = `
      <span class="site-dot"></span>
      <span class="site-domain" title="${site}">${site}</span>
      <button class="remove-btn" data-index="${i}" title="Remove">✕</button>
    `;
    siteList.insertBefore(item, emptyState);
  });
  countBadge.textContent = sites.length;
  countBadge.className   = 'count-badge' + (sites.length ? ' has-items' : '');
  clearAll.disabled      = sites.length === 0;
}

function renderToggle() {
  toggleSw.className    = 'toggle' + (enabled ? ' on' : '');
  toggleLbl.textContent = enabled ? 'ON' : 'OFF';
  toggleWrap.className  = 'toggle-wrap' + (enabled ? ' active' : '');
}

// ── Storage ──────────────────────────────────────────────

function load() {
  chrome.storage.local.get(['blockedSites', 'blockEnabled', 'theme'], (data) => {
    sites   = data.blockedSites  || [];
    enabled = data.blockEnabled !== false;
    applyTheme(data.theme || 'dark');
    render();
    renderToggle();
  });
}

function save() {
  chrome.storage.local.set({ blockedSites: sites, blockEnabled: enabled, theme });
}

// ── Actions ──────────────────────────────────────────────

function addSite() {
  const domain = cleanDomain(siteInput.value);
  if (!domain) { setError('Enter a valid domain (e.g. reddit.com)'); return; }
  if (sites.includes(domain)) { setError(`${domain} is already blocked`); return; }
  sites.push(domain);
  save(); render();
  siteInput.value = '';
  siteInput.focus();
}

// ── Events ───────────────────────────────────────────────

addBtn.addEventListener('click', addSite);

siteInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addSite();
});

siteList.addEventListener('click', (e) => {
  const btn = e.target.closest('.remove-btn');
  if (btn) {
    sites.splice(parseInt(btn.dataset.index, 10), 1);
    save(); render();
  }
});

clearAll.addEventListener('click', () => {
  sites = []; save(); render();
});

toggleWrap.addEventListener('click', () => {
  enabled = !enabled; save(); renderToggle();
});

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyTheme(btn.dataset.theme);
    save();
  });
});

// ── Init ─────────────────────────────────────────────────
load();
