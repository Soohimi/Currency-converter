import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const BASE_URL = 'https://latest.currency-api.pages.dev/v1/currencies/eur.json'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExcahngeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  console.log(exchangeRate)
  

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const rates = data.eur;
        const firstCurrency = Object.keys(rates)[143];
        setCurrencyOptions(Object.keys(rates));
        setFromCurrency(data.eur)
        setToCurrency(firstCurrency)
        setExcahngeRate(data.eur[firstCurrency])
      });
  }, []);
  
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
      />
      <div className='equals'>=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
      />
    </>
  );
}

export default App;
