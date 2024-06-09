const showNotification = async (tab, type='basic', message, silent=true) => {
  const notification = {
    'type': type,
    'iconUrl': './images/icons/1024.png',
    'title': 'Arsonist',
    'message': message,
    'silent': silent
  };

  try {
    await chrome.notifications.create(tab, notification);
  } catch (e) {
    console.error('Error showing notification:', e);
  }
};

chrome.runtime.onMessage.addListener(async(event, _, callback) => {
  if (event.message in ['startMiner', 'startAssassin']) await showNotification('TESTING_PHASE', 'basic', 'The bot is experimental, please report any bugs you find.', false);

  else if (event.message === 'AdStarted') {
    try {
      const [tab] = await chrome.tabs.query({
        'active': true,
        'currentWindow': true
      });

      await chrome.tabs.sendMessage(tab.id, { 'message': 'AdStarted1' });

      if (callback) callback({ 'status': 'success' });
    } catch (e) {
      console.error('Error sending "AdStarted" message:', e);

      if (callback) callback({ 'status': 'error' });
    }

    return true;
  }
});

chrome.runtime.onInstalled.addListener(async event => {
  if (event.reason === 'install') {
    try {
      await chrome.tabs.create({ 'url': chrome.runtime.getURL('./landing/landing.html') });
    } catch (e) {
      console.error('Error opening landing page:', e);
    }
  }
});
