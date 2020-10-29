'use strict';

let now = new Date();

function textDate() {
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
   const textData = document.querySelector('.textData');
   const date = now.toLocaleString("ru", options);

   function hourEnd() {
     if (now.getHours() === 1) {
        return '0' + now.getHours() + ' час ';
     } else if (now.getHours() === 21) {
        return now.getHours() + ' час ';
     } 
     else if (now.getHours() === 2 || now.getHours() === 3 || now.getHours() === 4) {
        return '0' + now.getHours() + ' часа ';
     } else if (now.getHours() === 22 || now.getHours() === 23) {
        return now.getHours() + ' часа ';
     } else if (now.getHours() < 10) {
      return '0' + now.getHours() + ' часов ';
    } else {
        return now.getHours() + ' часов ';
     }
   }

   function addZeroMinutes() {
    if (now.getMinutes() < 10) {
      return '0' + now.getMinutes() + ' минут ';
    } else {
      return now.getMinutes() + ' минут ';
    }
  };
  function addZeroSeconds() {
    if (now.getSeconds() < 10) {
      return '0' + now.getSeconds() + ' секунды';
    } else {
      return now.getSeconds() + ' секунды';
    }
  };

   textData.textContent = 'Cегодня '+ (date + ' ' + hourEnd() + addZeroMinutes() + addZeroSeconds() );

}

let numberData = document.querySelector('.numberData');

function numberDate() {
  let options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
   let date2 = now.toLocaleString("ru", options);

   numberData.textContent = date2;
}

setInterval(function() {
  now = new Date();
  textDate();
  numberDate();
}, 1000);
