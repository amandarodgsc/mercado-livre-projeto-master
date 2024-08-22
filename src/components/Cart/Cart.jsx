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

  // Função para fechar o carrinho
  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  const handleCheckout = () => {
    localStorage.setItem('totalPrice', totalPrice); // Armazenar o preço total
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Armazenar itens do carrinho
    const pagamentoUrl = `${window.location.origin}/pagamento`; // URL completa para a página de pagamento
    window.open(pagamentoUrl, '_blank'); // Abre a URL em uma nova guia
    setIsCartVisible(false); // Fecha o carrinho
  };

  return (
    <div className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-header">
        <button onClick={handleCloseCart} className="close-cart-button">
          &#x2190;
        </button>
        <h2 className="cart-title">Carrinho de compras</h2>
      </div>

      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} data={cartItem} />
          ))
        ) : (
          <p className="cart-empty">Seu carrinho está vazio</p>
        )}
      </div>

      <div className="cart-summary">
        <p className="total-quantity">Produtos: {totalQuantity}</p>
        <div className="coupon-container">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Insira o cupom"
            className="coupon-input"
          />
          <button onClick={handleApplyCoupon} className="apply-coupon-button">
            Aplicar Cupom
          </button>
        </div>
        <div className="cart-resume">
          <span className="total-label">Total:</span> {formatCurrency(totalPrice, 'BRL')}
        </div>
      </div>

      <button onClick={handleCheckout} className="finalize-button">
        Continuar a Compra
      </button>
    </div>
  );
}

export default Cart;
