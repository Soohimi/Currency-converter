import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const BASE_URL = 'https://latest.currency-api.pages.dev/v1/currencies/eur.json'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  console.log(currencyOptions)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const rates = data.eur;
        setCurrencyOptions(Object.keys(rates));
      });
  }, []);
  
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}
      />
      <div className='equals'>=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}
      />
    </>
  );
}

export default App;
