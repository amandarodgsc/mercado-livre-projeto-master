import React from 'react';
import './pagamento.css';

function Pagamento() {
  return (
    <div className="pagamento-container">
      <header className="pagamento-header">
        <h1 className="pagamento-title">Pagamento</h1>
      </header>
      <div className="pagamento-content">
        <p>Obrigado pela sua compra!</p>
        <p>Aqui estão os detalhes do seu pagamento:</p>
        {/* Adicione mais detalhes e campos conforme necessário */}
      </div>
    </div>
  );
}

export default Pagamento;
