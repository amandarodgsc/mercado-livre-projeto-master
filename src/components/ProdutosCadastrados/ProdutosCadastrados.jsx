import React, { useEffect, useState } from 'react';
import './ProdutosCadastrados.css';

function ProdutosCadastrados() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    setFilteredProducts(storedProducts);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = category ? products.filter(product => product.category === category) : products;
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="produtos-container">
      <div className="filter-container">
        <h2>Categorias</h2>
        <button onClick={() => handleCategoryClick('')} className="filter-button">Todos</button>
        <button onClick={() => handleCategoryClick('eletrônicos')} className="filter-button">Eletrônicos</button>
        <button onClick={() => handleCategoryClick('roupas')} className="filter-button">Roupas</button>
        <button onClick={() => handleCategoryClick('brinquedos')} className="filter-button">Brinquedos</button>
        <button onClick={() => handleCategoryClick('casa')} className="filter-button">Casa</button>
        <button onClick={() => handleCategoryClick('esportes')} className="filter-button">Esportes</button>
      </div>
      <div className="produtos-grid">
        {filteredProducts.map((product) => (
          <div className="produto-item" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>R$ {product.price.toFixed(2)}</p>
            <p>Quantidade: {product.quantity}</p>
            <p>Categoria: {product.category}</p>
            <p>{product.description}</p>
            <button onClick={() => handleAddToCart(product)} className="filter-button">Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>

      <button onClick={toggleCart} className="cart-button">🛒</button>

      {cartVisible && (
        <div className="cart-modal">
          <h2>Carrinho</h2>
          {cart.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remover</button>
              </div>
            ))
          )}
          <button onClick={toggleCart}>Fechar</button>
        </div>
      )}
    </div>
  );
}

export default ProdutosCadastrados;
