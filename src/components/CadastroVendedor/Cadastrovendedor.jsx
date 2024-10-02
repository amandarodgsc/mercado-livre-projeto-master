import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importação para navegação
import '../CadastroVendedor/Cadastrovendedor.css'; // Certifique-se de criar este arquivo CSS

function CadastroVendedor() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
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
          <img
            src="../assets/mercado-livre-88.png" // Corrigido para 'src'
            alt="mercadolivre"
            className="logo"
          />
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
            <input 
              type="tel" 
              id="phone" 
              name="phone" // Adicione o nome para o controle
              required 
              placeholder="Digite seu telefone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Crie sua senha</label>
            <input 
              type="password" 
              id="password" 
              name="password" // Adicione o nome para o controle
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
