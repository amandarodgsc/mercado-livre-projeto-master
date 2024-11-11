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
            <header className="header" style={{ margin: '0px', borderBottom: '0' }}>
                <div className="container" style={{background:'#fee600'}}>
                    <div className="logo-container">
                        <img
                            src="data:image/png;base64,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"
                            alt="Logo Mercado Livre"
                            className="logo"
                            style={{height:'95px', width:'180px'}}
                        />
                        <div className="cep-info" onClick={() => navigate('/cadastrar-cep')} style={{marginBottom:'10px'}}>
                            <BsGeoAlt className="geo-icon" />
                            <span>Informe seu CEP</span>
                        </div>
                    </div>
                    <form className="search-bar" onSubmit={handleSearch} style={{background:'white'}}>
                        <input
                            type="search"
                            value={searchValue}
                            placeholder="Buscar produtos, marcas e muito mais"
                            className="search__input"
                            onChange={({ target }) => setSearchValue(target.value)}
                            required
                            style={{ height: '30px', border: '1px solid #ffffff' }}
                        />
                        <button type="submit" className="search__button">
                            <BsSearch />
                        </button>
                    </form>
                </div>
            </header>

            <section className="carousel-section">
        <Carousel interval={2000}>
    <Carousel.Item>
        <img className="d-block w-100" src="https://http2.mlstatic.com/D_NQ_652859-MLA80187822056_112024-OO.webp" alt="Promoção" />
        <Carousel.Caption>
            <h3>Promoção Especial</h3>
            <p>Confira nossos descontos imperdíveis.</p>
        </Carousel.Caption>
    </Carousel.Item>
    
    <Carousel.Item>
        <img className="d-block w-100" src="https://http2.mlstatic.com/D_NQ_971261-MLA80405697867_112024-OO.webp" alt="Nova" />
        <Carousel.Caption>
            <h3>Nova Coleção</h3>
            <p>Confira as novidades da nossa coleção.</p>
        </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
        <img className="d-block w-100" src="https://http2.mlstatic.com/D_NQ_697286-MLA80481726661_112024-OO.webp" alt="Nova2" />
        <Carousel.Caption>
            <h3>Outra Coleção</h3>
            <p>Confira as novidades da nossa coleção.</p>
        </Carousel.Caption>
    </Carousel.Item>
</Carousel>
            </section>

            <section className="produtos">
                <h2>Produtos em Destaque</h2>
                <div className="produtos-grid">
                    {products.map((product) => {
                        const price = parseFloat(product.price) || 0;
                        return (
                            <div
                                key={product.id}
                                className="produto-item"
                                onClick={() => navigate(`/produtos/${product.id}`)}  // Navegação para a página de feedback do produto
                            >
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>R$ {price.toFixed(2)}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Mercado Livre. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default TelaCliente;
