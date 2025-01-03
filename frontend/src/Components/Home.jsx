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
        if (res.status == 200) {
          console.log(res.data);
          console.log(res.data.role);
          setUsername(res.data.username);
          setRole(res.data.role);
          setLoggedIn(true);
          setProducts(res.data.products);
        } else if (res.status == 403) {
          localStorage.removeItem("Auth");
        }
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="home-container">
      <div className="home-products-container">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="home-product-card">
              {/* Product Images */}
              {product.pimages && product.pimages.length > 0 && (
                // <div className="home-product-images">
                //   <div className="home-image-gallery">
                //     {product.pimages.map((image, index) => (
                //       <img
                //         key={index}
                //         src={image}
                //         alt={`Product Image ${index + 1}`}
                //         className="home-product-image"
                //       />
                //     ))}
                //   </div>
                // </div>
                <div className="home-product-images">
                      <div className="home-image-gallery">
                        {product.pimages.length > 0 && (
                          <img
                            src={product.pimages[0]} // Show only the first image
                            alt="Product Thumbnail"
                            className="home-product-image"
                          />
                        )}
                      </div>
                </div>

              )}
              <div className="home-bottom">
                <div className="home-left">
                  {/* Product Name */}
                  <div className="home-product-info">
                     <span className='home-product-name'>{product.pname}</span>
                  </div>
                  {/* Category */}
                  <div className="home-product-info">
                    <span className='home-product-category'>{product.category.toUpperCase()}</span>
                  </div>


                  {/* Price */}
                  <div className="home-product-info">
                    <span className='home-product-price'>${product.price.toFixed(2)}</span>
                  </div>
                </div>
                <Link to={`/product/${product._id}`}>
                  <button className="home-view-product-button" title='View Product'>
                    view product
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;