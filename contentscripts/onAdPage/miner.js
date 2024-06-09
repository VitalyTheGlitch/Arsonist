let isMinerRunning = false;
let wheelTimeout;

const elementSrcExists = src => {
  try {
    const result = [...document.getElementsByTagName('*')].filter(element => element.hasAttribute('src') && element.src.includes(src));

    return result.length > 0;
  } catch (e) {
    console.error('Error checking element source:', e);

    Toast.showToast('error', 'Gold wheel not found');
  }
};

const elementExists = async text => {
  try {
    const result = [...document.getElementsByTagName('*')].filter(element => element.textContent === text && !element.parentElement.querySelector('[role="progressbar"]'));

    return result.length > 0 ? result[result.length - 1] : null;
  } catch (e) {
    console.error('Error finding element with text "' + text + '":', e);
  }
};

const activateMiner = async () => {
  isMinerRunning = true;

  if (!elementSrcExists('wheel_of_fortune_arrow')) {
    Toast.showToast('info', 'Go to the gold wheel');

    isMinerRunning = false;

    return;
  }

  const unable = await elementExists('Unable to load video ads. Please make sure you have a stable internet connection and no ad blockers are running.');

  if (unable) {
    Toast.showToast('info', 'Couldnt load ads');

    isMinerRunning = false;

    return;
  }

  const done = [...document.getElementsByTagName('*')].find(element => element.textContent.includes('New rewards will be available in'));

  if (done) {
    Toast.showToast('info', 'Done');

    isMinerRunning = false;

    return;
  }

  if ((await document.querySelector('#turnstile-widget')) !== null) {
    Toast.showToast('info', 'Cloudflare detected! Manually tick the box');

    await new Promise(resolve => setTimeout(async () => {
      isMinerRunning = false;

      await activateMiner();

      resolve();
    }, 5000));

    return;
  }

  try {
    const watch = await elementExists('WATCH VIDEO');

    if (watch) {
      await new Promise(resolve => setTimeout(() => {
        watch.click();

        resolve();
      }, 3000));

      await new Promise(resolve => setTimeout(() => {
        chrome.runtime.sendMessage({
          'message': 'AdStarted'
        });

        resolve();
      }, 3500));
    }
  } catch (e) {
    console.error('Error clicking the ad button:', e);

    Toast.showToast('error', 'Couldnt click the watch video button');
  }

  try {
    const spin = await elementExists('SPIN');

    if (spin) {
      await new Promise(resolve => setTimeout(() => {
        spin.click();

        resolve();
      }, 3000));
    }
  } catch (e) {
    console.error('Error clicking the spin button:', e);

    Toast.showToast('error', 'Couldnt click the spin button');
  }

  wheelTimeout = setTimeout(async () => {
    isMinerRunning = false;

    await activateMiner();
  }, 3000);
};

chrome.runtime.onMessage.addListener(async (event, _, callback) => {
  if ((await event.message) === 'startMiner') {
    Toast.showToast('success', 'Miner activated');

    if (isMinerRunning) {
      Toast.showToast('info', 'Miner is already running');

      return;
    }

    await activateMiner();
  } else if ((await event.message) === 'stopMiner') {
    clearTimeout(wheelTimeout);

    isMinerRunning = false;

    Toast.showToast('info', 'Miner deactivated');
  } else if ((await event.message) === 'AdStarted1') {
    try {
      await callback({ 'status': 'success' });
    } catch (e) {
      console.error('Error handling AdStarted message in miner.js:', e);

      await callback({ 'status': 'error' });
    }
  }

  return true;
});
