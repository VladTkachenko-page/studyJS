'use strict';

let buttonStart = document.getElementById('start'),
    buttonCancel = document.getElementById('cancel'),

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
      periodAmount = document.querySelector('.period-amount'),
      inputAll = document.querySelectorAll('input');
      
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
  accumulationPeriod: 0,
  start: function() {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
    this.budget = +salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getTargetMonth();
    this.calcPeriod();
    this.showResult();
  },
  reset: function () {
    inputAll = document.querySelectorAll('input');
    for (let i = 0; i < inputAll.length; i++) {
      inputAll[i].readOnly = false;
      inputAll[i].value = '';
    };
    periodSelect.value = 1;
    buttonStart.style.display = 'block';
    buttonCancel.style.display = 'none';
    this.addExpenses = [];
    this.addIncome = [];
    this.expenses = {};
    this.income = {};
    appData.accumulationPeriod = 0;
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 2) {
      incomeItems[1].remove();
    } else if (incomeItems.length === 3){
      incomeItems[1].remove();
      incomeItems[2].remove();
      incomePlus.style.display = 'block';
    }
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 2) {
      expensesItems[1].remove();
    } else if (expensesItems.length === 3) {
      expensesItems[1].remove();
      expensesItems[2].remove();
      expensesPlus.style.display = 'block';
    }
  },
  showResult: function() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = Math.ceil(this.budgetDay);
    expensesMonth.value = this.expensesMonth;
    additionalExpenses.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');
    targetMonth.value = this.getTargetMonth();
    incomePeriod.value = this.accumulationPeriod;
    periodSelect.oninput = function() {
      periodAmount.textContent = periodSelect.value;
      appData.calcPeriod();
      incomePeriod.value = appData.accumulationPeriod;
    };
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
      for(let key in this.expenses) {
        this.expensesMonth += +this.expenses[key]
      }
    },
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function() {
    if (this.budgetDay >= 1200) {
      return('У вас высокий уровень дохода');
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600 ) {
      return('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay >= 0 ) {
      return('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return('Что то пошло не так');
    }
  },
  getInfoDeposit: function(){
    if(this.deposit === true){
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 5);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сума заложена?', 20000);
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcPeriod: function(){
    appData.accumulationPeriod = this.budgetMonth * periodSelect.value;
  }
};

let start = appData.start.bind(appData);
let reset = appData.reset.bind(appData);

buttonStart.addEventListener('click', start);
buttonStart.addEventListener('click', function () {
  if (salaryAmount.value !== '') {
    for (let i = 0; i < inputAll.length; i++) {
      inputAll[i].readOnly = true;
    }
    buttonStart.style.display = 'none';
    buttonCancel.style.display = 'block';
  }
});
buttonCancel.addEventListener('click', reset);

let checkInput = function() {
  inputAll = document.querySelectorAll('input');
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
  };
};
expensesPlus.addEventListener('click', appData.addExpensesBlock);
expensesPlus.addEventListener('click', checkInput);
incomePlus.addEventListener('click', appData.addIncomeBlock);
incomePlus.addEventListener('click', checkInput);
checkInput();

