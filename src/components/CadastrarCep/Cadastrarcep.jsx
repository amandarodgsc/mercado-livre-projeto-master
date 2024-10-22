import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastrarcep.css';

function CadastrarCep() {
  const [formData, setFormData] = useState({
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    estado: '',
    cidade: '',
  });
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Carregar dados do carrinho do localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Armazenar dados no localStorage
    localStorage.setItem('enderecoData', JSON.stringify(formData));
    
    // Redirecionar para a página de pagamento com os dados do carrinho e do endereço
    navigate('/pagamento', { 
      state: { 
        cartItems: cart,
        endereco: formData
      } 
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <header role="banner" data-siteid="MLB" className="nav-header nav-header-lite">
        <div className="nav-bounds">
          <a href="./" className="nav-logo" tabIndex="0">
            <div className="nav-logo-title">
              <span>Mercado Livre</span>
            </div>
          </a>
        </div>
      </header>

      <div className="cadastro-cep-container">
        <h1>Endereço para entrega do produto</h1>
        <form className="cadastro-cep-form" onSubmit={handleSubmit}>
          {/* Campos do formulário de endereço */}
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              required
              placeholder="Digite seu endereço"
              value={formData.endereco}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numero">Número</label>
            <input
              type="text"
              id="numero"
              name="numero"
              required
              placeholder="Digite o número"
              value={formData.numero}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              placeholder="Digite o complemento (opcional)"
              value={formData.complemento}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              name="cep"
              required
              placeholder="Digite seu CEP"
              value={formData.cep}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              name="estado"
              required
              placeholder="Digite seu estado"
              value={formData.estado}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              required
              placeholder="Digite sua cidade"
              value={formData.cidade}
              onChange={handleChange}
            />
          </div>

          <div className="carrinho-container">
            <h2>Carrinho</h2>
            {cart.length === 0 ? (
              <p>O carrinho está vazio.</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <h3>{item.name}</h3>
                    <p>R$ {item.price.toFixed(2)}</p>
                  </div>
                ))}
                <div className="total-container">
                  <h3>Total: R$ {calculateTotal()}</h3>
                </div>
                <button type="submit" className="finalizar-pagamento-button">Finalizar Pagamento</button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastrarCep;
