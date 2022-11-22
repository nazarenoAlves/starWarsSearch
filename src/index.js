import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextWarsProvider from './context/ContextWarsProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ContextWarsProvider>
      <App />
    </ContextWarsProvider>,

  );
