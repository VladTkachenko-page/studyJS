'use strict';

const buttonStart = document.getElementById('start'),
      buttonCancel = document.getElementById('cancel'),

      incomePlus = document.getElementsByTagName('button')[0],
      expensesPlus = document.getElementsByTagName('button')[1],

      depositCheck = document.querySelector('#deposit-check'),

      incomeItem = document.querySelectorAll('.additional_income-item'),

      budgetMonth = document.getElementsByClassName('budget_month-value')[0],
      budgetDay = document.getElementsByClassName('budget_day-value')[0],
      expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncome = document.getElementsByClassName('additional_income-value')[0],
      additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriod = document.getElementsByClassName('income_period-value')[0],
      targetMonth = document.getElementsByClassName('target_month-value')[0],
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');

let   salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelectorAll('.income-title')[1],
      incomeAmount = document.querySelector('.income-amount'),
      incomeItems = document.querySelectorAll('.income-items'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesItem = document.querySelectorAll('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      inputAll = document.querySelectorAll('input');
      
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
class AppData  {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.accumulationPeriod = 0;
  }

  start() {
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }
    this.budget = +salaryAmount.value;
    
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpInc();
    this.getInfoDeposit();
    this.getBudget();
    this.getTargetMonth();
    this.calcPeriod();
    this.showResult();
    if (salaryAmount.value !== '') {
      for (let i = 0; i < inputAll.length; i++) {
        inputAll[i].readOnly = true;
      }
      buttonStart.style.display = 'none';
      buttonCancel.style.display = 'block';
    };
  };

  reset() {
    const _this = this;
    inputAll = document.querySelectorAll('input');
    for (let i = 0; i < inputAll.length; i++) {
      inputAll[i].readOnly = false;
      inputAll[i].value = '';
    };
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    buttonStart.style.display = 'block';
    buttonCancel.style.display = 'none';
    this.addExpenses = [];
    this.addIncome = [];
    this.expenses = {};
    this.income = {};
    this.accumulationPeriod = 0;
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
    inputAll = document.querySelectorAll('input');
  };

  showResult() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = Math.ceil(this.budgetDay);
    expensesMonth.value = this.expensesMonth;
    additionalExpenses.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');
    targetMonth.value = this.getTargetMonth();
    incomePeriod.value = this.accumulationPeriod;
    periodSelect.oninput = () => {
      periodAmount.textContent = periodSelect.value;
      this.calcPeriod();
      incomePeriod.value = this.accumulationPeriod;
    };
  };

  
  addExpIncBlock() {
    const add = (item, btn) => {
      const startStr =  item[0].className.split('-')[0];
      let cloneItem = item[0].cloneNode(true),
      cloneItems = cloneItem.querySelectorAll('input');

      cloneItems[0].value = '';
        cloneItems[1].value = '';
        item[0].parentNode.insertBefore(cloneItem, btn);
        item = document.querySelectorAll(`.${startStr}-items`);
        if (item.length === 3) {
          btn.style.display = 'none';
        }
        cloneItems[0].addEventListener('input', () => {
          cloneItems[0].value = cloneItems[0].value.replace(/[^а-яА-Я,;. ]/,'');
        });
        cloneItems[1].addEventListener('input', () => {
          cloneItems[1].value = cloneItems[1].value.replace(/[^0-9]/,'');
        });
    }
    incomePlus.addEventListener('click', function() {
      add(incomeItems, incomePlus);
    });
    expensesPlus.addEventListener('click', function() {
      add(expensesItems, expensesPlus);
    });
  };
  
  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value,
            itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== ''){
            this[startStr][itemTitle] = itemAmount;
          }
    };
    incomeItems = document.querySelectorAll('.income-items'); 
    expensesItems = document.querySelectorAll('.expenses-items'); 
    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for(let key in this.income) {
      this.incomeMonth += +this.income[key];
    };
  };

  getAddExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const str = 'add' + startStr.split('_')[1].toUpperCase()[0] + startStr.split('_')[1].slice(1);
      item = item.value.trim();
      if (item !== '') {
        this[str].push(item);
      }
    }
    additionalExpensesItem.forEach(count);
    incomeItem.forEach(count);
  };

  getExpensesMonth() { 
    for(let key in this.expenses) {
      this.expensesMonth += +this.expenses[key]
    }
  };

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth + monthDeposit - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  };

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  };

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return('У вас высокий уровень дохода');
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600 ) {
      return('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay >= 0 ) {
      return('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return('Что то пошло не так');
    }
  };

  getInfoDeposit(){
    if (this.deposit === true){
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  };

  calcPeriod(){
    appData.accumulationPeriod = this.budgetMonth * periodSelect.value;
  };
  changePercent(){
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      this.percentDeposit = depositPercent.value;
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
    depositPercent.addEventListener('input', () => {
      if (depositPercent.value < 1 || depositPercent.value > 100 ){
        alert('Введите корректное значение в поле проценты');
        depositPercent.value = '';
        buttonStart.disabled = true; 
      } else {
        buttonStart.disabled = false; 
      }
    });
  };
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);

    }
  };
  eventsListeners () {
    const start = appData.start.bind(appData);
    const reset = appData.reset.bind(appData);

    buttonStart.addEventListener('click', start);
    buttonCancel.addEventListener('click', reset);

    depositCheck.addEventListener('change', this.depositHandler.bind(this));

    const checkInput = () => {
      inputAll = document.querySelectorAll('input');
      for (let i = 0; i < inputAll.length; i++) {
        if (inputAll[i].placeholder === 'Наименование' || inputAll[i].placeholder === 'название') {
          inputAll[i].addEventListener('input', () => {
            inputAll[i].value = inputAll[i].value.replace(/[^а-яА-Я,;. ]/,'');
          });
        } else if (inputAll[i].placeholder === 'Сумма' || inputAll[i].placeholder === 'Процент') {
          inputAll[i].addEventListener('input', () => {
            inputAll[i].value = inputAll[i].value.replace(/[^0-9]/,'');
          });
        }
      };
    };
    this.addExpIncBlock();
    checkInput();
  };
}
const appData = new AppData();
appData.eventsListeners();