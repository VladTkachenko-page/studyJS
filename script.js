'use strict';

let week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let date = new Date();

week.forEach(function(item, i, arr) {
  if (item === 'Суббота' || item === 'Воскресенье') {
    document.write(item.italics() + '</br>');
  } else if (date.getDay() === i) {
    document.write(item.bold() + '</br>');
  } else {
    document.write(item + '</br>');
  }
});

