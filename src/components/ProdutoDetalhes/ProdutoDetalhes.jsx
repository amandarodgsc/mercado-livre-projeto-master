// src/components/ProdutoDetalhes/ProdutoDetalhes.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>Preço: R$ {product.price.toFixed(2)}</p>
      <p>Quantidade: {product.quantity}</p>
      <p>Categoria: {product.category}</p>
      <p>Descrição: {product.description}</p>
    </div>
  );
}

export default ProdutoDetalhes;
