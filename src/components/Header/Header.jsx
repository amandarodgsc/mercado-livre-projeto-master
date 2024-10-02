// Header.js
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header() {
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
            <a href="https://www.mercadolivre.com/jms/mlb/lgz/login?platform_id=ml&go=https%3A%2F%2Fvendedores.mercadolivre.com.br%" className="andes-button user-search-container-login-not-button">
              <span>Iniciar sessão</span>
            </a>
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
          <button type="button" className="andes-button cta-button outline andes-button--large andes-button--loud">
  <span className="andes-button__content">
    <span className="andes-button__text">Iniciar sessão</span>
    
  </span>
</button>

        </div>
        <div className="cards-container">
          <div className="card">
            <div className="icon-container">
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                <path d="M15.572 13.223H5.653A1.65 1.65 0 0 0 4 14.871c0 .91.74 1.649 1.653 1.649h9.919" stroke="#3483FA" stroke-width="1.725" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M15.572 13.223V2.509H6.48A2.476 2.476 0 0 0 4 4.98v9.89m10.744-1.647v3.297" stroke="#3483FA" stroke-width="1.725" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
            <h1>Acesse conteúdos organizados em guias</h1>
          </div>

          <div className="card">
            <div className="icon-container">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1288_36359)">
                  <path d="M20.1423 7.80054H28.3709V16.0291" stroke="#3483FA" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M28.3696 7.80054L16.7467 19.4234C16.5544 19.6119 16.2959 19.7174 16.0267 19.7174C15.7575 19.7174 15.499 19.6119 15.3067 19.4234L10.5753 14.692C10.383 14.5035 10.1245 14.3979 9.85528 14.3979C9.58605 14.3979 9.32755 14.5035 9.13528 14.692L1.62671 22.2005" stroke="#3483FA" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
                <defs>
                  <clipPath id="clip0_1288_36359">
                    <rect width="28.8" height="28.8" fill="white" transform="translate(0.600098 0.599976)"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h1>Confira as soluções oferecidas pelo Mercado Livre</h1>
          </div>

          <div className="card">
            <div className="icon-container">
              <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="20" fill="#3483FA"></rect>
                <g>
                  <path d="M21.7 30a1.435 1.435 0 0 1-1.064-.427 1.417 1.417 0 0 1-.394-.746l-.809-4.017-4.257-4.262-4.013-.81a1.469 1.469 0 0 1-1.139-1.704c.064-.282.204-.54.405-.746l3.672-3.676h6.812l1.011-.97A8.185 8.185 0 0 1 27.789 10c.316-.001.633.02.947.064a1.447 1.447 0 0 1 1.213 1.214 7.989 7.989 0 0 1-2.576 6.82l-.947.948v6.819l-3.672 3.676a1.415 1.415 0 0 1-1.053.458Zm-.925-5.328.702 3.505a.352.352 0 0 0 .351.288h.107l.138-.107 3.033-3.026v-4.986l-4.332 4.326Zm6.94-13.394a7.447 7.447 0 0 0-4.918 2.27L16.41 19.94l3.629 3.623 6.386-6.393a7.032 7.032 0 0 0 2.225-5.626v-.203h-.192a5.486 5.486 0 0 0-.745-.032v-.032Zm-16.19 6.745v.234a.341.341 0 0 0 .266.256l3.502.703 4.332-4.336h-4.981l-3.119 3.143Zm6.27 7.299-.959-.97a6.15 6.15 0 0 1-1.468 2.184 8.299 8.299 0 0 1-3.534 1.62 8.432 8.432 0 0 1 1.628-3.527 6.142 6.142 0 0 1 2.182-1.47l-.968-.97c-.79.39-1.51.909-2.13 1.534a10.395 10.395 0 0 0-2.128 4.752.874.874 0 0 0 .245.82.883.883 0 0 0 .809.246 10.393 10.393 0 0 0 4.768-2.131 7.627 7.627 0 0 0 1.554-2.056v-.005Z" fill="#fff"></path>
                </g>
              </svg>
            </div>
            <h1>Encontre vídeos, manuais e cursos para a sua loja</h1>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
