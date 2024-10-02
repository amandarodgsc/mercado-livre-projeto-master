import React, { useContext, useState } from 'react';
import './Cart.css';
import CartItem from '../CartItem/CartItem';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, isCartVisible, setIsCartVisible } = useContext(AppContext);
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);
  const totalQuantity = cartItems.length;

  const handleApplyCoupon = () => {
    console.log(`Cupom aplicado: ${coupon}`);
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  const handleCheckout = () => {
    navigate('/pagamento', { state: { totalPrice } });
  };

  return (
    <div className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-header">
        <button onClick={handleCloseCart} className="close-cart-button">
          &#x2190; {/* Código HTML para uma seta para a esquerda */}
        </button>
        <h2 className="cart-title">Carrinho de compra</h2>
      </div>

      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => <CartItem key={cartItem.id} data={cartItem} />)
        ) : (
          <p className="cart-empty">Seu carrinho está vazio</p>
        )}
      </div>

      <div className="cart-summary">
        <p className="total-quantity"> Produtos: {totalQuantity}</p>
        <div className="coupon-container">
          <input 
            type="text" 
            value={coupon} 
            onChange={(e) => setCoupon(e.target.value)} 
            placeholder="Insira o cupom"
            className="coupon-input"
          />
          <button onClick={handleApplyCoupon} className="apply-coupon-button">Aplicar Cupom</button>
        </div>
        <div className="cart-resume">
          <span className="total-label">Total:</span> {formatCurrency(totalPrice, 'BRL')}
        </div>
      </div>

      <button className="finalize-button" onClick={handleCheckout}>Continuar a Compra</button>
    </div>
  );
}

export default Cart;
