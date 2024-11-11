// FeedbackProduto.js

import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import './FeedbackProduto.css';

function FeedbackProduto() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [newFeedback, setNewFeedback] = useState('');
    const [stars, setStars] = useState(0);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [editingIndex, setEditingIndex] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const foundProduct = storedProducts.find(item => String(item.id) === String(productId));
        if (foundProduct) {
            setProduct(foundProduct);
        }

        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
        setFeedbacks(storedFeedbacks[productId] || []);
    }, [productId]);

    const handleAddFeedback = () => {
        if (newFeedback.trim().length < 10) {
            alert('O comentário precisa ter pelo menos 10 caracteres.');
            return;
        }
        if (newFeedback.trim() !== '' && stars > 0 && name && date && location) {
            const feedbackData = {
                text: newFeedback,
                stars,
                name,
                date,
                location
            };

            let updatedFeedbacks;
            if (editingIndex !== null) {
                updatedFeedbacks = feedbacks.map((fb, index) => index === editingIndex ? feedbackData : fb);
                setEditingIndex(null);
            } else {
                updatedFeedbacks = [...feedbacks, feedbackData];
            }

            setFeedbacks(updatedFeedbacks);
            setNewFeedback('');
            setStars(0);
            setName('');
            setDate('');
            setLocation('');

            const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
            storedFeedbacks[productId] = updatedFeedbacks;
            localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
        } else {
            alert('Por favor, preencha todos os campos e adicione uma avaliação de 1 a 5 estrelas.');
        }
    };

    const handleEditFeedback = (index) => {
        setEditingIndex(index);
        const feedback = feedbacks[index];
        setNewFeedback(feedback.text);
        setStars(feedback.stars);
        setName(feedback.name);
        setDate(feedback.date);
        setLocation(feedback.location);
    };

    const handleDeleteFeedback = (index) => {
        const updatedFeedbacks = feedbacks.filter((_, i) => i !== index);
        setFeedbacks(updatedFeedbacks);

        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
        storedFeedbacks[productId] = updatedFeedbacks;
        localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
    };

    const calculateAverageRating = () => {
        if (feedbacks.length === 0) return 0;
        const totalStars = feedbacks.reduce((sum, feedback) => sum + feedback.stars, 0);
        return (totalStars / feedbacks.length).toFixed(1);
    };

    return (
        <div>
            <div className="container">
                <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
                {product ? (
                    <div>
                        <h2>{product.name}</h2>
                        <div className="image-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                        </div>

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
                                        <p><strong>Nome:</strong> {feedback.name}</p>
                                        <p><strong>Data:</strong> {feedback.date}</p>
                                        <p><strong>Localização:</strong> {feedback.location}</p>
                                        <p><strong>Comentário:</strong> {feedback.text}</p>
                                        <p><strong>Estrelas:</strong> {'⭐'.repeat(feedback.stars)}</p>
                                        <button onClick={() => handleEditFeedback(index)} className="icon-button">
                                            ✏️
                                        </button>
                                        <button onClick={() => handleDeleteFeedback(index)} className="icon-button">
                                            🗑️
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>Sem comentários ainda.</p>
                            )}
                        </div>

                        <div className="new-feedback-form">
                            <h3>{editingIndex !== null ? 'Editar Comentário' : 'Adicionar Novo Comentário'}</h3>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu Nome"
                                className="feedback-input"
                            />

                            <InputMask
                                mask="99/99/9999"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Data (DD/MM/AAAA)"
                                className="feedback-input"
                            />

                            <InputMask
                                mask="99999-999"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Localização (CEP)"
                                className="feedback-input"
                            />

                            <textarea
                                value={newFeedback}
                                onChange={(e) => setNewFeedback(e.target.value)}
                                placeholder="Deixe seu comentário (mínimo de 10 caracteres)"
                                className="feedback-textarea"
                            />

                            <div className="rating-label">
                                Avaliação:
                                <input
                                    type="number"
                                    value={stars}
                                    onChange={(e) => setStars(Math.max(0, Math.min(5, parseInt(e.target.value))))}
                                    min="0"
                                    max="5"
                                    className="stars-input"
                                />
                                <div className="stars-display">
                                    {'⭐'.repeat(stars)}
                                </div>
                            </div>

                            <button onClick={handleAddFeedback} className="add-feedback-button">
                                {editingIndex !== null ? 'Atualizar Comentário' : 'Adicionar Comentário'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="not-found-message">
                        <p>Produto não encontrado.</p>
                    </div>
                )}

                <div className="view-all-feedbacks-link">
                    <Link to="/feedbacks">Ver todas as avaliações</Link>
                </div>
            </div>

            <footer className="produtos-footer">
                <p className="produtos-footer-copyright">Copyright © 2024 Ebazar.com.br LTDA.</p>
                <div className="produtos-footer-links">
                    <a href="#termos" className="produtos-footer-link">Termos e condições</a>
                    <a href="#privacidade" className="produtos-footer-link">Como cuidamos da sua privacidade</a>
                </div>
            </footer>
        </div>
    );
}

export default FeedbackProduto;
