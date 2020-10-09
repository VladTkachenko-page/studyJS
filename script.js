let num = 266219;
let stringArray = num.toString().split('');
let numArray = stringArray.map(Number);
let production = 1;

numArray.forEach(function(numArray) {
  production *= numArray;
});

console.log(production);

let pow = production ** 3; 

console.log(pow);

pow = pow.toString();

console.log(pow.substr(0, 2));

