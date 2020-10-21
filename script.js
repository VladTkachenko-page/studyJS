'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
    start = function() {
      do {
        money = prompt('Ваш месячный доход?');
      } 
      while (!isNumber(money));
  };

  start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 200000,
  period: 4,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for ( let i = 0; i < 2; i++) {
          let expenses = [];
          expenses[i] =  prompt('Введите обязательную статью расходов?');
  
          let amount;
  
          do {
            amount = prompt('Во сколько это обойдется?');
          } while (!isNumber(amount));
          
          appData.expenses[expenses[i]] = amount;
        }
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function() { 
      for(let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key]
      }
    },
  getBudget: function() {
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function() {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      return('У вас высокий уровень дохода');
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600 ) {
      return('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0 ) {
      return('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return('Что то пошло не так');
    }
  }
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Расходы за месяц: ', appData.expensesMonth);


if (appData.period < 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за: ', appData.period, ' месяцев');
}

console.log('Бюджет на день: ', Math.floor(appData.budgetDay));

console.log(appData.getStatusIncome());

for(let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' Значение: ' + appData[key]);
}

