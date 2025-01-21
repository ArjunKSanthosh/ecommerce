import React, { useEffect, useState } from "react";
import route from "./route";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/Wishlist.scss';

const WishList = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem("Auth");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      if (value !== null) {
        const res = await axios.get(`${route()}getwishlists`, {
          headers: { Authorization: `Bearer ${value}` },
        });
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
      console.error("Error fetching wishlist:", error);
    }
  };

  return (
    <div className="wishlist-page-container">
      <div className="wishlist-products-grid">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="wishlist-product-card">
              {/* Product Images */}
              {product.pimages && product.pimages.length > 0 && (
                <div className="wishlist-product-images">
                  <div className="wishlist-product-image-gallery">
                    <img
                      src={product.pimages[0]} // Show only the first image
                      alt="Product Thumbnail"
                      className="wishlist-product-thumbnail"
                    />
                  </div>
                </div>
              )}
              <div className="wishlist-product-details">
                <div className="wishlist-product-info">
                  {/* Product Name */}
                  <span className="wishlist-product-name">{product.pname}</span>
                </div>
                {/* Category */}
                <div className="wishlist-product-info">
                  <span className="wishlist-product-category">
                    {product.category.toUpperCase()}
                  </span>
                </div>
                {/* Price */}
                <div className="wishlist-product-info">
                  <span className="wishlist-product-price">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <Link to={`/product/${product._id}`}>
                  <button
                    className="wishlist-view-product-btn"
                    title="View Product"
                  >
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="wishlist-no-products">No products available</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
