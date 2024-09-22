const burgerPriceSat = 84202
const burgerPriceBtc = 0.00000001 * burgerPriceSat
let eurRate = 0
const apiUrl = "https://api.coinlayer.com/live?target=EUR&access_key=c350491d16b47398ec198ceb1f7505b2";

getStylePropPixels = (pixelString)=>{
    return Number(pixelString.substring(0,pixelString.length - 2))
}

const bgColumn = document.getElementsByClassName("column")[0]
const bgColumnStyle = window.getComputedStyle(bgColumn)
const bgColumnHeight = getStylePropPixels(bgColumnStyle.height)

const burgerIcon = document.getElementsByClassName("burger")[10]
const burgerIconStyle = window.getComputedStyle(burgerIcon)
const burgerIconHeight = 
    getStylePropPixels(burgerIconStyle.marginTop) + 
    getStylePropPixels(burgerIconStyle.height)

const burgerAnimationEnd = Math.ceil(bgColumnHeight%burgerIconHeight)

const btcIcon = document.getElementsByClassName("btc")[10]
const btcIconStyle = window.getComputedStyle(btcIcon)
const btcIconHeight = 
    getStylePropPixels(btcIconStyle.marginTop) + 
    getStylePropPixels(btcIconStyle.height)

const btcAnimationStart = Math.ceil(bgColumnHeight%btcIconHeight)

let root = document.documentElement;
root.style.setProperty('--burger-end-y', `-${burgerAnimationEnd}px`);
root.style.setProperty('--btc-start-y', `-${btcAnimationStart}px`);

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
        document.getElementById('price-euros').innerHTML = `= XXX`;
    });