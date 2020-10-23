'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
      do {
        money = prompt('Ваш месячный доход?', 20000);
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 200000,
  period: 4,
  asking: function() {

    if(confirm('Есть ли у вас дополнительный источник заработка?')){
      let itemIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Фриланс');
      }while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim() === '');
      let cashIncome;
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 3000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, ресторан, кино');
        appData.addExpenses = addExpenses.split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for ( let i = 0; i < 2; i++) {
          let expenses = [];
          do {
            expenses[i] =  prompt('Введите обязательную статью расходов?', 'Садик');
          }while (isNumber(expenses[i]) || expenses[i] === null || expenses[i].trim() === '');
          
  
          let amount;
  
          do {
            amount = prompt('Во сколько это обойдется?', 1000);
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
    return Math.ceil(appData.mission / appData.budgetMonth);
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
  },
  getInfoDeposit: function(){
    if(appData.deposit === true){
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 5);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сума заложена?', 20000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  }
}

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Расходы за месяц: ', appData.expensesMonth);


if (appData.getTargetMonth() < 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за: ', appData.getTargetMonth(), ' месяцев');
}

console.log('Бюджет на день: ', Math.floor(appData.budgetDay));

console.log(appData.getStatusIncome());

for(let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' Значение: ' + appData[key]);
}
appData.addExpenses.forEach(function(item, i) {
  appData.addExpenses[i] = item[0].toUpperCase() + item.slice(1);
});
console.log(appData.addExpenses.join(', '));