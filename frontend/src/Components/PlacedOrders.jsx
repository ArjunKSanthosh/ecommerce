import React, { useState, useEffect } from "react";
import axios from "axios";
import route from "./route";
import { Link, useNavigate } from "react-router-dom";
import '../css/placedorder.scss'

const PlacedOrders = ({ setUsername, setRole, setLoggedIn }) => {
  const value = localStorage.getItem("Auth");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { status, data } = await axios.get(`${route()}ordersplaced`, {
        headers: { Authorization: `Bearer ${value}` },
      });
      if (status) {
        setUsername(data.username);
        setRole(data.role);
        setLoggedIn(true);
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const confirmShipping = async (oid) => {
    console.log(oid);

    const { status, data } = await axios.put(
      `${route()}confirmorder`,
      { oid },
      { headers: { Authorization: `Bearer ${value}` } }
    );
    if (status === 201) {
      alert(data.msg);
      if (data.msg === "success") alert("Shipping started");
      navigate("/company");
    }
  };

  return (
    <div className="placed-orders-container">
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="placed-orders-card">
            {/* Product Images */}
            <div className="placed-orders-image-gallery">
              <img
                src={order.product.pimages[0]}
                alt={`Product Image`}
                className="placed-orders-product-image"
              />
            </div>
            <div className="placed-orders-bottom">
              <div className="placed-orders-left">
                <div className="placed-orders-product-info">
                  <span className="placed-orders-product-category">{order.email}</span>
                </div>

                <div className="placed-orders-product-info">
                  <span className="placed-orders-product-name">{order.sname}</span>
                </div>

                <div className="placed-orders-product-info">
                  <span className="placed-orders-product-price">
                    {order.product.pname.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                className="placed-orders-edit-btn"
                onClick={() => {
                  confirmShipping(order._id);
                }}
              >
                Add to shipping
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No orders placed!!</p>
      )}
    </div>
  );
};

export default PlacedOrders;
