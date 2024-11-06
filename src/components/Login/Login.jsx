import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('E-mail enviado:', email);
    navigate('/produtos-cadastrados'); // Redireciona para a página de produtos cadastrados
  };

  return (
    <div className="login-container">
      <header>
        <img 
          src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus@2x.png" 
          alt="Mercado Livre" 
          className="logo"
        />
      </header>

      <div className="login-box">
        <h2>Digite seu e-mail ou telefone para iniciar sessão</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="E-mail ou telefone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Continuar
          </button>
        </form>
        <a href="#" className="create-account">Criar conta</a>
        <div className="divider">ou</div>

        <button className="google-button">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
            alt="Google" 
          />
          Fazer login com o Google
        </button>
      </div>

      <footer className="login-footer">
        <a href="#">Tenho um problema de segurança</a>
        <a href="#">Preciso de ajuda com outros temas</a>
        <p>Protegido por reCAPTCHA - <a href="#">Privacidade</a> - <a href="#">Condições</a></p>
      </footer>
    </div>
  );
};

export default Login;
