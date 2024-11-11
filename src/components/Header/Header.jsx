import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header() {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <>
      <header className="header-new" style={{ margin: '0px' }}>
        <div className="header-container-new">
          <a href="http://localhost:3000/mercado-livre-projeto-master" className="nav-logo" tabIndex="0">
            <div className="nav-logo-title">
              <img
                src="https://w7.pngwing.com/pngs/396/132/png-transparent-free-market-e-marketplace-brazil-market-economy-others-miscellaneous-text-service-thumbnail.png"
                alt="mercadolivre"
                className="logo"
                style={{marginRight:'20px'}}
              />
              <span style={{textTransform:'none'}}>Central de vendedores</span>
            </div>
          </a>
          <SearchBar />
          <div className="user-search-container-login-not">
            <button
              onClick={handleLoginClick}
              className="andes-button user-search-container-login-not-button"
            >
              <span>Iniciar sessão</span>
            </button>
          </div>
        </div>
      </header>

      <section className="vendedores-section">
        <div className="central-vendedores-container">
          <h1 className="title">Central de vendedores</h1>
          <p className="subtitle">
            Encontre todas as informações necessárias para crescer como vendedor e se profissionalizar.
          </p>
          <button id='buttonfirst'
            type="button"
            className="andes-button cta-button outline andes-button--large andes-button--loud"
            onClick={handleLoginClick}
           style={{width:'160px'}}>
            <span className="andes-button__content">
              <span className="andes-button__text" style={{fontSize:'15px'}}>Iniciar sessão</span>
            </span>
          </button>
        </div>
        <div className="cards-container">
        </div>
      </section>
    </>
  );
}

export default Header;
