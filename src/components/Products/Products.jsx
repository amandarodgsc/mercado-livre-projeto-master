import React, { useEffect, useContext } from 'react';
import './Products.css';
import fetchProducts from '../../api/fetchProducts';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
import AppContext from '../../context/AppContext';

function Products() {
  const { products, setProducts, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    setLoading(true); // Ensure loading is set to true before fetching data
    fetchProducts('iphone').then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, [setProducts, setLoading]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="banner">
            <img src="https://http2.mlstatic.com/D_NQ_938152-MLA78305091572_082024-OO.webp" alt="Product Banner" />
          </div>
          <section className="products container">
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </section>
        </div>
      )}
    </>
  );
}

export default Products;
