import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importação para navegação
import InputMask from 'react-input-mask'; // Importação para máscara de input
import './Cadastrovendedor.css'; // Certifique-se de que este arquivo CSS está presente

function CadastroVendedor() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    cpf: '',
    password: '',
  });

  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Armazenar dados no localStorage
    localStorage.setItem('vendedorData', JSON.stringify(formData));
    // Redirecionar para a página de cadastro de produto
    navigate('/cadastrar-produto');
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

      {/* Conteúdo do Cadastro */}
      <div className="cadastro-container">
        <h1>Preencha os dados para criar sua conta</h1>
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Adicione seu e-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" // Adicione o nome para o controle
              required 
              placeholder="Digite seu e-mail" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Escolha um nome</label>
            <input 
              type="text" 
              id="name" 
              name="name" // Adicione o nome para o controle
              required 
              placeholder="Digite seu nome" 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Valide seu telefone</label>
            <InputMask
              mask="(99) 99999-9999" // Máscara para telefone
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Digite seu telefone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">Informe seu CPF</label>
            <InputMask
              mask="999.999.999-99" // Máscara para CPF
              type="text"
              id="cpf"
              name="cpf"
              required
              placeholder="Digite seu CPF"
              value={formData.cpf}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Crie sua senha</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="Digite sua senha" 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>

          <button type="submit" className="cadastro-button">Adicionar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroVendedor;
