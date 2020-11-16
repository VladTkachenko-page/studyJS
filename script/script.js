'use strict';
  
const box = document.querySelector('.box'),
      start = document.querySelector('#start'),
      reset = document.querySelector('#reset');

let animate = false,
    count = 0;

  box.style.cssText = `width: 100px;
  background-color: black;
  height: 100px;
  margin-bottom: 20px;
  position: relative;` 
  let moveInterval,
      moveBlock = function () {
        moveInterval = requestAnimationFrame(moveBlock);
        count++;
        if(count < 500) {
          box.style.left = count + 'px';
        } else {
          cancelAnimationFrame(moveInterval);
        }
      }

  start.addEventListener('click', function () {  
    if(!animate) {
      moveInterval = requestAnimationFrame(moveBlock);
      animate = true;
    } else {
      animate = false;
      cancelAnimationFrame(moveInterval);
    }
  });
  reset.addEventListener('click', function () { 
      cancelAnimationFrame(moveInterval);
      box.style.left = 0;
      count = 0;
      animate = false;
  });