import React, { useState, useEffect, use } from 'react'
import './App.css'
import CurrencyRow from './components/CurrencyRow.jsx'

const BASE_URL = 'https://api.currencyapi.com/v3/historical'

function App() {

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data)
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow />
      <div className='equals'>=</div>
      <CurrencyRow />
    </>
  )
}

export default App
 