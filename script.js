'use strict';

let now = new Date();

function textDate() {
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
   let textData = document.querySelector('.textData');
   let date = now.toLocaleString("ru", options);

  if (now.getHours() === 1 || now.getHours() === 21) {
    textData.textContent = 'Cегодня '+ (date + ' ' + now.getHours() + ' час ' + now.getMinutes() + ' минут ' + now.getSeconds() + ' секунды' );
  } else if (now.getHours() === 2 || now.getHours() === 3 || now.getHours() === 4 || now.getHours() === 22 || now.getHours() === 23) {
    textData.textContent = 'Cегодня '+ (date + ' ' + now.getHours() + ' часa ' + now.getMinutes() + ' минут ' + now.getSeconds() + ' секунды' );
  } else {
    textData.textContent = 'Cегодня '+ (date + ' ' + now.getHours() + ' часов ' + now.getMinutes() + ' минут ' + now.getSeconds() + ' секунды' );
  }
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
