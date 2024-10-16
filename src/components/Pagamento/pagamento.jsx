import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './pagamento.css';

function Pagamento() {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Função para gerar uma chave Pix aleatória
  const generatePixKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };
  // Função para renderizar o formulário de acordo com o método de pagamento selecionado
  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'cartao':
        return (
          <div className="payment-form">
            <h3>Pagamento com Cartão de Crédito</h3>
            <form>
              <label>Número do Cartão</label>
              <input type="text" placeholder="0000 0000 0000 0000" maxLength={16} />
              <label>Nome no Cartão</label>
              <input type="text" placeholder="Nome completo" />
              <label>Data de Expiração</label>
              <input type="text" placeholder="MM/AA" maxLength={5} />
              <label>CVV</label>
              <input type="text" placeholder="000" maxLength={3} />
              <button type="submit">Confirmar Pagamento</button>
            </form>
          </div>
        );
      case 'boleto':
        return (
          <div className="payment-form">
            <h3>Pagamento com Boleto</h3>
            <p>O boleto será gerado após a confirmação do pedido.</p>
          </div>
        );
      case 'pix':
        const pixKey = generatePixKey();
        return (
          <div className="payment-form">
            <h3>Pagamento com Pix</h3>
            <p>Chave Pix: {pixKey}</p>
            <img
              src="https://pixabay.com/pt/vectors/c%C3%B3digo-qr-c%C3%B3digo-de-resposta-r%C3%A1pida-148732/"
              alt="QR Code Pix"
              className="qrcode"
            />
            <p>Escaneie o QR code para efetuar o pagamento.</p>
          </div>
        );
      default:
        return <p>Selecione um método de pagamento.</p>;
    }
  };

  return (
    <div className="pagamento-container">
      <h1>Página de Pagamento</h1>
      <p>Total a Pagar: R$ {totalPrice.toFixed(2)}</p>

      <div className="payment-options">
        <h3>Escolha a forma de pagamento:</h3>
        <button onClick={() => setSelectedPaymentMethod('cartao')}>Cartão de Crédito</button>
        <button onClick={() => setSelectedPaymentMethod('boleto')}>Boleto</button>
        <button onClick={() => setSelectedPaymentMethod('pix')}>Pix</button>
      </div>

      <div className="payment-details">
        {renderPaymentForm()} {/* Renderiza o formulário conforme o método selecionado */}
      </div>
    </div>
  );
}

export default Pagamento;
