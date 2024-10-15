// src/components/Vendedor/Vendedor.js
import React, { useEffect, useState, useContext } from 'react';
import './Vendedor.css';
import { FaShoppingCart } from 'react-icons/fa'; 
import AppContext from '../../context/AppContext'; 
import { useNavigate } from 'react-router-dom';

function Vendedor() {
  const [productData, setProductData] = useState([]);
  const { cartItems, addToCart, removeFromCart, isCartVisible, setIsCartVisible } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (storedProducts.length > 0) {
      setProductData(storedProducts);
    }
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = () => {
    const totalPrice = calculateTotalPrice();
    navigate('/pagamento', { state: { totalPrice } });
  };

  if (productData.length === 0) {
    return <p>Não há produtos cadastrados.</p>;
  }

  return (
    <div className="products">
      {productData.map((product) => (
        <div key={product.id} className="product-card">
          {product.image && (
            <img src={product.image} alt={product.name} className="card__image" />
          )}
          <div className="card__infos">
            <h2 className="card__title">{product.name}</h2>
            <p className="card__price">R$ {product.price.toFixed(2)}</p>
            <p>Quantidade: {product.quantity}</p>
            <p>Categoria: {product.category}</p>
            <p>{product.description}</p>
          </div>
          <button className="button__add-cart" onClick={() => handleAddToCart(product)}>
            Adicionar ao carrinho
          </button>
        </div>
      ))}

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
                    <p>R$ {item.price.toFixed(2)}</p>
                    <p>Quantidade: {item.quantity}</p>
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
          {cartItems.length > 0 && (
            <div className="cart-total">
              <p>Total: R$ {calculateTotalPrice().toFixed(2)}</p>
              <button onClick={handlePayment} className="button__pay">
                Ir para Pagamento
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Vendedor;
