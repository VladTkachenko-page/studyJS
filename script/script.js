
window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  
  function countTimer(deadline){
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

  function getTimeRemaining(){
    let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60) % 24;
        return { timeRemaining, hours, minutes, seconds };
  };

  function addZero(numberTime) {
    if (numberTime < 10) {
      return '0' + numberTime;
    } else {
      return numberTime;
    }
  };

  function updateClock() {
    let timer =  getTimeRemaining();
    let timerId = setInterval(updateClock, 1000);
    timerHours.textContent = addZero(timer.hours);
    timerMinutes.textContent = addZero(timer.minutes);
    timerSeconds.textContent = addZero(timer.seconds);
    if (timer.timeRemaining > 0) {
      timerId; 
    } else if (timer.timeRemaining < 0){
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
      clearInterval(timerId);
    }
  };

  updateClock();
    
  }

  countTimer('01 december 2020');

});