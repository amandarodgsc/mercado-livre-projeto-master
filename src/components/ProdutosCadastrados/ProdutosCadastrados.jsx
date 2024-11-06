import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProdutosCadastrados.css';

function ProdutosCadastrados() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    setFilteredProducts(storedProducts);
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = category ? products.filter(product => product.category === category) : products;
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      updatedCart[existingProductIndex].totalPrice = updatedCart[existingProductIndex].price * updatedCart[existingProductIndex].quantity;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newProduct = { ...product, quantity: 1, totalPrice: product.price };
      const updatedCart = [...cart, newProduct];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    return total.toFixed(2);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="produtos-container">
      <div className="filter-container">
        <h2>Categorias</h2>
        {['Todos', 'eletrônicos', 'roupas', 'brinquedos', 'casa', 'esportes'].map(category => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category === 'Todos' ? '' : category)}
            className={`filter-button ${selectedCategory === (category === 'Todos' ? '' : category) ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="produtos-grid">
        {filteredProducts.map((product) => (
          <div className="produto-item" key={product.id} onClick={() => navigate(`/produtos/${product.id}`)}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>R$ {(product.price || 0).toFixed(2)}</p>
            <p>Quantidade: {product.quantity}</p>
            <p>Categoria: {product.category}</p>
            <p>{product.description}</p>
            <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="filter-button">Adicionar ao Carrinho</button>
            <button onClick={(e) => { e.stopPropagation(); handleRemoveProduct(product.id); }} className="remove-product-button">Remover Produto</button>
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
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-details">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p>Preço unitário: R$ {(item.price || 0).toFixed(2)}</p>
                      <div className="quantity-controls">
                        <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                      </div>
                      <p>Total: R$ {(item.totalPrice || 0).toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="remove-button">Remover</button>
                </div>
              ))}
              <div className="total-container">
                <h3>Total: R$ {calculateTotal()}</h3>
              </div>
            </>
          )}
          <button onClick={() => navigate('/cadastrar-cep')} className="new-product-button">Adicione o Endereço</button>
          <button onClick={toggleCart} className="close-cart-button">Fechar</button>
        </div>
      )}
    </div>
  );
}

export default ProdutosCadastrados;
