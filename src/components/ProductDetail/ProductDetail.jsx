import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importando useNavigate
import fetchProductDetails from '../../api/fetchProductDetails'; // Função para buscar detalhes do produto
import Loading from '../Loading/Loading';
import './ProductDetail.css';
import formatCurrency from '../../utils/formatCurrency';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Inicializando useNavigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProductDetails(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="product-detail">
      <button 
        className="back-button" 
        onClick={() => navigate(-1)} // Navega de volta para a página anterior
      >
        Voltar
      </button>
      <div className="detail-container">
        <div className="image-section">
          <img src={product.thumbnail} alt={product.title} className="product-image" />
        </div>
        <div className="info-section">
          <h2 className="product-title">{product.title}</h2>
          <h2 className="product-price">{formatCurrency(product.price, 'BRL')}</h2>
          <h3>Cor: {product.color}</h3>
          <h3>Tamanho: {product.sizes}</h3>
          <div className="product-description">
            <h3>Descrição</h3>
            <p>{product.description}</p>
          </div>
          <button type="button" className="add-to-cart-button">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
