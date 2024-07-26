import { useEffect, useState } from 'react';
import './App.scss';
import currencyData from '../../data/currencies';
import Header from './Header/Header';

interface Currency {
  name: string;
  rate: number;
}

function App() {
  const [data, setData] = useState<Currency[]>([]);
  const [displayCurrencies, setDisplayCurrencies] = useState(true);
  const [amount, setAmount] = useState<number>(1); // Default to 1 for "1 euro"
  const [toCurrency, setToCurrency] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null); // Devise sélectionnée
  const [result, setResult] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>(''); // État pour le texte de recherche

  useEffect(() => {
    setData(currencyData);
  }, []);

  const toggleCurrencies = () => {
    setDisplayCurrencies(!displayCurrencies);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleCurrencyClick = (currencyName: string) => {
    setToCurrency(currencyName);
    setSelectedCurrency(currencyName); // Met à jour la devise sélectionnée
    convertCurrency(currencyName);
  };

  const convertCurrency = (currencyName: string) => {
    const euroRate = 1; // Base currency is Euro
    const toRate = data.find(currency => currency.name === currencyName)?.rate || 1;
    const conversionResult = amount * toRate / euroRate;
    setResult(conversionResult);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Filtrer les devises en fonction du texte de recherche
  const filteredData = data.filter(currency =>
    currency.name.toLowerCase().includes(searchText.toLowerCase())
  );
   
  return (
    <div className='container'>
      <div className="card">
        <Header amount={amount} handleAmountChange={handleAmountChange} toggleCurrencies={toggleCurrencies} />
        
        {displayCurrencies && (
          <div className="mainCard">
            <input
              type="text"
              placeholder="Filtrer les devises"
              value={searchText}
              onChange={handleSearchChange}
            />
            <ul>
              {filteredData.map((currency, index) => (
                <li key={index} onClick={() => handleCurrencyClick(currency.name)}>
                  <p>{currency.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="result">
          <p>{result !== null ? result.toFixed(2).toLocaleString() : '---'} </p>
          <span>{selectedCurrency ? `${selectedCurrency}` : ''}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
