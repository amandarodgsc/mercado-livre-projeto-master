import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProdutosDetalhes.css';

function ProdutoDetalhes() {
    const { id } = useParams(); // Pegando o ID do produto da URL
    const navigate = useNavigate();

    // Carregar os detalhes do produto
    const product = JSON.parse(localStorage.getItem('products')).find(item => item.id === id);

    return (
        <div>
        <header role="banner" data-siteid="MLB" className="nav-header nav-header-lite" style={{margin:'0px'}}>
          <div className="nav-bounds">
            <a className="nav-logo" href="//www.mercadolivre.com.br">
              <img src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus@2x.png" alt="Logo Mercado Livre" className="logo-image" />
            </a>
          </div>
        </header>

        <div className="product-details-container">
            {product ? (
                <>
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <p><strong>Descrição:</strong> {product.description}</p>
                    <p><strong>Preço:</strong> R$ {parseFloat(product.price).toFixed(2)}</p>
                    <p><strong>Categoria:</strong> {product.category}</p>

                    {/* Botão para avaliar o produto */}
                    <button 
                        onClick={() => navigate(`/produtos/${product.id}/feedback`)} 
                        className="btn-avaliar"
                    >
                        Avaliar Produto
                    </button>
                </>
            ) : (
                <p>Produto não encontrado.</p>
            )}
        </div>
        {/* Adicionando o footer */}
<footer className="produtos-footer">
  <p className="produtos-footer-copyright">Copyright © 2024 Ebazar.com.br LTDA.</p>
  <div className="produtos-footer-links">
    <a href="#termos" className="produtos-footer-link">Termos e condições</a>
    <a href="#privacidade" className="produtos-footer-link">Como cuidamos da sua privacidade</a>
  </div>
</footer>

        </div>

    );
}

export default ProdutoDetalhes;
