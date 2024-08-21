import React from 'react';
import './NavHeader.css';

const NavHeader = () => {
  return (
    <div className="nav-header">
      <div className="nav-section">
        <a className="nav-link" href='./PaginaCep' aria-expanded="false" aria-haspopup="true">
       


          <span className="nav-text">Informe seu </span>
          <br/>
          <span className="nav-arrow">CEP</span>
        </a>
      </div>
      <div className="nav-section nav-categories">
        <a className="nav-link" href="#categories">Categorias</a>
        <a className="nav-link" href="#offers">Ofertas</a>
        <a className="nav-link" href="#history">Histórico</a>
        <a className="nav-link" href="#supermarket">Supermercado</a>
        <a className="nav-link" href="#fashion">Moda</a>
        <a className="nav-link" href="#sell">Vender</a>
      </div>
    </div>
  );
};

export default NavHeader;
