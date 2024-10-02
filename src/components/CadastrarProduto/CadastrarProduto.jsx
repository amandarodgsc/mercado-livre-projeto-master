import React from 'react';
import './CadastrarProduto.css'; // Importar o CSS

function CadastrarProduto() {
  return (
    <div>
      <header role="banner" data-siteid="MLB" className="nav-header nav-header-lite">
        <div className="nav-bounds">
          <a className="nav-logo" href="//www.mercadolivre.com.br">Mercado Livre</a>
          <div className="nav-header-menu-wrapper">
            <nav id="nav-header-menu" className="nav-header-menu">
              <a
                href="https://www.mercadolivre.com.br/ajuda"
                className="option-help"
                rel="nofollow"
                aria-labelledby="help-text"
              >
                <i className="nav-icon-help">
                  <span id="help-text">Contato</span>
                </i>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Conteúdo do Cadastro */}
      <div className="cadastro-container">
        <h1>Cadastro de Produto</h1>
        <form className="cadastro-form">
          <div className="form-group">
            <label htmlFor="product-name">Nome do Produto:</label>
            <input type="text" id="product-name" required placeholder="Digite o nome do produto" />
          </div>

          <div className="form-group">
            <label htmlFor="product-price">Preço:</label>
            <input type="number" id="product-price" required placeholder="Digite o preço do produto" />
          </div>

          <div className="form-group">
            <label htmlFor="product-quantity">Quantidade:</label>
            <input type="number" id="product-quantity" required placeholder="Digite a quantidade do produto" />
          </div>

          <div className="form-group">
            <label htmlFor="product-category">Categoria:</label>
            <select id="product-category" required>
              <option value="">Selecione uma categoria</option>
              <option value="eletrônicos">Eletrônicos</option>
              <option value="roupas">Roupas</option>
              <option value="brinquedos">Brinquedos</option>
              <option value="casa">Casa</option>
              <option value="esportes">Esportes</option>
              {/* Adicione mais categorias conforme necessário */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="product-description">Descrição:</label>
            <textarea id="product-description" required placeholder="Digite a descrição do produto"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="product-image">Imagem do Produto:</label>
            <input type="file" id="product-image" accept="image/*" required />
          </div>

          <button type="submit" className="cadastro-button">Cadastrar Produto</button>
        </form>
      </div>
    </div>
  );
}

export default CadastrarProduto;
