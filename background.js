const showNotification = async (_0x1f1bb9, _0x471745='basic', _0x50f519, _0x5a2b93=true) => {
  const _0x183074 = {
    'type': _0x471745,
    'iconUrl': './images/icons/1024.png',
    'title': 'Arsonist',
    'message': _0x50f519,
    'silent': _0x5a2b93
  };

  try {
    await chrome.notifications.create(_0x1f1bb9, _0x183074);
  } catch (e) {
    console.error('Error showing notification:', e);
  }
};

chrome.runtime.onMessage.addListener(async(_0x44b719, _0x33b6cd, _0x2abe2a) => {
  if (_0x44b719.message in ['startMiner', 'startAssassin']) await showNotification('TESTING_PHASE', 'basic', 'The bot is experimental, please report any bugs you find.', false);

  else if (_0x44b719.message === 'AdStarted') {
    try {
      const [_0x58dc45] = await chrome.tabs.query({
        'active': true,
        'currentWindow': true
      });

      await chrome.tabs.sendMessage(_0x58dc45.id, { 'message': 'AdStarted1' });

      if (_0x2abe2a) _0x2abe2a({ 'status': 'success' });
    } catch (e) {
      console.error('Error sending "AdStarted" message:', e);

      if (_0x2abe2a) _0x2abe2a({ 'status': 'error' });
    }

    return true;
  }
});

chrome.runtime.onInstalled.addListener(async _0x57d1ce => {
  if (_0x57d1ce.reason === 'install') {
    try {
      await chrome.tabs.create({ 'url': chrome.runtime.getURL('./landing/landing.html') });
    } catch (e) {
      console.error('Error opening landing page:', e);
    }
  }
});
