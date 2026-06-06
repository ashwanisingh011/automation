console.log("Tatkal Assistant Background Service Worker Loaded");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
});

// Alarm for Tatkal Window
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'tatkalAC' || alarm.name === 'tatkalNonAC') {
    console.log(`Tatkal window opening: ${alarm.name}`);
    // Trigger notification or open IRCTC tab
    chrome.tabs.create({ url: 'https://www.irctc.co.in/nget/train-search' });
  }
});

// Captcha Solver Logic
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'solveCaptcha') {
    console.log("Solving captcha...");
    // Mock response for now
    sendResponse({ success: true, code: '1234' });
    return true; 
  }
});
