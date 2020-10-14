'use strict';

let money = 10000;
let income = 'фриланс, реклама';
let addExpenses = 'Коммуналка, интернет, еда, транспорт';
let deposit = true;
let mission = 500000;
let period = 6;
let budgetDay = money / 30;

function showTypeOf (data) {
  console.log(typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.split(', '));

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

// console.log('Бюджет на месяц: ', budgetMonth);
// console.log('Цель будет достигнута за: ', Math.ceil(mission / budgetMonth), ' месяцев');
function getExpensesMonth () {
  return amount1 + amount2;
};

console.log('Расходы за месяц: ',getExpensesMonth (amount1, amount2));

function getAccumulatedMonth() {
  return money - getExpensesMonth (amount1, amount2);
}

const accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

console.log('Цель будет достигнута за: ', getTargetMonth(), ' месяцев');

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

