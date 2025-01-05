import React, { useEffect, useState } from 'react';
import route from './route';  // Ensure that the route function is configured correctly
import axios from 'axios';
import '../css/Orders.scss'
import { Link } from 'react-router-dom';

const Orders = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem('Auth');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      if (value !== null) {
        const res = await axios.get(`${route()}getorders`, {
          headers: { "Authorization": `Bearer ${value}` }
        });
        if (res.status === 200) {
          setUsername(res.data.username);
          setRole(res.data.role);
          setLoggedIn(true);
          setOrders(res.data.orders); 
        } 
      }
    } catch (error) {
      console.log("error");
    }
  };
  console.log(orders);
  

  return (
    <div className="home-container">
         <div className="home-products-container">
           {orders && orders.length > 0 ? (
             orders.map((order) => (
               <div key={order._id} className="home-product-card">
                 {order.product.pimages && order.product.pimages.length > 0 && (
                   <div className="home-product-images">
                         <div className="home-image-gallery">
                           {order.product.pimages.length > 0 && (
                             <img
                               src={order.product.pimages[0]} // Show only the first image
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
                        <span className='home-product-name'>{order.product.pname}</span>
                     </div>
                  </div>
  
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

export default Orders;