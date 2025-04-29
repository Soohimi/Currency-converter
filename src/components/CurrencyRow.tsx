export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onCHangeAmount,
    amount
  } = props
  return (
    <div>
      <input type="number" className="input" value={amount} onChange={onCHangeAmount}/>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}  
      </select>
    </div>
  )
}
