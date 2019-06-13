let starting = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('#sum'),
    choosePercent = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');
    


let money, time;

starting.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD", '');
    money = +prompt("Ваш бюджет на месяц?", '');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
        let sum = 0;

        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;

            if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
                && a != '' && b != '' && a.length < 50 ) {
                    console.log('done');
                    appData.expenses[a] = b;
                    sum += +b;
            } else {
                i = i - 1;        
            }

        }
        expensesValue.textContent = sum;
    }
    else {
        alert("Для начала нажмите кнопку 'Начать расчет'!!!");
    }
});

optionalExpensesBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
        for (let i = 0; i < optionalExpensesItem.length; i++) {
            let opt = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ', ';
        }
    }
    else {
        alert("Для начала нажмите кнопку 'Начать расчет'!!!");
    }
});

countBtn.addEventListener('click', function() {
    appData.moneyPerDay = ((appData.budget - expensesValue.textContent) / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (appData.budget != undefined) {
        if(appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        }
        else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        }
        else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        }
        else {
            levelValue.textContent = 'Произошла ошибка';
        }
    } 
    else {
        alert("Для начала нажмите кнопку 'Начать расчет' и введите обязательные расходы!!!");
        dayBudgetValue.textContent = '';
    }

});

chooseIncome.addEventListener('input', function() {
    if (appData.budget != undefined) {
        let items = chooseIncome.value;
        appData.income = items.split(',  ');
        incomeValue.textContent = appData.income;
    }
    else {
        alert("Для начала нажмите кнопку 'Начать расчет'!!!");
    }
});

checkSavings.addEventListener('click', function() {
    if (appData.budget != undefined) {
        if (appData.savings === false) {
            appData.savings = true;
        }
        else {
            appData.savings = false;
        }
    }
    else {
        alert("Для начала нажмите кнопку 'Начать расчет'!!!");
    }
});

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed();
        yearSavingsValue.textContent = appData.yearIncome.toFixed();
    }
    else {
        alert("Для начала отметьте наличие накоплений!!!");
    }
});

choosePercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed();
        yearSavingsValue.textContent = appData.yearIncome.toFixed();
    }
    else {
        alert("Для начала отметьте наличие накоплений!!!");
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};