import React from 'react';
import './App.css';
import StocksTable from './components/StocksTable';

function App() {
  return (
    <div>
      <header className="App-header">
        <p>
          Holdermind
        </p>
        <StocksTable/>
      </header>
    </div>
  );
}

export default App;
