import { useEffect, useState } from 'react';
import './App.scss';
import CurrencyRow from './components/CurrencyRow';

const BASE_URL = 'https://latest.currency-api.pages.dev/v1/currencies';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const [exchangeRate, setExchangeRate] = useState<number>();
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  let toAmount: number, fromAmount: number;

  if (exchangeRate) {
    if (amountInFromCurrency) {
      fromAmount = amount;
      toAmount = amount * exchangeRate;
    } else {
      toAmount = amount;
      fromAmount = amount / exchangeRate;
    }
  } else {
    fromAmount = toAmount = 0;
  }

  useEffect(() => {
    fetch(`${BASE_URL}/eur.json`)
      .then(res => res.json())
      .then(data => {
        const rates = data.eur;
        const firstCurrency = Object.keys(rates)[0];
        setCurrencyOptions(Object.keys(rates));
        setFromCurrency('eur');
        setToCurrency(firstCurrency);
        setExchangeRate(rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${BASE_URL}/${fromCurrency}.json`)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data[fromCurrency][toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.valueAsNumber);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.valueAsNumber);
    setAmountInFromCurrency(false);
  }

  function toggleTheme() {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-theme');
  }

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      setDarkMode(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  return (
    <>
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      
      <div className="container">
        <h1>Currency Converter</h1>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className='equals'>=</div>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </>
  );
}

export default App;
