function timer(id, deadline) {
  // Timer

  function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const timer = Date.parse(endTime) - Date.parse(new Date());

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / 1000 / 60) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }
    return { timer, days, hours, minutes, seconds };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
      const allTime = getTimeRemaining(endTime);

      days.innerHTML = getZero(allTime.days);
      hours.innerHTML = getZero(allTime.hours);
      minutes.innerHTML = getZero(allTime.minutes);
      seconds.innerHTML = getZero(allTime.seconds);

      if (allTime.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(id, deadline);
}
export default timer;
