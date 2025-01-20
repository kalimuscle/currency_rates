import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { currencies } from './utils/currencies.js';

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);

  // Fetch exchange rate from an API
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/currencies/${fromCurrency['value']}/rate`
        );
        const data = await response.json();
        console.log(data);
        const rates = data.rates;
        setExchangeRates(rates);
      } catch (error) {
          console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/currencies/${fromCurrency['value']}/rate`
      );
      const data = await response.json();
      console.log(data);
      const rates = data.rates;
      setExchangeRates(rates);
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Convert currencies</h2>
      </div>

      <div class="mt-10 mx-auto w-4/12">
        <form class="space-y-6" action="#" method="POST">
          <div className="flex" style={{ gap: "5px" }}>
            {/* Primera columna */}
            <div className="flex-1 rounded-md">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.valueAsNumber)}
                className="w-full min-w-36 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa un número"
              />
            </div>

            {/* Segunda columna */}
            <div className="flex-1 rounded-md min-w-36" style={{ gap: "5px" }}>
              <Select 
                onChange={(e) => setFromCurrency(e)} value={fromCurrency} options={currencies} />
            </div>

            <div className="flex-1 rounded-md" style={{ gap: "5px" }}>
              <p className='w-full text-center p-2 font-bold text-gray-900'> To </p>
            </div>

            <div className="flex-1 rounded-md min-w-36" style={{ gap: "5px" }}>
              <Select options={currencies.filter(currency => currency !== fromCurrency)} value={toCurrency} onChange={(e) => setToCurrency(e)} />
            </div>

            <div className="flex-1 rounded-md" style={{ gap: "5px" }}>
              <p className='w-full text-center p-2 font-bold text-gray-900'> = </p>
            </div>

            <div className="flex-1 rounded-md min-w-36" style={{ gap: "5px" }}>
            <p className='p-2 w-full text-gray-900 font-bold'>
              {
                fromCurrency !== null && toCurrency !== null && exchangeRates !== null ? `${(amount * exchangeRates[toCurrency['value']]).toFixed(2) } ${  toCurrency['value'] }` : ``
              }
            </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default App;
