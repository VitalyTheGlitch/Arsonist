var restriction = 0x1e;
var countdownInProgress = false;

const elementSrcExists = _0x1889c4 => {
  try {
    const _0x16e20d = [...document.getElementsByTagName('*')].filter(_0x43317b => _0x43317b.hasAttribute('src') && _0x43317b.src.includes(_0x1889c4));

    return _0x16e20d.length > 0x0 ? _0x16e20d[_0x16e20d.length - 0x1] : null;
  } catch (e) {
    console.error('Error checking element source:', e);

    Toast.showToast('error', 'Coundnt find the ad page');
  }
};

const clickElementIfExists = async (_0x488742, _0x59512b) => {
  if (_0x488742) {
    try {
      _0x488742.click();

      Toast.showToast('success', _0x59512b + ' clicked');
    } catch (e) {
      console.error('Error clicking ' + _0x59512b + ':', e);

      Toast.showToast('error', 'Coundnt click ' + _0x59512b);
    }
  }
};

const adTask = async () => {
  if (!countdownInProgress) {
    try {
      const _0x504d3d = document.querySelector('#ad_position_box');
      const _0x5aa944 = document.querySelector('#dismiss-button-element');

      if (_0x504d3d && _0x5aa944) {
        const _0x32b2c9 = document.querySelector('#count-down-text').textContent;

        if (_0x32b2c9 === 'Reward in 1 seconds') {
          countdownInProgress = true;

          Toast.showToast('info', 'Waiting ' + restriction + ' seconds before closing the ad');

          const _0x521125 = setInterval(() => {
            restriction -= 0xa;

            Toast.showToast('info', 'Waiting ' + restriction + ' seconds before closing the ad');
          }, 0x2710);

        	await new Promise(_0x48af32 => setTimeout(async () => {
            clearInterval(_0x521125);

            countdownInProgress = false;

            await clickElementIfExists(elementSrcExists('https://www.gstatic.com/dfp/native/play.png'), 'Play');
            await clickElementIfExists(_0x504d3d, 'Outside');
            await clickElementIfExists(_0x5aa944, 'Dismiss');

            restriction = 0x1e;

            _0x48af32();
          }, restriction * 0x3e8));
        }
      }
    } catch (e) {
      console.error('Error in adTask:', e);

      Toast.showToast('error', 'Unknown error has occured');
    }
  }
};

setInterval(adTask, 0x3e8);
