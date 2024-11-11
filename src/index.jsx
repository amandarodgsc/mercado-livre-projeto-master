import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './context/Provider'; 
import 'font-awesome/css/font-awesome.min.css';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
