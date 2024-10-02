import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastrarProduto.css';

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

    // Cria um novo objeto de produto
    const newProduct = {
      id: Date.now(), // Gerar um ID único usando a data atual
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
      category: productCategory,
      description: productDescription,
      image: productImage ? URL.createObjectURL(productImage) : null,
    };

    // Obtém os produtos existentes do localStorage ou inicializa um array vazio
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Adiciona o novo produto à lista de produtos existentes
    existingProducts.push(newProduct);

    // Armazena a lista atualizada no localStorage
    localStorage.setItem('products', JSON.stringify(existingProducts));

    // Redireciona para a página do vendedor
    navigate('/vendedor');
  };

  return (
    <div>
      <header role="banner" data-siteid="MLB" className="nav-header nav-header-lite">
        <div className="nav-bounds">
          <a className="nav-logo" href="//www.mercadolivre.com.br">Mercado Livre</a>
        </div>
      </header>

      {/* Conteúdo do Cadastro */}
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
            <input
              type="number"
              id="product-price"
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
