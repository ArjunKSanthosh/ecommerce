import React,{useEffect,useState} from "react";
import route from "./route";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/Wishlist.scss'

const WishList=({setUsername,setRole,setLoggedIn})=>{
    const value=localStorage.getItem('Auth');
    const [products, setProducts] = useState([]);
  useEffect(()=>{
    getDetails();
  },[])
  const getDetails=async()=>{
    try {
      if(value!==null){
      const res=await axios.get(`${route()}getwishlists`,{headers:{"Authorization":`Bearer ${value}`}})
      console.log("ds");
      
      if (res.status==200) {
        setUsername(res.data.username)
        setRole(res.data.role);
        setLoggedIn(true);
        setProducts(res.data.products)
      }else if(res.status==403){
        localStorage.removeItem("Auth")
      }
    }}
     catch (error) {
      console.log("error");
    }
  }
    return (
        <div className="wishlist-container">
              <div className="wishlist-products-container">
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <div key={product._id} className="wishlist-product-card">
                      {/* Product Images */}
                      {product.pimages && product.pimages.length > 0 && (
                        <div className="wishlist-product-images">
                              <div className="wishlist-image-gallery">
                                {product.pimages.length > 0 && (
                                  <img
                                    src={product.pimages[0]} // Show only the first image
                                    alt="Product Thumbnail"
                                    className="wishlist-product-image"
                                  />
                                )}
                              </div>
                        </div>
        
                      )} 
                      <div className="wishlist-bottom">
                        <div className="wishlist-left">
                          {/* Product Name */}
                          <div className="wishlist-product-info">
                             <span className='wishlist-product-name'>{product.pname}</span>
                          </div>
                          {/* Category */}
                          <div className="wishlist-product-info">
                            <span className='wishlist-product-category'>{product.category.toUpperCase()}</span>
                          </div>
        
        
                          {/* Price */}
                          <div className="wishlist-product-info">
                            <span className='wishlist-product-price'>${product.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <Link to={`/product/${product._id}`}>
                          <button className="wishlist-view-product-button" title='View Product'>
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
    )
}
export default WishList;