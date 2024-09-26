import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai'; // Importando o ícone de lupa
import { Link } from 'react-router-dom';

import './ProductCard.css';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';

function ProductCard({ data }) {
  const { id, title, thumbnail, price } = data;

  const { cartItems, setCartItems } = useContext(AppContext);

  const handleAddCart = () => setCartItems([...cartItems, data]);

  return (
    <section className="product-card">
      <div className="image-container">
        <img
          src={thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}
          alt="product"
          className="card__image"
        />
        <Link to={`/product/${id}`} className="icon-container">
          <AiOutlineSearch className="icon" /> {/* Ícone da lupa */}
        </Link>
      </div>

      <div className="card__infos">
        <h2 className="card__price">{formatCurrency(price, 'BRL')}</h2>
        <h2 className="card__title">{title}</h2>
      </div>

      <button
        type="button"
        className="button__add-cart"
        onClick={handleAddCart}
      >
        <BsFillCartPlusFill />
      </button>
    </section>
  );
}

ProductCard.propTypes = {
  data: propTypes.shape({}).isRequired,
};

export default ProductCard;
