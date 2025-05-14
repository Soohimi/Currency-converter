interface CurrencyRowProps {
  currencyOptions: string[];
  selectedCurrency: string | undefined;
  onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  amount: number;
}

export default function CurrencyRow(props: CurrencyRowProps) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props;

  return (
    <div className="currency-row">
      <input 
        type="number" 
        value={amount} 
        onChange={onChangeAmount}
        min="0"
        step="0.01"
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
          <option key={option} value={option}>
            <span className="currency-badge">{option}</span>
          </option>
        ))}
      </select>
    </div>
  );
}
