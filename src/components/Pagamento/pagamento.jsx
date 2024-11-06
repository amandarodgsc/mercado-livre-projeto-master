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
              src="../path/to/your/qr-code-image.png" // Coloque o caminho da sua imagem de QR Code aqui
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
