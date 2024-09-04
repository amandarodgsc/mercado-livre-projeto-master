import React, { useState } from 'react';
import './pagamento.css';

function Pagamento() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethod(event.target.id);
    setIsFormVisible(true); // Mostra o formulário quando um método é selecionado
  };

  const closeForm = () => {
    setIsFormVisible(false); // Fecha o formulário
  };

  const renderPaymentForm = () => {
    if (selectedPaymentMethod === 'pix') {
      // Renderiza o QR code para o Pix
      return (
        <div className="payment-form-overlay">
          <div className="payment-form">
            <button className="close-button" onClick={closeForm}>X</button>
            <h3>QR Code do Pix</h3>
            <div className="qr-code-container">
              <img 
                src="" 
                alt="QR Code do Pix" 
                className="qr-code"
              />
              <p>Por favor, escaneie o QR code para realizar o pagamento.</p>
            </div>
            <div className="button-container">
              <button className="finalize-button">Finalizar a Compra</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="payment-form-overlay">
          <div className="payment-form">
            <button className="close-button" onClick={closeForm}>X</button>
            <h3>Informações de Pagamento</h3>
            <form>
              <div className="form-group">
                <label htmlFor="card-number">Número do Cartão:</label>
                <input type="text" id="card-number" name="card-number" />
              </div>
              <div className="form-group">
                <label htmlFor="card-name">Nome no Cartão:</label>
                <input type="text" id="card-name" name="card-name" />
              </div>
              <div className="form-group">
                <label htmlFor="expiry-date">Validade:</label>
                <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/AA" />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" />
              </div>
              <div className="button-container">
                <button className="finalize-button">Finalizar a Compra</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="payment-page">
      <header className="yellow-header">
        <img 
          src="https://mercadolivre.randstad.com.br/vagas_mercado_livre/img/vagas_mercado_livre.logomercadolivre.png?CYGPvbR__Oy3DfKdCHW7Bw" 
          alt="Mercado Livre Logo" 
          className="mercado-livre-logo" 
        />
        <a href="/contato" className="contact-link">Contato</a>
      </header>
      <div className="payment-container">
        <div className="payment-methods">
          <h2>Escolha como pagar</h2>
          <div className="combine-methods"></div>
          <div className="payment-option recommended">
            <input type="radio" name="payment-method" id="mercado-pago" onChange={handlePaymentChange} />
            <label htmlFor="mercado-pago">
              <div className="payment-logo">VISA</div>
              <span>Cartão Mercado Pago</span>
              <small>Até 3x sem juros</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="mercado-credito" onChange={handlePaymentChange} />
            <label htmlFor="mercado-credito">
              <div className="payment-logo">MC</div>
              <span>Mercado Crédito</span>
              <small>Limite disponível: R$ 240</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="cartao-credito" onChange={handlePaymentChange} />
            <label htmlFor="cartao-credito">
              <div className="payment-logo">CC</div>
              <span>Cartão de Crédito</span>
              <small>Até 3x sem juros</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="cartao-debito" onChange={handlePaymentChange} />
            <label htmlFor="cartao-debito">
              <div className="payment-logo">CB</div>
              <span>Cartão de Débito</span>
              <small>À vista</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="boleto" onChange={handlePaymentChange} />
            <label htmlFor="boleto">
              <div className="payment-logo">IIIIII</div>
              <span>Boleto</span>
              <small>À vista</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="pix" onChange={handlePaymentChange} />
            <label htmlFor="pix">
              <div className="payment-logo">Pix</div>
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
      {isFormVisible && renderPaymentForm()}
      <footer className="footer">
        <div className="footer-content">
          <a href="/trabalhe-conosco">Trabalhe conosco</a>
          <a href="/termos-e-condicoes">Termos e condições</a>
          <a href="/promocoes">Promoções</a>
          <a href="/privacidade">Como cuidamos da sua privacidade</a>
          <a href="/acessibilidade">Acessibilidade</a>
          <a href="/contato">Contato</a>
          <a href="/seguros">Informações sobre seguros</a>
        </div>
        <div className="footer-copyright">
          <span>Copyright © 1999-2024 Ebazar.com.br LTDA.</span>
          <span>CNPJ nº 03.007.331/0001-41 / Av. das Nações Unidas, nº 3.003, Bonfim, Osasco/SP - CEP 06233-903 - empresa do grupo Mercado Livre.</span>
        </div>
      </footer>
    </div>
  );
}

export default Pagamento;
