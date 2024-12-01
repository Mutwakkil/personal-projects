dayjs.extend(dayjs_plugin_duration);

const futureDate = dayjs('2025-01-01T00:00:00');

const intervalId = setInterval(updateCountDown, 1000);

function updateCountDown() {
  const presentDate = dayjs();
  const gapDate = futureDate.diff(presentDate);

if (gapDate <= 0) {
  clearInterval(intervalId);
  document.querySelector('.js-display-countdown').innerHTML = `It's a new year`;
  return
} else{

const duration = dayjs.duration(gapDate);
const days = futureDate.diff(presentDate, 'day');
const hours = duration.hours();
const minutes = duration.minutes();
const seconds = duration.seconds();
const showInDom = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds to go`;
document.querySelector('.js-display-countdown').innerHTML = showInDom;

}

}

updateCountDown();


