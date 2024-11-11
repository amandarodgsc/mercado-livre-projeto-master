import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FeedbacksPage() {
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [allProducts, setAllProducts] = useState([]); 

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setAllProducts(storedProducts);
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
        const feedbackArray = Object.keys(storedFeedbacks).map(productId => {
            return {
                productId,
                feedbacks: storedFeedbacks[productId]
            };
        });
        setAllFeedbacks(feedbackArray);
    }, []);

    const getProductImage = (productId) => {
        const product = allProducts.find(p => p.id === productId);
        return product ? product.image : ''; 
    };

    return (
        <>
            <header className="header full-width-header">
                <img 
                    src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus@2x.png" 
                    alt="Logo Mercado Livre" 
                    className="logo"
                    style={{ height: '40px', width: '150px' }}
                />
                <nav className="navbar" style={{ backgroundColor: '#fee601' }}>
                    <Link to="/Produtos-Cadastrados" className="navbar-link">Produtos</Link>
                    <Link to="/feedbacks" className="navbar-link">Avaliação</Link>
                    <Link to="/relatorio-vendas" className="navbar-link">Relatório</Link>
                    <Link to="/login" className="navbar-link">Login</Link>
                    <Link to="/cadastro-vendedor" className="navbar-link">Cadastre-se</Link>
                </nav>
            </header>

            <div className="container">
                <h2>Todas as Avaliações</h2>
                {allFeedbacks.length > 0 ? (
                    allFeedbacks.map(({ productId, feedbacks }) => {
                        const productImage = getProductImage(productId);
                        return (
                            <div key={productId} className="product-feedbacks">
                                <h3>Produto ID: {productId}</h3>
                                {productImage && (
                                    <div className="product-image">
                                        <img src={productImage} alt={`Produto ${productId}`} />
                                    </div>
                                )}
                                <div className="feedbacks-list">
                                    {feedbacks.map((feedback, index) => (
                                        <div key={index} className="feedback-card">
                                            <p><strong>Nome:</strong> {feedback.name}</p>
                                            <p><strong>Data:</strong> {feedback.date}</p>
                                            <p><strong>Localização:</strong> {feedback.location}</p>
                                            <p><strong>Comentário:</strong> {feedback.text}</p>
                                            <p><strong>Estrelas:</strong> {'⭐'.repeat(feedback.stars)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Não há avaliações disponíveis.</p>
                )}

        
     <div>
  <Link 
    to="/mercado-livre-projeto-master"
    style={{
      display: 'inline-block', 
      backgroundColor: '#007bff', 
      color: '#fff', 
      padding: '10px 20px', 
      borderRadius: '5px', 
      textDecoration: 'none', 
      fontSize: '16px', 
      textAlign: 'center', 
      cursor: 'pointer', 
      transition: 'background-color 0.3s', 
      marginRight:'20px'
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} 
    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'} 
  >
    Voltar para a Página Principal
  </Link>
     </div>             
            </div>
            <footer className="produtos-footer">
  <p className="produtos-footer-copyright">Copyright © 2024 Ebazar.com.br LTDA.</p>
  <div className="produtos-footer-links">
    <a href="#termos" className="produtos-footer-link">Termos e condições</a>
    <a href="#privacidade" className="produtos-footer-link">Como cuidamos da sua privacidade</a>
  </div>
</footer>
            
        </>
    );
}

export default FeedbacksPage;
