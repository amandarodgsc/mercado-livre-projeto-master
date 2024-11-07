import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProdutoDetalhes() {
  const { id } = useParams();  // Captura o ID da URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID do produto:", id); // Verifica o ID

    // Carregar produtos do localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find(product => product.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/produtos-cadastrados'); // Se não encontrar, redireciona para a lista de produtos
    }
  }, [id, navigate]);

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Preço: R$ {product.price}</p>
      <p>Categoria: {product.category}</p>
      <img src={product.image} alt={product.name} />
      <button onClick={() => navigate('/produtos-cadastrados')}>Voltar</button>
    </div>
  );
}

export default ProdutoDetalhes;
