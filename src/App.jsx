import React from 'react';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Provider from './context/Provider';
import Cart from './components/Cart/Cart';
import SiteShoppingInfo from './components/SiteShoppingInfo/SiteShoppingInfo';
import Banner from './components/Banner/Banner';
import VideoBanner from './components/Banner/VideoBanner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pagamento from './components/Pagamento/pagamento'

function App() {

  return (
    <Provider>
    <Router>
         <Header />
         <Banner />
   <Routes>
             <Route path="/pagamento" element={<Pagamento />} />
           </Routes>
      <Products />
         <Cart />
         <VideoBanner/>
         <SiteShoppingInfo/>
      </Router>
       </Provider>
  )
}

export default App;