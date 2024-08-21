import React from 'react';
import './SiteShoppingInfo.css'; // Certifique-se de criar um arquivo CSS para estilização

const SiteShoppingInfo = () => {
  return (
    <section data-testid="site-shopping-info" className="site-shopping-info" type="site-shopping-info">
      <div className="container">
        <div className="info-slide">
          <div className="img-container">
            <img 
              decoding="async" 
              src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/payment.svg" 
              className="img-container" 
              alt="Escolha como pagar" 
            />
          </div>
          <h2>Escolha como pagar</h2>
          <p>
            <span>
              Com o Mercado Pago, você paga com cartão, boleto ou Pix. Você também pode pagar em até 12x no boleto com o Mercado Crédito.
            </span> 
          </p>
          <a href="https://www.mercadolivre.com.br/pagar-online-com-mercadopago/">
            Como pagar com Mercado Pago
          </a>
        </div>
        
        <div className="info-slide">
          <div className="img-container">
            <img 
              decoding="async" 
              src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/shipping.svg" 
              className="img-container" 
              alt="Frete grátis a partir de R$ 79" 
            />
          </div>
          <h2>Frete grátis a partir de R$ 79</h2>
          <p>
            <span>
              Ao se cadastrar no Mercado Livre, você tem frete grátis em milhares de produtos.
            </span> 
          </p>
        </div>

        <div className="info-slide">
          <div className="img-container">
            <img 
              decoding="async" 
              src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/protected.svg" 
              className="img-container" 
              alt="Segurança, do início ao fim" 
            />
          </div>
          <h2>Segurança, do início ao fim</h2>
          <p>
            <span>
              Você não gostou do que comprou? Devolva! No Mercado Livre não há nada que você não possa fazer, porque você está sempre protegido.
            </span> 
          </p>
          <a href="https://www.mercadolivre.com.br/compra-garantida">
            Como te protegemos
          </a>
        </div>
      </div>
    </section>
  );
};

export default SiteShoppingInfo;