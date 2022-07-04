getCurrencies ()

let rate = {}

const input = document.querySelector('#input')
const select = document.querySelector('#select')
const result = document.querySelector('#result')

const dataValueUSD = document.querySelector('[data-value="USD"]')
const dataValueEUR = document.querySelector('[data-value="EUR"]')
const dataValueGBP = document.querySelector('[data-value="GBP"]')



async function getCurrencies (){
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const promise = await data;
    
    rate.USD = promise.Valute.USD.Value
    rate.EUR = promise.Valute.EUR.Value
    rate.GBP = promise.Valute.GBP.Value


    dataValueUSD.textContent = rate.USD.toFixed(2);
    dataValueEUR.textContent = rate.EUR.toFixed(2);
    dataValueGBP.textContent = rate.GBP.toFixed(2);

    if (promise.Valute.USD.Value > promise.Valute.USD.Previous){
        dataValueUSD.classList.add('top')
    } else {
        dataValueUSD.classList.add('bottom')
    }

    if (promise.Valute.EUR.Value > promise.Valute.EUR.Previous){
        dataValueEUR.classList.add('top')
    } else {
        dataValueEUR.classList.add('bottom')
    }

    if (promise.Valute.GBP.Value > promise.Valute.GBP.Previous){
        dataValueGBP.classList.add('top')
    } else {
        dataValueGBP.classList.add('bottom')
    }
    

    input.oninput = calculateSum;
    select.oninput = calculateSum;
    function calculateSum (){
        result.value =  parseFloat(input.value / rate[select.value]).toFixed(2);
    }

}
