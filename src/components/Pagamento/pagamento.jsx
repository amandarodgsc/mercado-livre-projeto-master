import React from 'react';
import './pagamento.css';

function Pagamento() {
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
            <input type="radio" name="payment-method" id="cartao-credito" />
            <label htmlFor="cartao-credito">
              <div className="payment-logo">CC</div>
              <span>Cartão de Crédito</span>
              <small>Até 3x sem juros</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="cartao-debito" />
            <label htmlFor="cartao-debito">
              <div className="payment-logo">CB</div>
              <span>Cartão de Débito</span>
              <small>À vista</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="boleto" />
            <label htmlFor="boleto">
              <div className="payment-logo">IIIIII</div>
              <span>Boleto</span>
              <small>À vista</small>
            </label>
          </div>
          <div className="payment-option">
            <input type="radio" name="payment-method" id="pix" />
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
          <div className="continue-button-container">
            <button className="continue-button">Continuar</button>
          </div>
        </div>
      </div>
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
