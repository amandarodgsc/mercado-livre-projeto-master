// NavHeader.js
import React from 'react';
import './NavHeader.css';

const NavHeader = () => {
  return (
    <div className="divloc">
      <a
        className="linkloc"
        data-js="cp"
        href=""
        data-modal-action="true"
        role="button"
      >
        <span className="letraloc">Digite seu endereço</span>
      </a>
      <div className="nav-menu-item">
        <a
          className="nav-menu-cp nav-menu-cp-guest"
          data-js="cp"
          href="https://www.mercadolivre.com.br/navigation/addresses-hub?go=https%3A%2F%2Fwww.mercadolivre.com.br%2F%3Fmsockid%3D1af7317858a963a60cf225a159c2629f"
          data-modal-action="true"
          role="button"
          aria-expanded="false"
          aria-haspopup="true"
        >
        </a>
      </div>
    </div>
  );
};

export default NavHeader;
