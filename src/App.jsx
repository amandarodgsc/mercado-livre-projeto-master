import React from 'react';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Provider from './context/Provider';
import Cart from './components/Cart/Cart';
import SiteShoppingInfo from './components/SiteShoppingInfo/SiteShoppingInfo';
import Banner from './components/Banner/Banner';
import VideoBanner from './components/Banner/VideoBanner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pagamento from './components/Pagamento/pagamento';


function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Provider>
              <Header />
              <Banner />
              <Products />
              <Cart />
              <VideoBanner />
              <SiteShoppingInfo />
            </Provider>
          }
        />
        <Route path="/pagamento" element={<Pagamento />} />
      </Routes>
    </Router>
  );
}

export default App;
