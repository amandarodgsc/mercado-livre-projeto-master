import React from 'react';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Provider from './context/Provider';
import Cart from './components/Cart/Cart';
import SiteShoppingInfo from './components/SiteShoppingInfo/SiteShoppingInfo';
import Banner from './components/Banner/Banner';

function App() {

  return (
    <Provider>
      <Header />
      <Banner />
      <Products />
      <Cart />
      <SiteShoppingInfo/>
    </Provider>
  );
}

export default App;