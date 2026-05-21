// background.js - service worker

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['blockedSites', 'blockEnabled'], (data) => {
    if (!data.blockedSites) {
      chrome.storage.local.set({ blockedSites: [], blockEnabled: true });
    }
  });
});
