// Header.js
import React from 'react';
import CartButton from '../CartButton/CartButton';
import SearchBar from '../SearchBar/SearchBar';
import NavHeader from '../Header/NavHeader'; 
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <img
          src="https://mercadolivre.randstad.com.br/vagas_mercado_livre/img/vagas_mercado_livre.logomercadolivre.png?CYGPvbR__Oy3DfKdCHW7Bw"
          alt="mercadolivre"
          className="logo"
        />
        <SearchBar />
        <CartButton />
        <div className="nav-area">
          <img
            src="https://http2.mlstatic.com/D_NQ_904735-MLA77640197882_072024-OO.webp"
            alt="meli"
            className="nav-image"
          />
        </div>
      </div>
      <NavHeader/>
    </header>
  );
}

export default Header;
