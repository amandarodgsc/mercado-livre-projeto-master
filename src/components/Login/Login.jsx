import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"; 
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false); 
  const [captchaToken, setCaptchaToken] = useState(null); 
  const navigate = useNavigate();

  const siteKey = "6Leb0XYqAAAAAGMa41IvgRRmW084cUH2jSJwiWJa";

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/Produtos-Cadastrados');
  };

  const onCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
      setCaptchaToken(value); 
    } else {
      setCaptchaVerified(false);
      setCaptchaToken(null);  
    }
  };

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
            style={{height:'42px'}}
          />
          
          <div className="captcha-container">
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={onCaptchaChange}
          />
          </div>

          <button type="submit" className="login-button" style={{margin:'auto'}}>
            Continuar
          </button>
        </form>
        
        <a href="/cadastro-vendedor" className="create-account" onClick={navigateToCadastroVendedor}>
          Criar conta
        </a>
        
        <div className="divider">ou</div>

        <button className="google-button">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2875/2875331.png" 
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
