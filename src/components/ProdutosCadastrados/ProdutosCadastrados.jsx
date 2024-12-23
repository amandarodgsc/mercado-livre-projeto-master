import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ProdutosCadastrados.css';

function ProdutosCadastrados() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductData, setEditedProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });
  const [confirmRemoveProductId, setConfirmRemoveProductId] = useState(null);
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
      updatedCart[existingProductIndex].totalPrice = Number(updatedCart[existingProductIndex].price) * updatedCart[existingProductIndex].quantity;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newProduct = { ...product, quantity: 1, totalPrice: Number(product.price) };
      const updatedCart = [...cart, newProduct];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleRemoveProduct = (productId) => {
    if (confirmRemoveProductId === productId) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setConfirmRemoveProductId(null); 
    } else {
      setConfirmRemoveProductId(productId); 
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setEditedProductData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category
    });
  };

  const handleSaveEditedProduct = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          ...editedProductData
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditingProductId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const closeCart = () => {
    setCartVisible(false); 
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + (Number(item.totalPrice) || 0), 0);
    return total.toFixed(2);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        item.quantity += 1;
        item.totalPrice = Number(item.price) * item.quantity;  
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
        item.totalPrice = Number(item.price) * item.quantity;  
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleGoToAddressPage = () => {
    navigate('/cadastrar-cep'); 
  };

  return (
    <div className="produtos-container">
        <header className="header"style={{border:'0'}}>
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

      <div className="filter-container">
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

      <div className="produtos-grid" style={{padding:'40px'}}>
        {filteredProducts.map((product) => (
          <div className="produto-item" key={product.id}>
            <Link to={`/produto/${product.id}`} className="produto-link">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>R$ {Number(product.price || 0).toFixed(2)}</p>
              <p>Quantidade: {product.quantity}</p>
              <p>Categoria: {product.category}</p>
              <p>{product.description}</p>
            </Link>
            <Link to={`/produtos/${product.id}`}><button className="filter-button">Detalhes</button></Link>

            {editingProductId === product.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editedProductData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="price"
                  value={editedProductData.price}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  value={editedProductData.description}
                  onChange={handleInputChange}
                />
                <select
                  name="category"
                  value={editedProductData.category}
                  onChange={handleInputChange}
                >
                  <option value="eletrônicos">eletrônicos</option>
                  <option value="roupas">roupas</option>
                  <option value="brinquedos">brinquedos</option>
                  <option value="casa">casa</option>
                  <option value="esportes">esportes</option>
                </select>
                <button onClick={() => handleSaveEditedProduct(product.id)} className="filter-button">Salvar</button>
              </div>
            ) : (
              <>
                <button onClick={() => handleEditProduct(product)} className="filter-button">Alterar</button>
                <button onClick={() => handleAddToCart(product)} className="filter-button">Adicionar ao Carrinho</button>

                {confirmRemoveProductId === product.id ? (
                  <div className="confirmation">
                    <p>Tem certeza que deseja remover este produto?</p>
                    <button onClick={() => handleRemoveProduct(product.id)}>Sim</button>
                    <button onClick={() => setConfirmRemoveProductId(null)}>Cancelar</button>
                  </div>
                ) : (
                  <button onClick={() => handleRemoveProduct(product.id)} className="remove-product-button">Remover Produto</button>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/cadastrar-produto')} className="add-product-button">+</button>

      <button onClick={toggleCart} className="cart-button">
        🛒
        {getTotalItemsInCart() > 0 && (
          <span className="cart-item-count">{getTotalItemsInCart()}</span>
        )}
      </button>
<footer className="produtos-footer">
  <p className="produtos-footer-copyright">Copyright © 2024 Ebazar.com.br LTDA.</p>
  <div className="produtos-footer-links">
    <a href="#termos" className="produtos-footer-link">Termos e condições</a>
    <a href="#privacidade" className="produtos-footer-link">Como cuidamos da sua privacidade</a>
  </div>
</footer>


      {cartVisible && (
        <div className="cart-modal">
          <button onClick={closeCart} className="close-cart-button">Fechar</button>
          <h2>Carrinho</h2>
          {cart.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <p>{item.name}</p>
                  <p>R$ {Number(item.totalPrice).toFixed(2)}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="remove-item">❌</button>
                </div>
              ))}
              <div className="cart-total">
                <p>Total: R$ {calculateTotal()}</p>
                <button onClick={handleGoToAddressPage} className="go-to-address-button">Ir para o endereço</button>
              </div>
            </>
          )}
        </div>
        
      )}
    </div>
    
  );
}

export default ProdutosCadastrados;
