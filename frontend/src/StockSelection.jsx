import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './styles.css';

function StockSelection({ onSubmit }) {
  const [stockSymbol, setStockSymbol] = useState(null);
  const [stockOptions, setStockOptions] = useState([]);

  // Fetch stock symbols from Flask backend on component mount
  useEffect(() => {
    const fetchStockSymbols = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/stocks/symbols');
        const data = await response.json();
        console.log('Fetched stock symbols:', data); // Debugging line
        setStockOptions(data);
      } catch (error) {
        console.error('Error fetching stock symbols:', error);
      }
    };

    fetchStockSymbols();
  }, []);

  // Custom filter function to search by both label and value
  const customFilterOption = (option, inputValue) => {
    const labelMatches = option.label.toLowerCase().includes(inputValue.toLowerCase());
    const valueMatches = option.value.toLowerCase().includes(inputValue.toLowerCase());
    return labelMatches || valueMatches;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stockSymbol) {
      onSubmit(stockSymbol.value); // Send selected symbol to parent component
      setStockSymbol(null); // Clear the selection
    }
  };

  return (
    <div>
      <h2>Select a Stock Symbol</h2>
      <form onSubmit={handleSubmit}>
        <Select
          options={stockOptions}
          value={stockSymbol}
          onChange={(selectedOption) => setStockSymbol(selectedOption)}
          placeholder="Select a stock symbol"
          isSearchable
        />
        <button type="submit">Track Stock</button>
      </form>
    </div>
  );
}

export default StockSelection;