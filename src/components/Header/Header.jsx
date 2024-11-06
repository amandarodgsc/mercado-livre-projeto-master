import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar o hook do react-router-dom
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header() {
  const navigate = useNavigate(); // Instanciar o hook de navegação

  // Função para redirecionar para a página de login
  const handleLoginClick = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <>
      <header className="header-new">
        <div className="header-container-new">
          <a href="https://vendedores.mercadolivre.com.br/" className="nav-logo" tabIndex="0">
            <div className="nav-logo-title">
              <img
                src="https://w7.pngwing.com/pngs/396/132/png-transparent-free-market-e-marketplace-brazil-market-economy-others-miscellaneous-text-service-thumbnail.png"
                alt="mercadolivre"
                className="logo"
              />
              <span>Central de vendedores</span>
            </div>
          </a>
          <SearchBar />
          <div className="user-search-container-login-not">
            <button
              onClick={handleLoginClick} // Acionar a função de redirecionamento no clique
              className="andes-button user-search-container-login-not-button"
            >
              <span>Iniciar sessão</span>
            </button>
          </div>
        </div>
      </header>

      {/* Seção Central de Vendedores */}
      <section className="vendedores-section">
        <div className="central-vendedores-container">
          <h1 className="title">Central de vendedores</h1>
          <p className="subtitle">
            Encontre todas as informações necessárias para crescer como vendedor e se profissionalizar.
          </p>
          <button
            type="button"
            className="andes-button cta-button outline andes-button--large andes-button--loud"
            onClick={handleLoginClick} // Redireciona também ao clicar nesse botão
          >
            <span className="andes-button__content">
              <span className="andes-button__text">Iniciar sessão</span>
            </span>
          </button>
        </div>
        <div className="cards-container">
          {/* Os cartões podem continuar da mesma forma */}
        </div>
      </section>
    </>
  );
}

export default Header;
