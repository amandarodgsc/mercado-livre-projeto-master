import React from 'react';
import './pagamento.css';

function Pagamento() {
  return (
    <div className="payment-page">
      <header className="yellow-header"></header>
      <div className="payment-container">
        <div className="payment-methods">
          <h2>Escolha como pagar</h2>
          <div className="combine-methods">
          
          </div>
          <div className="payment-option recommended">
            <input type="radio" name="payment-method" id="mercado-pago" />
            <label htmlFor="mercado-pago">
              <div className="payment-logo">VISA</div>
              <span>Cartão Mercado Pago</span>
              <small>Até 3x sem juros</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="mercado-credito" />
            <label htmlFor="mercado-credito">
              <div className="payment-logo">MC</div>
              <span>Mercado Crédito</span>
              <small>Limite disponível: R$ 240</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="banco-original" />
            <label htmlFor="banco-original">
              <div className="payment-logo">CC</div>
              <span>Cartão de Credito</span>
              <small>Até 3x sem juros</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="banco-original" />
            <label htmlFor="banco-original">
              <div className="payment-logo">CB</div>
              <span>Cartão de Debito</span>
              <small>Até 3x sem juros</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="mastercard" />
            <label htmlFor="mastercard">
              <div className="payment-logo">IIIIIII</div>
              <span>Boleto</span>
              <small>Até 3x sem juros</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="mastercard" />
            <label htmlFor="mastercard">
              <div className="payment-logo">pix</div>
              <span>Pix</span>
              <small>À vista</small>
            </label>
          </div>
        </div>
        <div className="purchase-summary">
          <h2>Resumo da compra</h2>
          <div className="purchase-item">
            <span>Produto</span>
            <span>R$ 40,52</span>
          </div>
          <div className="purchase-item">
            <span>Frete</span>
            <span>R$ 37,36</span>
          </div>
          <div className="purchase-item">
            <span><a href="#">Inserir código do cupom</a></span>
          </div>
          <div className="total">
            <span>Você pagará</span>
            <span>R$ 77,88</span>
          </div>
        </div>
      </div>
      <button className="continue-button">Continuar</button>
    </div>
  );
}

export default Pagamento;
