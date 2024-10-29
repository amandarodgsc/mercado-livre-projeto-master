// src/components/ProdutoDetalhes/ProdutoDetalhes.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProdutosDetalhes.css';

function ProdutoDetalhes() {
  const { id } = useParams(); // Acessa o ID do produto da URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find(product => product.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div>Produto não encontrado.</div>; // Mensagem caso o produto não seja encontrado
  }

  return (
    <div className="produto-detalhes">
      <div className="produto-imagem">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="produto-info">
        <h1>{product.name}</h1>
        <p className="produto-preco">R$ {product.price.toFixed(2)}</p>
        <p className="produto-desconto">36% OFF</p>
        <p className="produto-categoria">Categoria: {product.category}</p>
        <p className="produto-descricao">{product.description}</p>
        <button className="comprar-agora">Comprar agora</button>
        <button className="adicionar-carrinho">Adicionar ao carrinho</button>
      </div>
    </div>
  );
}

export default ProdutoDetalhes;
