import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProdutosDetalhes.css';

function ProdutoDetalhes({ product }) {
  const navigate = useNavigate();

  // Verifica se o produto está definido antes de tentar acessar suas propriedades
  if (!product) {
    return <p>Produto não encontrado</p>; // Exibe uma mensagem de erro se o produto não estiver disponível
  }

  const handleAvaliarProduto = () => {
    navigate(`/feedback/${product.id}`); // Navega para a página de feedback do produto
  };

  return (
    <div className="produto-detalhes">
      <div className="produto-imagem">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <p>Imagem não disponível</p> // Exibe uma mensagem caso a imagem esteja ausente
        )}
      </div>
      <div className="produto-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="produto-preco">Preço: {product.price}</p>
        <p className="produto-categoria">Categoria: {product.category}</p>
        <button onClick={handleAvaliarProduto} className="botao-avaliar">
          Avaliar Produto
        </button>
      </div>
    </div>
  );
}

export default ProdutoDetalhes;
