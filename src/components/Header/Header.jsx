// Header.js
import React from 'react';
import CartButton from '../CartButton/CartButton';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <img
          src="https://play-lh.googleusercontent.com/qAmR2IkN3bUCRdraBkQkyWfR4qRT9z6QBWPd5tOJ6PoRBY0oUcbbW5-4Fpeq0r_-G5o"
          alt="disney"
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
    </header>
  );
}

export default Header;
