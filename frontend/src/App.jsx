import React, { useState, useEffect } from 'react';
import StockSelection from './StockSelection';

function App() {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [stockPrices, setStockPrices] = useState({});

  const handleStockSubmit = (symbol) => {
    if (!selectedStocks.includes(symbol)) {
      setSelectedStocks((prevStocks) => [...prevStocks, symbol]);
    }
  };

  // Fetch stock prices whenever selectedStocks changes
  useEffect(() => {
    if (selectedStocks.length > 0) {
      fetchStockPrices(selectedStocks);
    }
  }, [selectedStocks]);

  const fetchStockPrices = async (symbols) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/stocks?symbols=${symbols.join(',')}`
      );
      const data = await response.json();
      setStockPrices(data);
    } catch (error) {
      console.error('Error fetching stock prices:', error);
    }
  };

  return (
    <div>
      <h1>Stock Price Notification System</h1>
      <p>Select the companies you want to track!</p>

      <StockSelection onSubmit={handleStockSubmit} />

      <h3>Tracking Stocks:</h3>
      <ul>
        {selectedStocks.length > 0 ? (
          selectedStocks.map((stock, index) => (
            <li key={index}>
              {stock}: ${stockPrices[stock] ? stockPrices[stock].toFixed(2) : 'Loading...'}
            </li>
          ))
        ) : (
          <p>No stocks selected yet.</p>
        )}
      </ul>
    </div>
  );
}

export default App;