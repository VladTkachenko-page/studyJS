'use strict';

let now = new Date();

function textDate() {
  let options = {
    weekday: 'long',
  };
   const textData = document.querySelector('.text-date');
   const weekday = now.toLocaleString("ru", options);

  function getDay() {
    if (now.getHours() > 6 && now.getHours() < 12) {
      return ' утро';
    } else if (now.getHours() > 12 && now.getHours() < 18) {
      return ' день';
    } else if (now.getHours() > 18 && now.getHours() < 0) {
      return ' вечер';
    } else {
      return ' ночь';
    }
  }
  function newYear() {
    let year = "'" + (now.getFullYear() + 1) + "'",
    dateStop = new Date(year).getTime(),
    dateNow = new Date().getTime(),
    timeRemaining = (dateStop - dateNow) / 1000,
    day = Math.floor(timeRemaining / 60 / 60 / 24);
        return day;
  }
  let text = `Добрый ${getDay()}
  Сегодня: ${weekday}
  Текущее время: ${now.toLocaleTimeString('en')}
  До нового года осталось ${newYear()} дней`;
  
  textData.textContent = text;
}

setInterval(function() {
  now = new Date();
  textDate();
}, 1000);