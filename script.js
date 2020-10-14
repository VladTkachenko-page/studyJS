'use strict';

let lorem = 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.';

function cutText(text) {
  if (typeof text !== 'string') {
    alert('Передана не строка');
  };
  
  text = text.trim();

  if (text.length >= 30) {
    return text.slice(0, 30) + '...';
  } else {
    return text;
  }
};

console.log(cutText(lorem));