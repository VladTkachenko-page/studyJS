'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
let income = 'фриланс, реклама';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 500000;
let period = 6;
let budgetDay = money / 30;

let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  } 
  while (!isNumber(money));
};

start();

function showTypeOf (data) {
  console.log(typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.split(', '));

let expenses = [];

let getExpensesMonth = function() {
  let sum = 0;
  
  for ( let i = 0; i < 2; i++) {

    expenses[i] =  prompt('Введите обязательную статью расходов?');

    let amount;

    do {
      amount = prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));
    
    sum += +amount;
  }
  
  return sum;
}

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ', expensesAmount);

function getAccumulatedMonth() {
  return money - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

if (getTargetMonth() < 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за: ', getTargetMonth(), ' месяцев');
}

budgetDay = accumulatedMonth / 30;

console.log('Бюджет на день: ', Math.floor(budgetDay));

function getStatusIncome() {
  if (budgetDay >= 1200) {
    return('У вас высокий уровень дохода');
  } else if (budgetDay < 1200 && budgetDay >= 600 ) {
    return('У вас средний уровень дохода');
  } else if (budgetDay < 600 && budgetDay >= 0 ) {
    return('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return('Что то пошло не так');
  }
}

console.log(getStatusIncome());

