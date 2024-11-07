import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { BsSearch, BsGeoAlt } from 'react-icons/bs';
import { Carousel } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './TelaCliente.css';

function TelaCliente() {
    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        console.log("Produtos armazenados no localStorage:", storedProducts); // Depuração
        setProducts(storedProducts);
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setProducts(filteredProducts);
        setSearchValue('');
    };

    return (
        <div className="tela-cliente-container">
            {/* Cabeçalho */}
            <header className="header">
                <div className="container">
                    {/* Logo do Mercado Livre */}
                    <div className="logo-container">
                        <img
                            src="https://logopng.com.br/logos/mercado-livre-87.png"
                            alt="Logo Mercado Livre"
                            className="logo"
                        />
                        {/* Informar CEP */}
                        <div className="cep-info" onClick={() => navigate('/cadastrar-cep')}>
                            <BsGeoAlt className="geo-icon" />
                            <span>Informe seu CEP</span>
                        </div>
                    </div>

                    {/* Barra de Pesquisa */}
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input
                            type="search"
                            value={searchValue}
                            placeholder="Buscar produtos, marcas e muito mais"
                            className="search__input"
                            onChange={({ target }) => setSearchValue(target.value)}
                            required
                        />
                        <button type="submit" className="search__button">
                            <BsSearch />
                        </button>
                    </form>
                </div>
            </header>

            {/* Carrossel de Imagens */}
            <section className="carousel-section">
                <Carousel>
                    {/* Adicionar as imagens do carrossel */}
                    <Carousel.Item>
                        <img className="d-block w-100" src="https://http2.mlstatic.com/D_NQ_652859-MLA80187822056_112024-OO.webp" alt="Promoção" />
                        <Carousel.Caption>
                            <h3>Promoção Especial</h3>
                            <p>Confira nossos descontos imperdíveis.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    {/* Outras imagens do carrossel */}
                </Carousel>
            </section>

            {/* Categorias */}
            <section className="categories">
                <h2>Categorias em Destaque</h2>
                <div className="categories-list">
                    {['Eletrônicos', 'Roupas', 'Brinquedos', 'Casa', 'Esportes'].map(category => (
                        <button key={category} className="category-button">
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Produtos */}
            <section className="produtos">
                <h2>Produtos em Destaque</h2>
                <div className="produtos-grid">
                    {products.map((product) => {
                        const price = parseFloat(product.price) || 0; // Garantir que o preço seja válido
                        return (
                            <div
                                key={product.id}
                                className="produto-item"
                                onClick={() => navigate(`/produtos/${product.id}`)}
                            >
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>R$ {price.toFixed(2)}</p> {/* Formatação do preço */}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Rodapé */}
            <footer className="footer">
                <p>© 2024 Mercado Livre. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default TelaCliente;
