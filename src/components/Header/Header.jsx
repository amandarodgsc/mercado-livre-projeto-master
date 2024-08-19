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
          alt="Mercado Livre Logo"
          className="logo"
        />
        <SearchBar />
        <CartButton />
      </div>
    </header>
  );
}

export default Header;
