'use strict'

let colorText = document.getElementById('color'),
    btnChange = document.getElementById('change');


btnChange.addEventListener('click', function() {
    let randomColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
    document.body.style.backgroundColor = randomColor;
    colorText.textContent = randomColor;

});