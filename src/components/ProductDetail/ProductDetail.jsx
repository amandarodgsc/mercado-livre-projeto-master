import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fetchProductDetails from '../../api/fetchProductDetails';
import Loading from '../Loading/Loading';
import './ProductDetail.css';
import formatCurrency from '../../utils/formatCurrency';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchProductDetails(id);
        setProduct(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      } finally {
        setLoading(false);
      }
    };
    getProductDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="product-detail">
      <button className="back-button" onClick={() => navigate(-1)}>Voltar</button>
      <div className="detail-container">
        <div className="image-section">
          <img src={product.thumbnail} alt={product.title} className="product-image" />
          <div className="image-gallery">
            {Array.isArray(product.images) && product.images.map((img, index) => (
              <img key={index} src={img} alt={`imagem-${index}`} className="gallery-image" />
            ))}
          </div>
        </div>
        <div className="info-section">
          <h2 className="product-title">{product.title}</h2>
          <h2 className="product-price">{formatCurrency(product.price, 'BRL')}</h2>
          <p>Cor: <span>{product.color || 'Não disponível'}</span></p>
          <p>Tamanho: <span>{Array.isArray(product.sizes) ? product.sizes.join(', ') : 'Não disponível'}</span></p>
          <div className="product-description">
            <h3>Descrição</h3>
            <p>{product.description || 'Descrição não disponível.'}</p>
          </div>
          <button type="button" className="add-to-cart-button">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;