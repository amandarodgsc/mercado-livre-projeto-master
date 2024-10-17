import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SiteShoppingInfo from './components/SiteShoppingInfo/SiteShoppingInfo';
import Pagamento from './components/Pagamento/pagamento';
import CadastroVendedor from './components/CadastroVendedor/Cadastrovendedor';
import CadastrarProduto from './components/CadastrarProduto/CadastrarProduto'; 
import Vendedor from './components/Vendedor/Vendedor';
import ProdutosCadastrados from './components/ProdutosCadastrados/ProdutosCadastrados';
import CadastrarCep from './components/CadastrarCep/Cadastrarcep';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mercado-livre-projeto-master" element={
          <>
            <Header />
            <SiteShoppingInfo />
          </>
        } />
        <Route path="/cadastrovendedor" element={<CadastroVendedor />} />
        <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
        <Route path="/produtos-cadastrados" element={<ProdutosCadastrados />} />
        <Route path="/cadastrar-cep" element={<CadastrarCep />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/vendedor" element={<Vendedor />} />
      </Routes>
    </Router>
  );
}

export default App;
