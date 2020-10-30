'use strict'

const buttonStart = document.getElementById('start'),

      buttonPlus1 = document.getElementsByTagName('button')[0],
      buttonPlus2 = document.getElementsByTagName('button')[1],

      checkbox = document.querySelector('#deposit-check'),

      incomeItem = document.querySelectorAll('.additional_income-item')[0],
      incomeItem2 = document.querySelectorAll('.additional_income-item')[1],

      budgetMonth = document.getElementsByClassName('budget_month-value')[0],
      budgetDay = document.getElementsByClassName('budget_day-value')[0],
      expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncome = document.getElementsByClassName('additional_income-value')[0],
      additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriod = document.getElementsByClassName('income_period-value')[0],
      targetMonth = document.getElementsByClassName('target_month-value')[0],

      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      range = document.querySelector('.period-select');
