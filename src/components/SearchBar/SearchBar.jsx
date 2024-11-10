/* eslint-disable no-restricted-globals */
import React, { useState, useContext } from 'react';
import { BsSearch } from 'react-icons/bs';

import './SearchBar.css';
import fetchProducts from '../../api/fetchProducts';
import AppContext from '../../context/AppContext';

function SearchBar() {
  const { setProducts, setLoading } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Novo estado para armazenar resultados

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);

    const products = await fetchProducts(searchValue);
    setProducts(products);
    setSearchResults(products); // Armazena os resultados da pesquisa
    setLoading(false);
    setSearchValue('');
  };

  return (
    <div>
      <form className="search-bar custom-search-bar" onSubmit={handleSearch} style={{width:'600px'}}>
        <input
          type="search"
          value={searchValue}
          placeholder="Buscar produtos"
          className="search__input custom-search-input" 
          onChange={({ target }) => setSearchValue(target.value)}
          required
          style={{height:'30px'}}
        />

        <button type="submit" className="search__button custom-search-button">
          <BsSearch />
        </button>
      </form>

      {/* Renderiza os resultados da pesquisa */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((product) => (
            <div key={product.id} className="search-result-item">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
