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

                    {/* Imagem no Canto Direito */}
                    <div className="promo-banner">
                        <img
                            src="https://www.mercadolivre.com.br/assinaturas/melimais#origin=banner-menu&me.audience=all&me.bu=3&me.bu_line=26&me.component_id=banner_menu_web_ml&me.content_id=BANNER_MENU_PROMO_9_90_MELI_MAIS&me.flow=-1&me.logic=user_journey&me.position=0"
                            alt="Promoção Melimais"
                            className="promo-banner-img"
                        />
                    </div>
                </div>
            </header>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* Item Categorias antes de Ofertas */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button">
                                    Categorias
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/eletronicos">Eletrônicos</a></li>
                                    <li><a className="dropdown-item" href="/roupas">Roupas</a></li>
                                    <li><a className="dropdown-item" href="/brinquedos">Brinquedos</a></li>
                                    <li><a className="dropdown-item" href="/casa">Casa</a></li>
                                    <li><a className="dropdown-item" href="/esportes">Esportes</a></li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/ofertas">Ofertas</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cupons">Cupons</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/supermercado">Supermercado</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/moda">Moda</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/mercado-play">Mercado Play</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/vender">Vender</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contato">Contato</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Carrossel de Imagens */}
            <section className="carousel-section">
                <Carousel>
                    {/* Imagem 1 */}
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://http2.mlstatic.com/D_NQ_652859-MLA80187822056_112024-OO.webp"
                            alt="Promoção"
                        />
                        <Carousel.Caption>
                            <h3>Promoção Especial</h3>
                            <p>Confira nossos descontos imperdíveis.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    {/* Imagem 2 */}
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://http2.mlstatic.com/D_NQ_788869-MLA80120265260_112024-OO.webp"
                            alt="Promoção"
                        />
                        <Carousel.Caption>
                            <h3>Super Ofertas</h3>
                            <p>Encontre as melhores ofertas da temporada!</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    {/* Imagem 3 */}
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://http2.mlstatic.com/D_NQ_879023-MLA80171665656_112024-OO.webp"
                            alt="Promoção"
                        />
                        <Carousel.Caption>
                            <h3>Descontos Imperdíveis</h3>
                            <p>Não deixe passar as ofertas exclusivas.</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    {/* Imagem 4 */}
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://http2.mlstatic.com/D_NQ_920120-MLA78894908838_092024-OO.webp"
                            alt="Promoção"
                        />
                        <Carousel.Caption>
                            <h3>Novidades na Loja</h3>
                            <p>Descubra nossos lançamentos mais recentes.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
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
            // Garantir que product.price seja um número válido
            const price = parseFloat(product.price) || 0; // Se price for inválido, usa 0
            return (
                <div
                    key={product.id}
                    className="produto-item"
                    onClick={() => navigate(`/produtos/${product.id}`)}
                >
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>R$ {price.toFixed(2)}</p> {/* Agora a formatação não gerará erro */}
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
