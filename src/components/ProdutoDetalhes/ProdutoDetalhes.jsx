import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProdutosDetalhes.css';

function ProdutoDetalhes() {
  const { id } = useParams(); // Acessa o ID do produto da URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]); // Estado para o carrinho
  const [cartVisible, setCartVisible] = useState(false); // Controle da visibilidade do carrinho

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find(product => product.id === id);
    setProduct(foundProduct);

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, [id]);

  if (!product) {
    return <div>Produto não encontrado.</div>; // Mensagem caso o produto não seja encontrado
  }

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

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    return total.toFixed(2);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleReviewClick = () => {
    navigate(`/produtos/${id}/feedback`); // Navega para a página de feedback
  };

  return (
    <div className="produto-detalhes">
      <div className="produto-imagem">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="produto-info">
        <h1>{product.name}</h1>
        <p className="produto-preco">R$ {product.price.toFixed(2)}</p>
        <p className="produto-desconto">12% OFF</p>
        <p className="produto-categoria">Categoria: {product.category}</p>
        <p className="produto-descricao">{product.description}</p>
        <button className="comprar-agora">Comprar agora</button>
        <button className="adicionar-carrinho" onClick={() => handleAddToCart(product)}>Adicionar ao carrinho</button>
        <button className="avaliar-produto" onClick={handleReviewClick}>Avaliar Produto</button>
      </div>

      {/* Carrinho */}
      <button onClick={toggleCart} className="cart-button">
        🛒
        {getTotalItemsInCart() > 0 && (
          <span className="cart-item-count">{getTotalItemsInCart()}</span>
        )}
      </button>

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
                        <button onClick={() => handleRemoveFromCart(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleRemoveFromCart(item.id)}>+</button>
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

export default ProdutoDetalhes;
