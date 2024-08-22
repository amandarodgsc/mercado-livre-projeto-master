import React, { useEffect, useState } from 'react';
import './pagamento.css';
import formatCurrency from '../../utils/formatCurrency';

// Importe as imagens
import mercadocreditoImg from './mercadocredito.png';
import cartaodecreditoImg from './cartaodecredito.png';
import cartaodedebitoImg from './cartaodedebito.png';
import pixImg from './pix.png';
import boletoImg from './boleto.png';

const Pagamento = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [pixCode, setPixCode] = useState('');

  useEffect(() => {
    const storedPrice = localStorage.getItem('totalPrice');
    const storedItems = localStorage.getItem('cartItems');

    if (storedPrice) {
      setTotalPrice(Number(storedPrice));
      localStorage.removeItem('totalPrice');
    }

    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
      localStorage.removeItem('cartItems');
    }
  }, []);

  useEffect(() => {
    if (selectedPaymentMethod === 'pix') {
      setPixCode('PIX-' + Math.random().toString(36).substr(2, 10).toUpperCase());
    }
  }, [selectedPaymentMethod]);

  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <h1>Resumo do Pedido</h1>
      </header>

      <div className="checkout-content">
        <section className="order-summary">
          <h2>Itens do Pedido</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="order-item-details">
                  <p className="order-item-name">{item.title}</p>
                  <p className="order-item-quantity">Quantidade: 1</p>
                  <p className="order-item-price">{formatCurrency(item.price, 'BRL')}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items">Nenhum item encontrado</p>
          )}
          <div className="order-summary-total">
            <p>Total:</p>
            <p className="order-total-price">{formatCurrency(totalPrice, 'BRL')}</p>
          </div>
        </section>

        <section className="payment-methods">
          <h2>Meios de Pagamento</h2>
          <div className="payment-method-list">
            <div
              className={`payment-method ${selectedPaymentMethod === 'mercadocredito' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodClick('mercadocredito')}
            >
              <img src={mercadocreditoImg} alt="Mercado Crédito" />
              <p>Mercado Crédito</p>
              <button className="select-button">✓</button>
            </div>
            <div
              className={`payment-method ${selectedPaymentMethod === 'cartaodecredito' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodClick('cartaodecredito')}
            >
              <img src={cartaodecreditoImg} alt="Cartões de Crédito" />
              <p>Cartões de Crédito</p>
              <button className="select-button">✓</button>
            </div>
            <div
              className={`payment-method ${selectedPaymentMethod === 'cartaodedebito' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodClick('cartaodedebito')}
            >
              <img src={cartaodedebitoImg} alt="Cartões de Débito" />
              <p>Cartões de Débito</p>
              <button className="select-button">✓</button>
            </div>
            <div
              className={`payment-method ${selectedPaymentMethod === 'pix' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodClick('pix')}
            >
              <img src={pixImg} alt="Pix" />
              <p>Pix</p>
              <button className="select-button">✓</button>
            </div>
            <div
              className={`payment-method ${selectedPaymentMethod === 'boleto' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodClick('boleto')}
            >
              <img src={boletoImg} alt="Boleto" />
              <p>Boleto</p>
              <button className="select-button">✓</button>
            </div>
          </div>
        </section>

        {/* Formulário de Cartão de Crédito */}
        {selectedPaymentMethod === 'cartaodecredito' && (
          <div className="payment-info show">
            <h3>Informações do Cartão de Crédito</h3>
            <form>
              <div className="form-group">
                <label>Número do Cartão:</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-group">
                <label>Validade:</label>
                <input type="text" placeholder="MM/AA" />
              </div>
              <div className="form-group">
                <label>Código de Segurança:</label>
                <input type="text" placeholder="123" />
              </div>
              <div className="form-group">
                <label>Nome no Cartão:</label>
                <input type="text" placeholder="João da Silva" />
              </div>
            </form>
          </div>
        )}

        {/* Formulário de Cartão de Débito */}
        {selectedPaymentMethod === 'cartaodedebito' && (
          <div className="debit-card-info show">
            <h3>Informações do Cartão de Débito</h3>
            <form>
              <div className="form-group">
                <label>Número do Cartão:</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-group">
                <label>Validade:</label>
                <input type="text" placeholder="MM/AA" />
              </div>
              <div className="form-group">
                <label>Código de Segurança:</label>
                <input type="text" placeholder="123" />
              </div>
              <div className="form-group">
                <label>Nome no Cartão:</label>
                <input type="text" placeholder="João da Silva" />
              </div>
            </form>
          </div>
        )}

        {/* Código Pix */}
        {selectedPaymentMethod === 'pix' && (
          <div className="pix-code show">
            <h3>Código Pix</h3>
            <p>Use o código abaixo para realizar o pagamento via Pix:</p>
            <p><strong>{pixCode}</strong></p>
          </div>
        )}

        {/* Formulário de Boleto */}
        {selectedPaymentMethod === 'boleto' && (
          <div className="boleto-info show">
            <h3>Informações do Boleto</h3>
            <p>Use o código abaixo para realizar o pagamento via Boleto:</p>
            <p><strong>{`BOLETO-${Math.random().toString(36).substr(2, 10).toUpperCase()}`}</strong></p>
          </div>
        )}
      </div>

      <footer className="checkout-footer">
        <button className="checkout-button">Finalizar Pagamento</button>
      </footer>
    </div>
  );
};

export default Pagamento;
