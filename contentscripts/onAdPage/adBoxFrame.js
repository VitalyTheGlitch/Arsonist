var restriction = 30;
var countdownInProgress = false;

const elementSrcExists = src => {
  try {
    const result = [...document.getElementsByTagName('*')].filter(element => element.hasAttribute('src') && element.src.includes(src));

    return result.length > 0 ? result[result.length - 1] : null;
  } catch (e) {
    console.error('Error checking element source:', e);

    Toast.showToast('error', 'Coundnt find the ad page');
  }
};

const clickElementIfExists = async (element, text) => {
  if (element) {
    try {
      element.click();

      Toast.showToast('success', text + ' clicked');
    } catch (e) {
      console.error('Error clicking ' + text + ':', e);

      Toast.showToast('error', 'Coundnt click ' + text);
    }
  }
};

const adTask = async () => {
  if (!countdownInProgress) {
    try {
      const outside = document.querySelector('#ad_position_box');
      const dimiss = document.querySelector('#dismiss-button-element');

      if (outside && dimiss) {
        const countdown = document.querySelector('#count-down-text').textContent;

        if (countdown === 'Reward in 1 seconds') {
          countdownInProgress = true;

          Toast.showToast('info', 'Waiting ' + restriction + ' seconds before closing the ad');

          const task = setInterval(() => {
            restriction -= 10;

            Toast.showToast('info', 'Waiting ' + restriction + ' seconds before closing the ad');
          }, 10000);

        	await new Promise(resolve => setTimeout(async () => {
            clearInterval(task);

            countdownInProgress = false;

            await clickElementIfExists(elementSrcExists('https://www.gstatic.com/dfp/native/play.png'), 'Play');
            await clickElementIfExists(outside, 'Outside');
            await clickElementIfExists(dimiss, 'Dismiss');

            restriction = 30;

            resolve();
          }, restriction * 1000));
        }
      }
    } catch (e) {
      console.error('Error in adTask:', e);

      Toast.showToast('error', 'Unknown error has occured');
    }
  }
};

setInterval(adTask, 1000);
