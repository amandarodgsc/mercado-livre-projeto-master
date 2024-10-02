// src/components/Vendedor/Vendedor.js
import React, { useEffect, useState, useContext } from 'react';
import './Vendedor.css';
import { FaShoppingCart } from 'react-icons/fa'; 
import AppContext from '../../context/AppContext'; 
import { useNavigate } from 'react-router-dom';

function Vendedor() {
  const [productData, setProductData] = useState(null);
  const { cartItems, addToCart, removeFromCart, isCartVisible, setIsCartVisible } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProductData = localStorage.getItem('productData');
    if (storedProductData) {
      setProductData(JSON.parse(storedProductData));
    }
  }, []);

  const handleAddToCart = () => {
    if (productData) {
      addToCart(productData);
    }
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  if (!productData) {
    return <p>Não há produto cadastrado.</p>;
  }

  return (
    <div className="products">
      <div className="product-card">
        {productData.image && (
          <img src={productData.image} alt="Produto" className="card__image" />
        )}
        <div className="card__infos">
          <h2 className="card__title">{productData.name}</h2>
          <p className="card__price">R$ {productData.price}</p>
          <p>Quantidade: {productData.quantity}</p>
          <p>Categoria: {productData.category}</p>
          <p>{productData.description}</p>
        </div>
        <button className="button__add-cart" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </button>
      </div>

      <div className="cart-icon" onClick={toggleCartVisibility}>
        <FaShoppingCart size={30} />
        {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
      </div>

      {isCartVisible && (
        <div className="cart-modal">
          <div className="cart-header">
            <h2>Carrinho de compras</h2>
            <button onClick={toggleCartVisibility} className="close-cart-button">X</button>
          </div>
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div>
                    <p>{item.name}</p>
                    <p>R$ {item.price}</p>
                    <p>Quantidade: {item.quantity}</p>
                    {/* Botão para remover o item do carrinho */}
                    <button onClick={() => handleRemoveFromCart(item.id)} className="remove-item-button">
                      Remover
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>O carrinho está vazio</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Vendedor;
