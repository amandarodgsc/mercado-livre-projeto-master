import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CadastrodeVendedor.css';
import InputMask from 'react-input-mask';
import Compressor from 'compressorjs';
import { MdHeight } from 'react-icons/md';

function CadastrarVendedor() {
  const [sellerName, setSellerName] = useState('');
  const [sellerCpf, setSellerCpf] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [sellerProfileImage, setSellerProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sellerProfileImage || !['image/jpeg', 'image/png', 'image/gif'].includes(sellerProfileImage.type)) {
      alert('Por favor, selecione uma imagem válida (JPEG, PNG ou GIF).');
      return;
    }

    new Compressor(sellerProfileImage, {
      quality: 0.6, 
      success(compressedImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result;

          const newSeller = {
            id: Date.now().toString(), 
            name: sellerName,
            cpf: sellerCpf,
            email: sellerEmail,
            phone: sellerPhone,
            address: sellerAddress,
            profileImage: base64Image, 
          };

          const existingSellers = JSON.parse(localStorage.getItem('sellers')) || [];
          existingSellers.push(newSeller);
          localStorage.setItem('sellers', JSON.stringify(existingSellers));

          navigate('/produtos-cadastrados');
        };

        reader.readAsDataURL(compressedImage); 
      },
      error(err) {
        console.error('Erro ao comprimir a imagem:', err.message);
      },
    });
  };

  return (
    <div>
         <header className="header" style={{margin:'0px'}}>
                <img 
                    src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus@2x.png" 
                    alt="Logo Mercado Livre" 
                    className="logo"
                    style={{height:'40px',width:'150px'}}
                />
                  <nav className="navbar" style={{backgroundColor:'#fee601'}}>
          <Link to="/Produtos-Cadastrados" className="navbar-link">Produtos</Link>
          <Link to="/feedbacks" className="navbar-link">Avaliação</Link>
          <Link to="/relatorio-vendas" className="navbar-link">Relatório</Link> 
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/cadastro-vendedor" className="navbar-link">Cadastre-se</Link>


        </nav>
            </header>

      <div className="cadastro-container">
        <h1>Cadastro de Vendedor</h1>
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="seller-name">Nome do Vendedor:</label>
            <input
              type="text"
              id="seller-name"
              required
              placeholder="Digite o nome do vendedor"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seller-cpf">CPF:</label>
            <InputMask
              mask="999.999.999-99"
              id="seller-cpf"
              required
              placeholder="Digite o CPF do vendedor"
              value={sellerCpf}
              onChange={(e) => setSellerCpf(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seller-email">E-mail:</label>
            <input
              type="email"
              id="seller-email"
              required
              placeholder="Digite o e-mail do vendedor"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seller-phone">Telefone:</label>
            <InputMask
              mask="(99) 99999-9999"
              id="seller-phone"
              required
              placeholder="Digite o telefone do vendedor"
              value={sellerPhone}
              onChange={(e) => setSellerPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seller-address">Endereço:</label>
            <textarea
              id="seller-address"
              required
              placeholder="Digite o endereço do vendedor"
              value={sellerAddress}
              onChange={(e) => setSellerAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="seller-profile-image">Imagem de Perfil:</label>
            <input
              type="file"
              id="seller-profile-image"
              accept="image/*"
              required
              onChange={(e) => setSellerProfileImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="cadastro-button">Cadastrar Vendedor</button>
        </form>
      </div>
<footer className="produtos-footer" style={{padding: '40px'}}>
  <p className="produtos-footer-copyright">Copyright © 2024 Ebazar.com.br LTDA.</p>
  <div className="produtos-footer-links">
    <a href="#termos" className="produtos-footer-link">Termos e condições</a>
    <a href="#privacidade" className="produtos-footer-link">Como cuidamos da sua privacidade</a>
  </div>
</footer>
    </div>
  );
}

export default CadastrarVendedor;
