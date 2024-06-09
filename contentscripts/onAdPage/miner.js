let isMinerRunning = false;
let wheelTimeout;

const elementSrcExists = _0x207ee2 => {
  try {
    const _0x5cb41d = [...document.getElementsByTagName('*')].filter(_0x1b1ab1 => _0x1b1ab1.hasAttribute('src') && _0x1b1ab1.src.includes(_0x207ee2));

    return _0x5cb41d.length > 0x0;
  } catch (e) {
    console.error('Error checking element source:', e);

    Toast.showToast('error', 'Gold wheel not found');
  }
};

const elementExists = async _0x351f7a => {
  try {
    const _0x1da7ff = [...document.getElementsByTagName('*')].filter(_0x2d423f => _0x2d423f.textContent === _0x351f7a && !_0x2d423f.parentElement.querySelector('[role="progressbar"]'));

    return _0x1da7ff.length > 0x0 ? _0x1da7ff[_0x1da7ff.length - 0x1] : null;
  } catch (e) {
    console.error('Error finding element with text "' + _0x351f7a + '":', e);
  }
};

const activateMiner = async () => {
  isMinerRunning = true;

  if (!elementSrcExists('wheel_of_fortune_arrow')) {
    Toast.showToast('info', 'Go to the gold wheel');

    isMinerRunning = false;

    return;
  }

  const _0x22e571 = await elementExists('Unable to load video ads. Please make sure you have a stable internet connection and no ad blockers are running.');

  if (_0x22e571) {
    Toast.showToast('info', 'Couldnt load ads');

    isMinerRunning = false;

    return;
  }

  const _0x18f143 = [...document.getElementsByTagName('*')].find(_0x366b9f => _0x366b9f.textContent.includes('New rewards will be available in'));

  if (_0x18f143) {
    Toast.showToast('info', 'Done');

    isMinerRunning = false;

    return;
  }

  if ((await document.querySelector('#turnstile-widget')) !== null) {
    Toast.showToast('info', 'Cloudflare detected! Manually tick the box');

    await new Promise(_0x3eef8d => setTimeout(async () => {
      isMinerRunning = false;

      await activateMiner();

      _0x3eef8d();
    }, 0x1388));

    return;
  }

  try {
    const _0x43ee82 = await elementExists('WATCH VIDEO');

    if (_0x43ee82) {
      await new Promise(_0x302954 => setTimeout(() => {
        _0x43ee82.click();

        _0x302954();
      }, 0xbb8));

      await new Promise(_0x25333c => setTimeout(() => {
        chrome.runtime.sendMessage({
          'message': 'AdStarted'
        });

        _0x25333c();

      }, 0xdac));
    }
  } catch (e) {
    console.error('Error clicking the ad button:', e);

    Toast.showToast('error', 'Couldnt click the watch video button');
  }

  try {
    const _0x5ece9d = await elementExists('SPIN');

    if (_0x5ece9d) {
      await new Promise(_0x40c8fc => setTimeout(() => {
        _0x5ece9d.click();

        _0x40c8fc();
      }, 0xbb8));
    }
  } catch (e) {
    console.error('Error clicking the spin button:', e);

    Toast.showToast('error', 'Couldnt click the spin button');
  }

  wheelTimeout = setTimeout(async () => {
    isMinerRunning = false;

    await activateMiner();
  }, 0xbb8);
};

chrome.runtime.onMessage.addListener(async (_0x544831, _0x21362b, _0x58e093) => {
  if ((await _0x544831.message) === 'startMiner') {
    Toast.showToast('success', 'Miner activated');

    if (isMinerRunning) {
      Toast.showToast('info', 'Miner is already running');

      return;
    }

    await activateMiner();
  } else if ((await _0x544831.message) === 'stopMiner') {
    clearTimeout(wheelTimeout);

    isMinerRunning = false;

    Toast.showToast('info', 'Miner deactivated');
  } else if ((await _0x544831.message) === 'AdStarted1') {
    try {
      await _0x58e093({ 'status': 'success' });
    } catch (e) {
      console.error('Error handling AdStarted message in miner.js:', e);

      await _0x58e093({ 'status': 'error' });
    }
  }

  return true;
});
