const popupMinerControls = document.querySelector('.popup-miner-controls');
const popupAssassinControls = document.querySelector('.popup-assassin-controls');
const popupUpdateCheck = document.querySelector('.update-check');
const popupUpdateAvailable = document.querySelector('.update-available');
const updateText = document.querySelector('#update-text');
const updateButton = document.querySelector('#updateButton');
const minerStartButton = document.querySelector('#minerStartButton');
const minerStopButton = document.querySelector('#minerStopButton');
const assassinStartButton = document.querySelector('#assassinStartButton');
const assassinStopButton = document.querySelector('#assassinStopButton');

function updateHandle(displayCheck=none, displayAvailable=none, blur=0) {
  popupMinerControls.style.filter = 'blur(' + blur + 'px)';
  popupAssassinControls.style.filter = 'blur(' + blur + 'px)';
  popupUpdateCheck.style.display = displayCheck;
  popupUpdateAvailable.style.display = displayAvailable;
}

updateHandle('block', 'none', 2);

setTimeout(async () => {
  try {
    const update = await fetch('https://raw.githubusercontent.com/VitalijKo/Arsonist/updates/update.json');
    const data = await update.json();
    const version = await chrome.runtime.getManifest().version;

    if (data.version !== version) {
      updateText.innerHTML = '<b>Changelog:</b><br>' + data.changeLog + '<br><br><b>Click the button below to update</b>';

      updateHandle('none', 'block', 2);

      updateButton.addEventListener('click', async () => {
        await chrome.tabs.create({ 'url': data.downloadURL });
      });
    }

    else updateHandle('none', 'none', 0);
  } catch (e) {
    console.log('Error fetching updates:', e);

    popupUpdateCheck.style.display = 'none';
    popupUpdateAvailable.style.display = 'none';
    popupMinerControls.style.filter = 'blur(0px)';
    popupAssassinControls.style.filter = 'blur(0px)';
  }
}, 1000);

const buttonsAndControls = [
	{
	  'button': '#minerButton',
	  'control': '.popup-miner-controls'
	},
  {
    'button': '#assassinButton',
    'control': '.popup-assassin-controls'
  }
];

const togglePopup = (popup1, popup2) => {
  const element1 = document.querySelector(popup1);
  const element2 = document.querySelector(popup2);

  element1.addEventListener('click', () => {
    buttonsAndControls.forEach(({ control }) => document.querySelector(control).style.display = 'none');

    element2.style.display = 'block';
  });
};

buttonsAndControls.forEach(({ button, control }) => togglePopup(button, control));

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

const openSocial = (social, url) => {
  document.querySelector(social).addEventListener('click', () => chrome.tabs.create({ 'url': url }));
};

socials.forEach(({ id, url }) => openSocial(id, url));

minerStartButton.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (tab.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(tab.id, { 'message': 'startMiner' });
    await chrome.runtime.sendMessage({ 'message': 'startMiner' });
  } catch (e) {
    console.error('Error starting the bot:', e);

    Toast.showToast('error', e.message);
  }
});

minerStopButton.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (tab.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(tab.id, { 'message': 'stopMiner' });
  } catch (e) {
    console.error('Error stopping the bot:', e);

    Toast.showToast('error', e.message);
  }
});

assassinStartButton.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (tab.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(tab.id, { 'message': 'guessAssassin' });
    await chrome.runtime.sendMessage({ 'message': 'startAssassin' });
  } catch (e) {
    console.error('Error starting the bot:', e);

    Toast.showToast('error', e.message);
  }
});

assassinStopButton.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (tab.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(tab.id, { 'message': 'stopAssassin' });
  } catch (e) {
    console.error('Error stopping the bot:', e);

    Toast.showToast('error', e.message);
  }
});
