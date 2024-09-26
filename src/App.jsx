import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Provider from './context/Provider';
import Cart from './components/Cart/Cart';
import SiteShoppingInfo from './components/SiteShoppingInfo/SiteShoppingInfo';
import Banner from './components/Banner/Banner';
import VideoBanner from './components/Banner/VideoBanner';
import Pagamento from './components/Pagamento/pagamento';
import ProductDetail from './components/ProductDetail/ProductDetail'; // Importando a página de detalhes

function App() {
  return (
    <Router>
      <Provider>
        <Header />
        <Banner />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/product/:id" element={<ProductDetail />} /> {/* Rota para a página de detalhes */}
          <Route path="/cart" element={<Cart />} /> {/* Rota para o carrinho, se necessário */}
        </Routes>
        <VideoBanner />
        <SiteShoppingInfo />
      </Provider>
    </Router>
  );
}

export default App;
