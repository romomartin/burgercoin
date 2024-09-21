const burgerPriceSat = 84202
const burgerPriceBtc = 0.00000001 * burgerPriceSat
let eurRate = 0
const apiUrl = "http://api.coinlayer.com/live?target=EUR&access_key=8016b6d9b9194fea53585ccef7e1449f";

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); 
    })
    .then(data => {
        eurRate = data.rates.BTC
        document.getElementById('price-euros').innerHTML = `= ${(eurRate * burgerPriceBtc).toFixed(2)} €`;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });