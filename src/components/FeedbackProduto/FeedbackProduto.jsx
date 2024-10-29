// FeedbackProduto.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FeedbackProduto.css';

function FeedbackProduto() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [stars, setStars] = useState(0);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find(item => item.id === parseInt(productId));
    setProduct(foundProduct);

    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
    setFeedbacks(storedFeedbacks[productId] || []);
  }, [productId]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        setMediaUrl(URL.createObjectURL(file));
      } else {
        console.error("Tipo de arquivo não suportado.");
      }
    }
  };

  const handleAddFeedback = () => {
    if (newFeedback.trim() !== '') {
      const feedbackData = {
        text: newFeedback,
        mediaUrl,
        stars,
      };
      const updatedFeedbacks = [...feedbacks, feedbackData];
      setFeedbacks(updatedFeedbacks);
      setNewFeedback('');
      setMedia(null);
      setMediaUrl(null);
      setStars(0);

      const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
      storedFeedbacks[productId] = updatedFeedbacks;
      localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
    }
  };

  const calculateAverageRating = () => {
    const totalStars = feedbacks.reduce((sum, feedback) => sum + feedback.stars, 0);
    return totalStars / (feedbacks.length || 1);
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Voltar</button>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>

          {/* Avaliação Geral */}
          <div className="overall-rating">
            <h3>Opiniões do produto</h3>
            <div className="rating-display">
              <span className="rating-number">{calculateAverageRating().toFixed(1)}</span>
              <span className="stars">{'⭐'.repeat(Math.round(calculateAverageRating()))}</span>
              <span className="rating-count">({feedbacks.length} avaliações)</span>
            </div>
          </div>

          {/* Avaliação de Características */}
          <div className="characteristics-rating">
            <h4>Avaliação de características</h4>
            <div className="characteristic">
              Custo-benefício: <span className="stars">{'⭐'.repeat(4)}</span>
            </div>
            <div className="characteristic">
              Qualidade dos materiais: <span className="stars">{'⭐'.repeat(5)}</span>
            </div>
            <div className="characteristic">
              Durabilidade: <span className="stars">{'⭐'.repeat(4)}</span>
            </div>
          </div>

          {/* Comentários em Destaque */}
          <div className="highlighted-feedbacks">
            <h4>Comentários em destaque</h4>
            <div className="feedback-card">
              <p>O produto é excelente, recomendo!</p>
              <p>Estrelas: {'⭐'.repeat(5)}</p>
            </div>
            <div className="feedback-card">
              <p>Vale cada centavo. Muito satisfeito.</p>
              <p>Estrelas: {'⭐'.repeat(4)}</p>
            </div>
          </div>

          {/* Seção de Comentários Existentes */}
          <div className="existing-feedbacks">
            <h3>Comentários:</h3>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <div key={index} className="feedback-card">
                  <p>{feedback.text}</p>
                  {feedback.stars > 0 && <p>Estrelas: {'⭐'.repeat(feedback.stars)}</p>}
                  {feedback.mediaUrl && (
                    feedback.mediaUrl.includes("video") ? (
                      <video src={feedback.mediaUrl} controls />
                    ) : (
                      <img src={feedback.mediaUrl} alt="Media" />
                    )
                  )}
                </div>
              ))
            ) : (
              <p>Sem comentários ainda.</p>
            )}
          </div>

          {/* Formulário para Adicionar Novo Comentário */}
          <div className="new-feedback-form">
            <h3>Adicionar Novo Comentário</h3>
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Deixe seu comentário"
            />
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
            />
            <div className="rating-label">
              Avaliação:
              <input
                type="number"
                value={stars}
                onChange={(e) => setStars(parseInt(e.target.value))}
                min="0"
                max="5"
              />
            </div>
            <button onClick={handleAddFeedback}>Adicionar Comentário</button>
          </div>
        </div>
      ) : (
        <p>Produto não encontrado.</p>
      )}
    </div>
  );
}

export default FeedbackProduto;
