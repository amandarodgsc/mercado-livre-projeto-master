
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './pagamento.css';

function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, endereco } = location.state || { cartItems: [], endereco: {} };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expirationDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [pixKey, setPixKey] = useState('');
  const [timeLeft, setTimeLeft] = useState(30

  ); 
  const [timerActive, setTimerActive] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Controle de redirecionamento

  const shippingCost = 10.0;

  useEffect(() => {
    if (selectedPaymentMethod === 'pix') {
      const newPixKey = generatePixKey();
      setPixKey(newPixKey);
      setTimerActive(true);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Limpa o timer quando o componente for desmontado
    }
  }, [selectedPaymentMethod]);

  const generatePixKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateTotalWithShipping = () => {
    return (parseFloat(calculateTotal()) + shippingCost).toFixed(2);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = 'Escolha um método de pagamento.';
    }

    if (selectedPaymentMethod === 'cartao') {
      if (!formData.cardNumber || formData.cardNumber.length !== 16) {
        newErrors.cardNumber = 'Número do cartão é obrigatório e deve ter 16 dígitos.';
      }
      if (!formData.cardName) {
        newErrors.cardName = 'Nome no cartão é obrigatório.';
      }
      if (!formData.expirationDate || !/^\d{2}\/\d{2}$/.test(formData.expirationDate)) {
        newErrors.expirationDate = 'Data de expiração é obrigatória e deve estar no formato MM/AA.';
      }
      if (!formData.cvv || formData.cvv.length !== 3) {
        newErrors.cvv = 'CVV é obrigatório e deve ter 3 dígitos.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Criação da venda
      const venda = {
        id: Date.now(),  // Usando o timestamp como ID único
        produto: cartItems.map(item => item.name).join(', '),
        preco: parseFloat(calculateTotalWithShipping()),  // Total com frete
        endereco: endereco,
        metodoPagamento: selectedPaymentMethod,  // O método de pagamento (cartão, boleto, pix)
        data: new Date().toLocaleDateString(),  // Data da venda
      };

      // Atualiza o localStorage com a nova venda
      const vendasExistentes = JSON.parse(localStorage.getItem('vendas')) || [];
      vendasExistentes.push(venda);
      localStorage.setItem('vendas', JSON.stringify(vendasExistentes));

      // Redireciona para a página de Relatório de Vendas
      navigate('/relatorio-vendas');
    }
  };

  const handlePaymentSuccess = () => {
    // Criação da venda
    const venda = {
      id: Date.now(),  // Usando o timestamp como ID único
      produto: cartItems.map(item => item.name).join(', '),
      preco: parseFloat(calculateTotalWithShipping()),  // Total com frete
      endereco: endereco,
      metodoPagamento: selectedPaymentMethod,  // O método de pagamento (cartão, boleto, pix)
      data: new Date().toLocaleDateString(),  // Data da venda
    };

    // Atualiza o localStorage com a nova venda
    const vendasExistentes = JSON.parse(localStorage.getItem('vendas')) || [];
    vendasExistentes.push(venda);
    localStorage.setItem('vendas', JSON.stringify(vendasExistentes));

    // Marca o sucesso do pagamento e redireciona
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate('/relatorio-vendas');
    }, 3000); // Espera 3 segundos e vai para o Relatório de Vendas
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'cartao':
        return (
          <div className="payment-form">
            <h3>Pagamento com Cartão de Crédito</h3>
            <form onSubmit={handleSubmit}>
              <label>Número do Cartão</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="0000 0000 0000 0000"
                maxLength={16}
              />
              {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}

              <label>Nome no Cartão</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="Nome completo"
              />
              {errors.cardName && <span className="error">{errors.cardName}</span>}

              <label>Data de Expiração</label>
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                placeholder="MM/AA"
                maxLength={5}
              />
              {errors.expirationDate && <span className="error">{errors.expirationDate}</span>}

              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="000"
                maxLength={3}
              />
              {errors.cvv && <span className="error">{errors.cvv}</span>}

              <button type="submit">Confirmar Pagamento</button>
            </form>
          </div>
        );
      case 'boleto':
        return (
          <div className="payment-form">
            <h3>Pagamento com Boleto</h3>
            <p>O boleto será gerado após a confirmação do pedido.</p>
            {paymentSuccess && <p>Pagamento confirmado! Redirecionando...</p>}
            {!paymentSuccess && (
              <button onClick={handlePaymentSuccess}>Confirmar Boleto</button>
            )}
          </div>
        );
      case 'pix':
        return (
          <div className="payment-form">
            <h3>Pagamento com Pix</h3>
            <p>Chave Pix: {pixKey}</p>
            <div className="qrcode-container">
              <QRCodeCanvas value={`https://pix.com/${pixKey}`} size={256} />
            </div>
            <p>Tempo restante para pagar: {timeLeft}s</p>
            {timeLeft === 0 && <p style={{ color: 'red' }}>QR Code expirado!</p>}
            {paymentSuccess && <p>Pagamento confirmado! Redirecionando...</p>}
            {!paymentSuccess && (
              <button onClick={handlePaymentSuccess}>Confirmar Pix</button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <header role="banner" data-siteid="MLB" className="nav-header nav-header-lite" style={{ margin: '0px' }}>
        <div className="nav-bounds">
          <a className="nav-logo" href="//www.mercadolivre.com.br">
            <img src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus@2x.png" alt="Logo Mercado Livre" className="logo-image" />
          </a>
        </div>
      </header>

      <div className="pagamento">
        <div className="order-summary">
          <h2>Detalhes do Pedido</h2>
          <p>Total do Carrinho: R$ {calculateTotal()}</p>
          <p>Frete: R$ {shippingCost}</p>
          <p>Total: R$ {calculateTotalWithShipping()}</p>
        </div>

        <div className="payment-methods">
          <h3>Escolha o Método de Pagamento</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cartao"
              onChange={() => setSelectedPaymentMethod('cartao')}
              checked={selectedPaymentMethod === 'cartao'}
            />
            Cartão de Crédito
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="boleto"
              onChange={() => setSelectedPaymentMethod('boleto')}
              checked={selectedPaymentMethod === 'boleto'}
            />
            Boleto
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="pix"
              onChange={() => setSelectedPaymentMethod('pix')}
              checked={selectedPaymentMethod === 'pix'}
            />
            Pix
          </label>
        </div>

        {renderPaymentForm()}
      </div>
      {/* Adicionando o footer fixado no topo */}
{/* Adicionando o footer fixado no rodapé */}
<footer className="footer-fixo-rodape">
  <p className="footer-fixo-rodape-copyright">Copyright © 2024 Ebazar.com.br LTDA.</p>
  <div className="footer-fixo-rodape-links">
    <a href="#termos" className="footer-fixo-rodape-link">Termos e condições</a>
    <a href="#privacidade" className="footer-fixo-rodape-link">Como cuidamos da sua privacidade</a>
  </div>
</footer>


    </div>
  );
}


export default Pagamento;

