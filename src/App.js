import React from 'react';
import './App.css';
import Table from './components/Table';
import ContextWarsProvider from './context/ContextWarsProvider';

function App() {
  return (
    <ContextWarsProvider>
      <Table />
    </ContextWarsProvider>

  );
}

export default App;
