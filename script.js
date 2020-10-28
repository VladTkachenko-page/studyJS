'use strict'

const books = document.querySelectorAll('.books'),
      book = document.querySelectorAll('.book');

books[0].append(book[2]);
book[4].after(book[3]);
books[0].prepend(book[1]);

document.body.style.backgroundImage = "url('/image/you-dont-know-js.jpg')";

const headerBook = document.querySelectorAll('a');

headerBook[2].textContent = 'Книга 3. this и Прототипы Объектов';

const adv = document.querySelector('.adv');

adv.remove();

const listBook2 = book[0].querySelectorAll('li');

listBook2[3].after(listBook2[6]);
listBook2[6].after(listBook2[8]);
listBook2[9].after(listBook2[2]);

const listBook5 = book[5].querySelectorAll('li');

listBook5[1].after(listBook5[9]);
listBook5[4].after(listBook5[2]);
listBook5[7].after(listBook5[5]);

const listBook6 = book[2].querySelectorAll('li'),
      newLi = document.createElement('li');
      
      newLi.textContent = 'Глава 8: За пределами ES6';
      listBook6[8].after(newLi);
