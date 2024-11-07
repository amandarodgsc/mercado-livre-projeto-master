import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProdutoDetalhes() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find(p => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <p>Produto não encontrado</p>;
  }

  return (
    <div className="produto-detalhes">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Categoria: {product.category}</p>
      <p>Preço: R$ {product.price}</p>
      <p>Quantidade disponível: {product.quantity}</p>
    </div>
  );
}

export default ProdutoDetalhes;
