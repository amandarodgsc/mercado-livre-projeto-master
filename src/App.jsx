import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import SiteShoppingInfo from './components/SiteShoppingInfo/SiteShoppingInfo';
import Pagamento from './components/Pagamento/pagamento';
import CadastroVendedor from './components/CadastroVendedor/Cadastrovendedor';
import CadastrarProduto from './components/CadastrarProduto/CadastrarProduto'; // Importação do novo componente

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal com o Header */}
        <Route path="/" element={
          <>
            <Header />
            <SiteShoppingInfo />
          </>
        } />

        {/* Página de cadastro de vendedor */}
        <Route path="/cadastrovendedor" element={<CadastroVendedor />} />

        {/* Página de cadastro de produtos */}
        <Route path="/cadastrar-produto" element={<CadastrarProduto />} />

        {/* Outras páginas como pagamento, produtos, etc. */}
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/carrinho" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
