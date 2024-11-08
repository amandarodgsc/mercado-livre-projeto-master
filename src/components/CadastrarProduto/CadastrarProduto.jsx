import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastrarProduto.css';
import InputMask from 'react-input-mask';

function CadastrarProduto() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida se a imagem selecionada é válida
    if (!productImage || !['image/jpeg', 'image/png', 'image/gif'].includes(productImage.type)) {
      alert('Por favor, selecione uma imagem válida (JPEG, PNG ou GIF).');
      return;
    }

    // Converte a imagem em Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      // Remove pontos e vírgulas da string de preço para convertê-lo em float corretamente
      const formattedPrice = parseFloat(productPrice.replace(/[R$\.,]/g, '') / 100);

      const newProduct = {
        id: Date.now().toString(), // Garantindo que o ID seja uma string
        name: productName,
        price: formattedPrice,
        quantity: parseInt(productQuantity),
        category: productCategory,
        description: productDescription,
        image: base64Image, // Armazena a imagem em Base64
      };

      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      existingProducts.push(newProduct);
      localStorage.setItem('products', JSON.stringify(existingProducts));

      navigate('/produtos-cadastrados');
    };

    reader.readAsDataURL(productImage); // Lê a imagem como Base64
  };

  return (
    <div>
    <header role="banner" data-siteid="MLB" className="nav-header nav-header-lite">
      <div className="nav-bounds">
        <a className="nav-logo" href="//www.mercadolivre.com.br">
          <img src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus@2x.png" alt="Logo Mercado Livre" className="logo-image" />
        </a>
      </div>
    </header>
  
    <div className="cadastro-container">
      <h1>Cadastro de Produto</h1>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product-name">Nome do Produto:</label>
          <input
            type="text"
            id="product-name"
            required
            placeholder="Digite o nome do produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
  
  
          <div className="form-group">
            <label htmlFor="product-price">Preço:</label>
            <InputMask
              mask="R$ 999,99"
              id="product-name"
              required
              placeholder="Digite o preço do produto"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-quantity">Quantidade:</label>
            <input
              type="number"
              id="product-quantity"
              required
              min="1"
              placeholder="Digite a quantidade do produto"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-category">Categoria:</label>
            <select
              id="product-category"
              required
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              <option value="eletrônicos">Eletrônicos</option>
              <option value="roupas">Roupas</option>
              <option value="brinquedos">Brinquedos</option>
              <option value="casa">Casa</option>
              <option value="esportes">Esportes</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="product-description">Descrição:</label>
            <textarea
              id="product-description"
              required
              placeholder="Digite a descrição do produto"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-image">Imagem do Produto:</label>
            <input
              type="file"
              id="product-image"
              accept="image/*"
              required
              onChange={(e) => setProductImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="cadastro-button">Cadastrar Produto</button>
        </form>
      </div>
    </div>
  );
}

export default CadastrarProduto;
