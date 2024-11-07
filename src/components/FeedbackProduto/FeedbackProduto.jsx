import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FeedbackProduto.css';

function FeedbackProduto() {
    const { productId } = useParams();  // Pegando o ID do produto da URL
    const [product, setProduct] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [newFeedback, setNewFeedback] = useState('');
    const [stars, setStars] = useState(0);
    const navigate = useNavigate();

    // Carregar produto e feedbacks ao montar o componente
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const foundProduct = storedProducts.find(item => String(item.id) === String(productId));
        if (foundProduct) {
            setProduct(foundProduct);  // Se encontrado, define o produto
        }

        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
        setFeedbacks(storedFeedbacks[productId] || []);
    }, [productId]);

    // Função para adicionar feedback
    const handleAddFeedback = () => {
        if (newFeedback.trim() !== '' && stars > 0) { // Validando para não permitir comentários vazios e com 0 estrelas
            const feedbackData = {
                text: newFeedback,
                stars,
            };
            const updatedFeedbacks = [...feedbacks, feedbackData];
            setFeedbacks(updatedFeedbacks);
            setNewFeedback(''); // Limpa o campo de feedback
            setStars(0); // Limpa a seleção de estrelas

            const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
            storedFeedbacks[productId] = updatedFeedbacks;
            localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
        } else {
            alert('Por favor, insira um comentário válido e uma avaliação de 1 a 5 estrelas.');
        }
    };

    // Calcular a avaliação média do produto
    const calculateAverageRating = () => {
        if (feedbacks.length === 0) return 0; // Evitar divisão por zero
        const totalStars = feedbacks.reduce((sum, feedback) => sum + feedback.stars, 0);
        return (totalStars / feedbacks.length).toFixed(1); // Exibe a média com 1 casa decimal
    };

    return (
        <div className="container">
            <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
            {product ? (
                <div>
                    <h2>{product.name}</h2>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <p><strong>Descrição:</strong> {product.description}</p>
                    <p><strong>Preço:</strong> R$ {parseFloat(product.price).toFixed(2)}</p>
                    <p><strong>Categoria:</strong> {product.category}</p>

                    <div className="overall-rating">
                        <h3>Opiniões do produto</h3>
                        <div className="rating-display">
                            <span className="rating-number">{calculateAverageRating()}</span>
                            <span className="stars">{'⭐'.repeat(Math.round(calculateAverageRating()))}</span>
                            <span className="rating-count">({feedbacks.length} avaliações)</span>
                        </div>
                    </div>

                    <div className="existing-feedbacks">
                        <h3>Comentários:</h3>
                        {feedbacks.length > 0 ? (
                            feedbacks.map((feedback, index) => (
                                <div key={index} className="feedback-card">
                                    <p>{feedback.text}</p>
                                    {feedback.stars > 0 && <p>Estrelas: {'⭐'.repeat(feedback.stars)}</p>}
                                </div>
                            ))
                        ) : (
                            <p>Sem comentários ainda.</p>
                        )}
                    </div>

                    <div className="new-feedback-form">
                        <h3>Adicionar Novo Comentário</h3>
                        <textarea
                            value={newFeedback}
                            onChange={(e) => setNewFeedback(e.target.value)}
                            placeholder="Deixe seu comentário"
                            className="feedback-textarea"
                        />
                        <div className="rating-label">
                            Avaliação:
                            <input
                                type="number"
                                value={stars}
                                onChange={(e) => setStars(Math.max(0, Math.min(5, parseInt(e.target.value))))}  // Restringe entre 0 e 5
                                min="0"
                                max="5"
                                className="stars-input"
                            />
                            <div className="stars-display">
                                {'⭐'.repeat(stars)} {/* Exibe as estrelas selecionadas */}
                            </div>
                        </div>
                        <button onClick={handleAddFeedback} className="add-feedback-button">Adicionar Comentário</button>
                    </div>
                </div>
            ) : (
                <div className="not-found-message">
                    <p>Produto não encontrado.</p>
                </div>
            )}
        </div>
    );
}

export default FeedbackProduto;
