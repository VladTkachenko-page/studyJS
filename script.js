'use strict';

let arr = ['24658', '584946', '489466', '684645', '589846', '486315', '24846'];

for (let i = 0; i < arr.length; i++) {
  if (arr[i].substr(0, 1) === '2' || arr[i].substr(0, 1) === '4') {
    console.log('arr[i]: ', arr[i]);
  }
}

checkj:
for (let i = 2; i >= 1 && i < 100; i++) {
  let j;
  for (j = 2; j < i; j++ ) {
    if ( i % j === 0 ) {
      continue checkj;
    }
  }     
  console.log('i: ', i, 'Делители этого числа: 1 и', j);
}
