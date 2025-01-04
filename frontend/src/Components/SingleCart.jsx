import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import route from './route';
import axios from 'axios';
import '../css/Cart.scss';
import { FiMinus, FiPlus } from 'react-icons/fi';

const SingleCart = ({setUsername,setRole,setLoggedIn}) => {
    const navigate=useNavigate()
  const value=localStorage.getItem('Auth');
  const [cartItem, setCartItem] = useState(null); // Set to null initially to check if the cart is empty
  const [quantity, setQuantity] = useState(0); // Holds quantities of items
  const [priceTotal, setPriceTotal] = useState(0); // Holds the total price
  const [addresses,setAddresses]=useState([])
  const [selectedAddress, setSelectedAddress] = useState("");

  // Fetch cart data from localStorage on component mount
  useEffect(() => {
    getCart();
  }, []);
  const getCart=async()=>{
    const { status, data } = await axios.get(`${route()}getsinglecart/${pid}`, { headers: { "Authorization": `Bearer ${value}` } });
    if(status==200){
      setUsername(data.username)
      setRole(data.role);
      setLoggedIn(true);
      setCartItem(data.cart);
      setQuantity(data.cart.quantity);
      setPriceTotal(data.cart.product.price * data.cart.quantity);
    }
  }
  const handleQuantityChange = async(index,id, type) => {
    const {status,data}=await axios.post(`${route()}editquantity`,{id,quantity:quantities[index],type},{headers:{"Authorization":`Bearer ${value}`}});
    if(status==201){
      getCart();
    }
  };
  const handleCart = async() => {
    const { status, data } = await axios.post(`${route()}buynow`, { id: pid }, { headers: { "Authorization": `Bearer ${value}` } });
    if (status === 201) {
        alert(data.msg);
        if(data.msg=="success")
            navigate('/purchasecompleted')
    }
  };

  return (
    <div className="cart-container">
      {cartItem.length === 0 ? (
        <div className="empty-cart">
          <h2>Cart empty..</h2>
          <Link to={'/'}>Go to products</Link>
        </div>
      ) : (
        <div className="cart">
          <div id="carts" className="cart-items">
          
              <div key={index} className="cart-item">
                <div className="image">
                  <Link to={`/product/${cartItem.product._id}`}>
                    <img
                      src={item.product.pimages[0]}
                      alt={item.product.pname}
                      title="View product"
                    />
                  </Link>
                </div>
                <div className="content">
                  <h4>{cartItem.product.pname}</h4>
                  <h3>${cartItem.product.price}</h3>
                  <h5>Quantity</h5>
                  <div className="quantity">
                    <span
                      className="decrease"
                      onClick={() => handleQuantityChange(index, item._id, 'decrease')}
                    >
                      <FiMinus size={24} />
                    </span>
                    <span className="quantity-text">{quantity[index]}</span>
                    <span
                      className="increase"
                      onClick={() => handleQuantityChange(index, item._id, 'increase')}
                    >
                      <FiPlus size={24} />
                    </span>
                  </div>
                </div>
              </div>
            
          </div>
          <div className="cart-summary">
            <div className="summary-details">
              <h2>Payment Details</h2>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItem.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product.pname}</td>
                      <td>{quantity[index]}</td>
                      <td>${item.product.price  * quantity[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="payment-details">
              <div className="details">
              <p className="discount">Discount: 20%</p>
              <p>Delivery Charge: $5</p>
              <p className="total-price">Total Price: ${priceTotal.toFixed(2)}</p>
              <p className="total-amount">Total Amount: ${((priceTotal - (priceTotal * 0.2)) + 5).toFixed(2)}</p>
              </div>
              <div className="payment-button">
                <button onClick={handleCart}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCart;