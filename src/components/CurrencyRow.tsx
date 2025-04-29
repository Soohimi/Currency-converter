export default function CurrencyRow(props) {
  const {
    currencyOptions
  } = props
  return (
    <div>
      <input type="number" />
      <select>
        {currencyOptions.map(option => (
          <option value={option}>{option}</option>
        ))}  
      </select>
    </div>
  )
}
