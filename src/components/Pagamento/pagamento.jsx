import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';  // Corrigido para QRCodeCanvas
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
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos (300 segundos)
  const [timerActive, setTimerActive] = useState(false);

  const shippingCost = 20.0;

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

    // Verifica se o método de pagamento foi selecionado
    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = 'Escolha um método de pagamento.';
    }

    if (selectedPaymentMethod === 'cartao') {
      // Validação para o formulário de pagamento com cartão
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

    // Se não houver erros, o formulário pode ser enviado
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const venda = {
        id: Date.now(),
        produto: cartItems.map(item => item.name).join(', '),
        preco: parseFloat(calculateTotal()),
        endereco: endereco,
        metodoPagamento: selectedPaymentMethod,
      };

      const vendasExistentes = JSON.parse(localStorage.getItem('vendas')) || [];
      vendasExistentes.push(venda);

      localStorage.setItem('vendas', JSON.stringify(vendasExistentes));

      navigate('/relatorio-vendas');
    }
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
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pagamento">
      <h2>Detalhes do Pedido</h2>
      <div className="order-summary">
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

        {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}
      </div>

      {renderPaymentForm()}
    </div>
  );
}

export default Pagamento;
