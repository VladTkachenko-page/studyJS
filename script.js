'use strict';
let newBlock;

function DomElement(selector, height, width, bg, fontSize) {  
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  
};

DomElement.prototype.addBlock = function (selector) {
  if (selector.slice(0, 1) === '.') {
    newBlock = document.createElement('div');
    document.body.prepend(newBlock);
    newBlock.classList.add(selector.slice(1));
  } else if (selector.slice(0, 1) === '#') {
    newBlock = document.createElement('p');
    document.body.prepend(newBlock);
    newBlock.id = selector.slice(1);
  }
  newBlock.textContent = 'Привет мир!'; 
};
DomElement.prototype.cssText = function(height, width, bg, fontSize) {
    newBlock.style.height = height;
    newBlock.style.width = width;
    newBlock.style.backgroundColor = bg;
    newBlock.style.fontSize = fontSize;
}

let block = new DomElement();

  // block = new DomElement('#block', '100px', '500px', '#aeaeae', '20px');
  // block.addBlock(block.selector);
  // block.cssText(block.height, block.width, block.bg, block.fontSize);

document.addEventListener("DOMContentLoaded", function() {
  block = new DomElement('.block', '100px', '100px', '#000000', '20px');
  block.addBlock(block.selector);
  block.cssText(block.height, block.width, block.bg, block.fontSize);
  newBlock.style.position = 'absolute';
});

let topBlock = 0,
    left = 0;
    document.onkeydown = callback;

function callback(event) {
  if (event.code === 'ArrowUp' && topBlock > 0) {
    topBlock -= 10;
    newBlock.style.top = topBlock + 'px';
  } else if (event.code === 'ArrowDown') {
    topBlock += 10;
    newBlock.style.top = topBlock + 'px';
  } else if (event.code === 'ArrowRight') {
    left = left + 10;
    newBlock.style.left = left + 'px';
  } else if (event.code === 'ArrowLeft' && left > 0) {
    left -= 10;
    newBlock.style.left = left + 'px';
  }
};
  
