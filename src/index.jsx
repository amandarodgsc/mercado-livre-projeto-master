// src/index.js
import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './context/Provider'; // Verifique o caminho correto

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
