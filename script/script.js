
window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  
  //timer
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

  //menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li'),
          btnScroll = document.querySelector('main>a');
    
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    }
    btnMenu.addEventListener('click', ()=> {
      handlerMenu();
    });
    closeBtn.addEventListener('click', () => {
      handlerMenu();
    });
    menuItems.forEach((elem) => {
      elem.addEventListener('click', ()=> {
        handlerMenu();
      });
      const href = elem.querySelector('a');
        href.addEventListener('click', function(e) {
          e.preventDefault();

          let link = href.getAttribute('href').substring(1);

          const scrollTarget = document.getElementById(link),
                elementPosition = scrollTarget.getBoundingClientRect().top;

          window.scrollBy({
              top: elementPosition,
              behavior: 'smooth'
          });
      });
    });
    btnScroll.addEventListener('click', function(e) {
      e.preventDefault();

      let link = btnScroll.getAttribute('href').substring(1);

      const scrollTarget = document.getElementById(link),
            elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
          top: elementPosition,
          behavior: 'smooth'
      });
  });

  }

  toggleMenu();

  //popup

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupContent = document.querySelector('.popup-content'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');

    let animate = false,
        count = 0,
        moveInterval,
        width = window.innerWidth,
        moveBlock = function () {
          moveInterval = requestAnimationFrame(moveBlock);
          count += 20;
          width = window.innerWidth;
          if(count < (width - (popupContent.clientWidth/2))/ 2 && width > 768) {
            popupContent.style.left = count + 'px';
          } else {
            cancelAnimationFrame(moveInterval);
          }
        }
    
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        moveInterval = requestAnimationFrame(moveBlock);
        animate = true;
      });
    });
    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
      if (width > 768) {
        cancelAnimationFrame(moveInterval);
        count = 0;
        animate = false;
        popupContent.style.left = null;
      }
    });
  }

  togglePopUp();
});