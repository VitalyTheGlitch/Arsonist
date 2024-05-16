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

function updateHandle(_0x848b76=true, _0x5b2a6a=none, _0x14dfe9=none, _0x3f0218=0x0) {
  popupMinerControls.style.filter = 'blur(' + _0x3f0218 + 'px)';
  popupAssassinControls.style.filter = 'blur(' + _0x3f0218 + 'px)';
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
    popupMinerControls.style.filter = 'blur(0px)';
    popupAssassinControls.style.filter = 'blur(0px)';
  }
}, 0x3e8);

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

const togglePopup = (_0x2e06fd, _0x484b64) => {
  const _0x2cf910 = document.querySelector(_0x2e06fd);
  const _0x55ad54 = document.querySelector(_0x484b64);

  _0x2cf910.addEventListener('click', () => {
    buttonsAndControls.forEach(({ control: _0x172d26 }) => document.querySelector(_0x172d26).style.display = 'none');

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
  document.querySelector(_0x5df09e).addEventListener('click', () => chrome.tabs.create({ 'url': _0x404732 });
};

socials.forEach(({ id: _0x180a21, url: _0x636e8b }) => openSocial(_0x180a21, _0x636e8b));

minerStartButton.addEventListener('click', async () => {
  try {
    const [_0x2ea35c] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (_0x2ea35c.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(_0x2ea35c.id, { 'message': 'startMiner' });
    await chrome.runtime.sendMessage({ 'message': 'startMiner' });
  } catch (e) {
    console.error('Error starting the bot:', e);

    Toast.showToast('error', _0x1c02cc.message);
  }
});

minerStopButton.addEventListener('click', async () => {
  try {
    const [_0x1b280f] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (_0x1b280f.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(_0x1b280f.id, { 'message': 'stopMiner' });
  } catch (e) {
    console.error('Error stopping the bot:', e);

    Toast.showToast('error', _0x1bf1e8.message);
  }
});

assassinStartButton.addEventListener('click', async () => {
  try {
    const [_0x2ea35c] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (_0x2ea35c.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(_0x2ea35c.id, { 'message': 'guessAssassin' });
    await chrome.runtime.sendMessage({ 'message': 'startAssassin' });
  } catch (e) {
    console.error('Error starting the bot:', e);

    Toast.showToast('error', _0x1c02cc.message);
  }
});

assassinStopButton.addEventListener('click', async () => {
  try {
    const [_0x1b280f] = await chrome.tabs.query({
      'active': true,
      'currentWindow': true
    });

    if (_0x1b280f.url !== 'https://www.wolvesville.com/') throw new Error('Wolvesville not found');

    await chrome.tabs.sendMessage(_0x1b280f.id, { 'message': 'stopAssassin' });
  } catch (e) {
    console.error('Error stopping the bot:', e);

    Toast.showToast('error', _0x1bf1e8.message);
  }
});


/*
Villager
Doctor
Butcher
Night watchman
Bodyguard
Tough guy
Seer apprentice
Seer
Analyst
Aura seer
Spirit seer
Gambler
Violinist
Sheriff
Detective
Mortician
Ghost lady
Jailer
Warden
Vigilante
Gunner
Bully
Witch
Forger
Astronomer
Beast hunter
Trapper
Flagger
Priest
Judge
Marksman
Flower child
Pacifist
Mayor
Baker
Grumpy grandma
Preacher
Loudmouth
Avenger
Werewolf fan
Grave robber
Lurker
Cupid
Instigator
Medium
Ritualist
Conjuror
Regular werewolf
Junior werewolf
Wolffluencer
Split wolf
Kitten wolf
Wolf shaman
Nightmare werewolf
Voodoo werewolf
Wolf trickster
Storm wolf
Wolf pacifist
Guardian wolf
Jelly wolf
Shadow wolf
Werewolf berserk
Alpha werewolf
Stubborn werewolf
Wolf summoner
Wolf seer
Blind werewolf
Confusion wolf
Sorcerer
Toxic wolf
Wolf scribe
Swamp wolf
Serial killer
Evil detective
Cannibal
Arsonist
Alchemist
Bomber
Corruptor
Illusionist
Bandit
Accomplice
Sect leader
Zombie
Siren
Headhunter
Fool
President
Santa Claus
Pumpkin king
Easter bunny
Fortune teller
Cursed
Red lady
Rainmaker
*/