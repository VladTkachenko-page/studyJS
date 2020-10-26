'use strict'

const buttonStart = document.getElementById('start');

console.log(buttonStart);

const classData = document.querySelector('.data');
const buttonPlus1 = classData.querySelector('button');
const buttonPlus2 = classData.querySelectorAll('button')[1];

console.log(buttonPlus1, buttonPlus2);

const checkbox = document.querySelector('#deposit-check');

console.log(checkbox);

const incomeItem = document.querySelectorAll('.additional_income-item')[0];
const incomeItem2 = document.querySelectorAll('.additional_income-item')[1];

console.log(incomeItem, incomeItem2);

const budgetMonth = document.getElementsByClassName('result-total')[0];
const budgetDay = document.getElementsByClassName('result-total')[1];
const expensesMonth = document.getElementsByClassName('result-total')[2];
const additionalIncome = document.getElementsByClassName('result-total')[3];
const additionalExpenses = document.getElementsByClassName('result-total')[4];
const incomePeriod = document.getElementsByClassName('result-total')[5];
const targetMonth = document.getElementsByClassName('result-total')[6];

console.log(budgetMonth, budgetDay, expensesMonth, additionalIncome, additionalExpenses, incomePeriod, targetMonth);


const salaryAmount = classData.querySelector('.salary-amount');
const incomeTitle = classData.querySelector('.income-title');
const incomeAmount = classData.querySelector('.income-amount');
const expensesTitle = classData.querySelector('.expenses-title');
const expensesAmount = classData.querySelector('.expenses-amount');
const additionalExpensesItem = classData.querySelector('.additional_expenses-item');
const targetAmount = classData.querySelector('.target-amount');
const range = classData.querySelector('.period-select');

console.log(salaryAmount, incomeTitle, incomeAmount, expensesTitle, expensesAmount, additionalExpensesItem, targetAmount, range);
