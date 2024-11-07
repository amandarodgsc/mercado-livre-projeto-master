import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProdutosDetalhes.css';

function ProdutoDetalhes() {
    const { id } = useParams(); // Pegando o ID do produto da URL
    const navigate = useNavigate();

    // Carregar os detalhes do produto
    const product = JSON.parse(localStorage.getItem('products')).find(item => item.id === id);

    return (
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
    );
}

export default ProdutoDetalhes;
