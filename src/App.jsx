import React from 'react';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import SiteShoppingInfo from './components/SiteShoppingInfo/SiteShoppingInfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pagamento from './components/Pagamento/pagamento'

function App() {
  return (
    <Router>
         <Header />
        
   <Routes>
             <Route path="/pagamento" element={<Pagamento />} />
           </Routes>
          
         <SiteShoppingInfo/>
      </Router>
      
  )
}

export default App;
