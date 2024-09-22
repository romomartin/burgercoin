from flask import Flask, jsonify
import yfinance as yf

app = Flask(__name__)

@app.route('/price', methods=['GET'])
def get_btc_price():
    btc_ticker = yf.Ticker("BTC-EUR")
    btc_data = btc_ticker.history(period="1d")
    eurRate = btc_data['Close'].iloc[-1]
    return jsonify({'eur_rate': round(eurRate, 2)})

if __name__ == '__main__':
    app.run(debug=True)

