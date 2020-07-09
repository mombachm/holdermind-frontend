import React from 'react';
import './App.css';
import StocksTable from './components/StocksTable';

function App() {
  return (
    <div>
      <header>
        <p>
          Holdermind
        </p>
      </header>
      <StocksTable/>
    </div>
  );
}

export default App;
