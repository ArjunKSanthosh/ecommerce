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
    <div className="order-container">
         <div className="order-products-container">
           {orders && orders.length > 0 ? (
             orders.map((order) => (
               <div key={order._id} className="order-product-card">
                 {order.product.pimages && order.product.pimages.length > 0 && (
                   <div className="order-product-images">
                         <div className="order-image-gallery">
                           {order.product.pimages.length > 0 && (
                             <img
                               src={order.product.pimages[0]} // Show only the first image
                               alt="Product Thumbnail"
                               className="order-product-image"
                             />
                           )}
                         </div>
                   </div>
   
                 )}
                 <div className="order-bottom">
                   <div className="order-left">
                     {/* Product Name */}
                     <div className="order-product-info">
                        <span className='order-product-name'>{order.product.pname}</span>
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