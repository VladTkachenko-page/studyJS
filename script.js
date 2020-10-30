'use strict';

let buttonStart = document.getElementById('start'),

      incomePlus = document.getElementsByTagName('button')[0],
      expensesPlus = document.getElementsByTagName('button')[1],

      checkbox = document.querySelector('#deposit-check'),

      incomeItem = document.querySelectorAll('.additional_income-item'),

      budgetMonth = document.getElementsByClassName('budget_month-value')[0],
      budgetDay = document.getElementsByClassName('budget_day-value')[0],
      expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncome = document.getElementsByClassName('additional_income-value')[0],
      additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriod = document.getElementsByClassName('income_period-value')[0],
      targetMonth = document.getElementsByClassName('target_month-value')[0],

      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelectorAll('.income-title')[1],
      incomeAmount = document.querySelector('.income-amount'),
      incomeItems = document.querySelectorAll('.income-items'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount');
      
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function() {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    // appData.getInfoDeposit();
    appData.getBudget();
    appData.getTargetMonth();
    appData.showResult();
  },
  showResult: function() {
    budgetMonth.value = appData.budgetMonth;
    budgetDay.value = Math.ceil(appData.budgetDay);
    expensesMonth.value = appData.expensesMonth;
    additionalExpenses.value = appData.addExpenses.join(', ');
    additionalIncome.value = appData.addIncome.join(', ');
    targetMonth.value = appData.getTargetMonth();
    incomePeriod.value = appData.calcPeriod();
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input')[0].value = '';
    cloneExpensesItem.querySelectorAll('input')[1].value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value,
      cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input')[0].value = '';
    cloneIncomeItem.querySelectorAll('input')[1].value = '';
    console.log('cloneIncomeItem: ', cloneIncomeItem);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value,
          cashIncome = item.querySelector('.income-amount').value;
          if (itemIncome !== '' && cashIncome !== ''){
            appData.income[itemIncome] = cashIncome;
          }
          for(let key in appData.income) {
            appData.incomeMonth += +appData.income[key]
          }
    });
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    incomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (item.value !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function() { 
      for(let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key]
      }
    },
  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  }
}
buttonStart.addEventListener('click', appData.start);
periodSelect.onchange = function() {
  periodAmount.textContent = periodSelect.value;
};
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

let inputAll = document.querySelectorAll('input');

    for (let i = 0; i < inputAll.length; i++) {
      if (inputAll[i].placeholder === 'Наименование' || inputAll[i].placeholder === 'название') {
        inputAll[i].addEventListener('input',()=> {
          inputAll[i].value = inputAll[i].value.replace(/[^а-яА-Я,;. ]/,'');
        });
      } else if (inputAll[i].placeholder === 'Сумма') {
        inputAll[i].addEventListener('input',()=> {
          inputAll[i].value = inputAll[i].value.replace(/[^0-9]/,'');
        });
      }
    }


// if (appData.getTargetMonth() < 0) {
//   console.log('Цель не будет достигнута');
// } else {
//   console.log('Цель будет достигнута за: ', appData.getTargetMonth(), ' месяцев');
// }

// console.log('Бюджет на день: ', Math.floor(appData.budgetDay));


// for(let key in appData) {
//   console.log('Наша программа включает в себя данные: ' + key + ' Значение: ' + appData[key]);
// }
// appData.addExpenses.forEach(function(item, i) {
//   appData.addExpenses[i] = item[0].toUpperCase() + item.slice(1);
// });
// console.log(appData.addExpenses.join(', '));