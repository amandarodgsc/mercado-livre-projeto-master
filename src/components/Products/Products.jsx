import React, { useEffect, useContext } from 'react';
import './Products.css';
import fetchProducts from '../../api/fetchProducts';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
import AppContext from '../../context/AppContext';

function Products() {
  const { products, setProducts, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts('variados');
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getProducts();
  }, [setProducts, setLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="products-container">
      <h1 className="products-title">Explore nossos produtos</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} data={product} />)
        ) : (
          <p className="no-products">Nenhum produto disponível</p>
        )}
      </div>
    </section>
  );
}

export default Products;
