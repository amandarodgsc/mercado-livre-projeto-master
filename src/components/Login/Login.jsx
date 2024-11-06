import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"; // Importe o reCAPTCHA
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false); // Estado para verificar se o captcha foi validado
  const [captchaToken, setCaptchaToken] = useState(null); // Estado para armazenar o token do reCAPTCHA
  const navigate = useNavigate();

  const siteKey = "6Leb0XYqAAAAAGMa41IvgRRmW084cUH2jSJwiWJa"; // Substitua com sua chave pública do reCAPTCHA

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redireciona diretamente para a página de Produtos Cadastrados
    navigate('/Produtos-Cadastrados');
  };

  const onCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
      setCaptchaToken(value);  // Armazena o token do captcha
    } else {
      setCaptchaVerified(false);
      setCaptchaToken(null);  // Reseta o token se o captcha for desmarcado
    }
  };

  // Função para redirecionar para a página de cadastro de vendedor
  const navigateToCadastroVendedor = () => {
    navigate('/cadastro-vendedor');
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
        <h2>Digite seu e-mail ou telefone e senha para iniciar sessão</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="E-mail ou telefone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          
          {/* Adiciona o reCAPTCHA */}
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={onCaptchaChange}
          />

          <button type="submit" className="login-button">
            Continuar
          </button>
        </form>
        
        {/* Link para o Cadastro de Vendedor */}
        <a href="#" className="create-account" onClick={navigateToCadastroVendedor}>
          Criar conta
        </a>
        
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
