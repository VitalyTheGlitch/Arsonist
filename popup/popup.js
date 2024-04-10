const popupAdControls = document.querySelector('.popup-ad-controls');
const popupUpdateCheck = document.querySelector('.update-check');
const popupUpdateAvailable = document.querySelector('.update-available');
const updateText = document.querySelector('#update-text');
const updateButton = document.querySelector('#updateButton');
const startButton = document.querySelector('#startButton');
const stopButton = document.querySelector('#stopButton');

function updateHandle(_0x848b76=true, _0x5b2a6a=none, _0x14dfe9=none, _0x3f0218=0x0) {
  popupAdControls.style.filter = 'blur(' + _0x3f0218 + 'px)';
  popupUpdateCheck.style.display = _0x5b2a6a;
  popupUpdateAvailable.style.display = _0x14dfe9;
}

updateHandle(true, 'block', 'none', 0x2);

setTimeout(async () => {
  try {
    const _0x4d5025 = await fetch('https://raw.githubusercontent.com/VitalijKo/Arsonist/updates/update.json');
    const _0x3bce30 = await _0x4d5025.json();
    const _0x47a47d = await chrome.runtime.getManifest().version;

    if (_0x3bce30.version !== _0x47a47d) {
      updateText.innerHTML = '<b>Changelog:</b><br>' + _0x3bce30.changeLog + '<br><br><b>Click the button below to update</b>';

      updateHandle(true, 'none', 'block', 0x2);

      updateButton.addEventListener('click', async () => {
        await chrome.tabs.create({ 'url': _0x3bce30.downloadURL });
      });
    }

    else updateHandle(false, 'none', 'none', 0x0);
  } catch (e) {
    console.log('Error fetching updates:', e);

    popupUpdateCheck.style.display = 'none';
    popupUpdateAvailable.style.display = 'none';
    popupAdControls.style.filter = 'blur(0px)';
  }
}, 0x3e8);

const buttonsAndControls = [
	{
	  'button': '#adButton',
	  'control': '.popup-ad-controls'
	}
];

const togglePopup = (_0x2e06fd, _0x484b64) => {
  const _0x2cf910 = document.querySelector(_0x2e06fd);
  const _0x55ad54 = document.querySelector(_0x484b64);

  _0x2cf910.addEventListener('click', () => {
    buttonsAndControls.forEach(({ control: _0x172d26 }) => {
      document.querySelector(_0x172d26).style.display = 'none';
    });

    _0x55ad54.style.display = 'block';
  });
};

buttonsAndControls.forEach(({ button: _0x4fe3ed, control: _0x6daff1 }) => togglePopup(_0x4fe3ed, _0x6daff1));

const socials = [
	{
	  'id': '#youtube-icon',
	  'url': 'https://www.youtube.com/channel/UCrCHWb1dpMc3QF1TG1x0BQQ'
	},
	{
	  'id': '#discord-icon',
	  'url': 'https://discord.gg/'
	}
];

const openSocial = (_0x5df09e, _0x404732) => {
  document.querySelector(_0x5df09e).addEventListener('click', () => {
    chrome.tabs.create({ 'url': _0x404732 });
  });
};

socials.forEach(({ id: _0x180a21, url: _0x636e8b }) => openSocial(_0x180a21, _0x636e8b));

startButton.addEventListener('click', async () => {
  try {
    const [_0x2ea35c] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (_0x2ea35c.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(_0x2ea35c.id, { 'message': 'startAutoOnAdvertPage' });
    await chrome.runtime.sendMessage({ 'message': 'startAutoOnAdvertPage' });
  } catch (e) {
    console.error('Error starting the bot:', e);

    Toast.showToast('error', _0x1c02cc.message);
  }
});

stopButton.addEventListener('click', async () => {
  try {
    const [_0x1b280f] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (_0x1b280f.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(_0x1b280f.id, {
      'message': 'stopAutoOnAdvertPage'
    });
  } catch (e) {
    console.error('Error stopping the bot:', e);

    Toast.showToast('error', _0x1bf1e8.message);
  }
});
