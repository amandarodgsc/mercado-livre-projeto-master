import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Armazenar dados no localStorage
    localStorage.setItem('enderecoData', JSON.stringify(formData));
    // Redirecionar para a próxima página
    navigate('/Pagamento'); // Substitua pela rota desejada
  };

  return (
    <div>
      {/* Cabeçalho */}
      <header role="banner" data-siteid="MLB" className="nav-header nav-header-lite">
        <div className="nav-bounds">
          <a href="./" className="nav-logo" tabIndex="0">
            <div className="nav-logo-title">
              <span>Mercado Livre</span>
            </div>
          </a>
          <div className="nav-header-menu-wrapper">
            <nav id="nav-header-menu" className="nav-header-menu">
              <a
                href="https://www.mercadolivre.com.br/ajuda"
                className="option-help"
                rel="nofollow"
                aria-labelledby="help-text"
              >
                <i className="nav-icon-help">
                  <span id="help-text">Contato</span>
                </i>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Conteúdo do Cadastro de Endereço */}
      <div className="cadastro-cep-container">
        <h1>Endereço para entrega do produto</h1>
        <form className="cadastro-cep-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="cadastro-cep-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastrarCep;
