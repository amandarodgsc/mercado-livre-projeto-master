import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Certifique-se de importar useNavigate
import './pagamento.css';

function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate(); // Defina a constante navigate
  const { cartItems, endereco } = location.state || { cartItems: [], endereco: {} };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Valor fixo de frete (Você pode ajustar ou calcular dinamicamente dependendo da localização do cliente)
  const shippingCost = 20.0; // Exemplo: valor fixo de R$ 20 para o frete

  const generatePixKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Função para calcular o total do carrinho com base na quantidade de cada produto
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Função para calcular o total final incluindo o frete
  const calculateTotalWithShipping = () => {
    return (parseFloat(calculateTotal()) + shippingCost).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Armazena os dados no Async Storage
    const venda = {
      id: Date.now(), // ID único para cada venda
      produto: cartItems.map(item => item.name).join(', '), // Exemplo de produtos
      preco: parseFloat(calculateTotal()), // Garante que preco seja um número
      endereco: endereco,
      metodoPagamento: selectedPaymentMethod,
    };

    // Recupera vendas existentes do Async Storage
    const vendasExistentes = JSON.parse(localStorage.getItem('vendas')) || [];
    vendasExistentes.push(venda); // Adiciona nova venda

    // Salva as vendas atualizadas no Async Storage
    localStorage.setItem('vendas', JSON.stringify(vendasExistentes));

    // Redireciona para a página de Relatório de Vendas
    navigate('/relatorio-vendas');
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'cartao':
        return (
          <div className="payment-form">
            <h3>Pagamento com Cartão de Crédito</h3>
            <form onSubmit={handleSubmit}>
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
              src="data:image/png;base64,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" // Coloque o caminho da sua imagem de QR Code aqui
              alt="QR Code Pix"
              className="qrcode"
            />
            <p>Escaneie o QR code para efetuar o pagamento.</p>
            <button onClick={handleSubmit}>Confirmar Pagamento</button>
          </div>
        );
      default:
        return <p>Selecione um método de pagamento.</p>;
    }
  };

  return (
    <div className="pagamento-container">
      <h1>Página de Pagamento</h1>
      {/* Valor total dos produtos */}
      <p>Subtotal: R$ {calculateTotal()}</p>
      
      {/* Valor do frete */}
      <p>+ Frete: R$ {shippingCost.toFixed(2)}</p>
      
      {/* Valor total com frete */}
      <h2>Total a Pagar: R$ {calculateTotalWithShipping()}</h2>

      <h2>Endereço para entrega</h2>
      <p>{`${endereco.endereco}, ${endereco.numero}, ${endereco.complemento || ''}, ${endereco.cep}, ${endereco.cidade}, ${endereco.estado}`}</p>

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
