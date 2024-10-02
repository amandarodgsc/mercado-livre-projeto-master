import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Pagamento from './components/Pagamento/pagamento';
import SiteShoppingInfo from './components/SiteShoppingInfo/SiteShoppingInfo';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <Routes>
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/" element={<Products />} />
        </Routes>
        <Cart />
     
        <SiteShoppingInfo />
      </Router>
    </Provider>
  );
}

export default App;
