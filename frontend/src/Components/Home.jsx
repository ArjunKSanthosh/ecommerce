import React, { useEffect, useState } from 'react';
import route from './route';
import axios from 'axios';
import '../css/Home.scss';
import { Link } from 'react-router-dom';

const Home = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      if (value !== null) {
        const res = await axios.get(`${route()}home`, { headers: { "Authorization": `Bearer ${value}` } });
        if (res.status === 200) {
          setUsername(res.data.username);
          setRole(res.data.role);
          setLoggedIn(true);
          setProducts(res.data.products);
        } else if (res.status === 403) {
          localStorage.removeItem("Auth");
        }
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <div className="home-page">
          <h1 style={{textAlign:'center'}}>ALL PRODUCTS</h1>
      <div className="product-container">
        <div className="product-grid">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
                {/* Product Images */}
                {product.pimages && product.pimages.length > 0 && (
                  <div className="product-image-container">
                    <div className="product-image-wrapper">
                      {product.pimages.length > 0 && (
                        <>
                          <img
                            src={product.pimages[0]} // Show only the first image
                            alt="Product Thumbnail"
                            className="product-image"
                          />
                          <Link to={`/product/${product._id}`} className="view-product-button">
                            <span><img src="eye.png" alt="" /></span>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <div className="product-details">
                  <div className="product-info-group">
                    {/* Product Name */}
                    <div className="product-name">
                      <span>{product.pname.substring(0,13)}</span>
                    </div>
                    {/* Category */}
                    <div className="product-category">
                      <span>{product.category.toUpperCase()}</span>
                    </div>
                    {/* Price */}
                    <div className="product-price">
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  {/* <Link to={`/product/${product._id}`}>
                    <button className="product-action-button" title="View Product">
                      view product
                    </button>
                  </Link> */}
                </div>
              </div>
            ))
          ) : (
            <p className="no-products-message">No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
