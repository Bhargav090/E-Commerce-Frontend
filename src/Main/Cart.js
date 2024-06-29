import React, { useState, useEffect, useContext, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import url from '../url';
import Cartcard from './Cartcard';
import './main.css';
import { store } from '../App';

const Cart = () => {
  const [cartproducts, setCartproducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const { token } = useContext(store); 

  const fetchCartItems = useCallback(async () => {
    if (!token) {
      console.error("Token is missing!");
      setStatus('error');
      return;
    }

    try {
      const response = await axios.get(url + '/cartitems', {
        headers: {
          'Bhargav': token // Include the token in the request headers
        }
      });
      console.log("Cart Items Response: ", response.data); // Debugging: Log response data
      setCartproducts(response.data);
      setStatus('loaded');
    } catch (err) {
      console.error("Error fetching cart items: ", err);
      setStatus('error');
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCartItems();
    }
  }, [token, fetchCartItems]);

  const totalAmount = () => {
    return cartproducts.reduce((total, item) => total + item.P_Cost * item.Qty, 0);
  };

  return (
    <div>
      <div className='navbar'>
        <NavLink to='/home' className='homecs'>Home</NavLink>
        <NavLink to='/cart' className='cart'>Cart</NavLink>
        <NavLink to='/about' className='aboutcs'>About</NavLink>
        <NavLink to='/contact' className='contactcs'>Contact</NavLink>
      </div>
      {status === 'loading' ? (
        <center>Loading...</center>
      ) : status === 'error' ? (
        <div>Error loading cart items. Please try again later.</div>
      ) : (
        <>
          <h2 className='cart-h2'>Your Cart Items:</h2>
          <h2 className='cart-h2'>Total Cart Value: ₹{totalAmount()}</h2>
          <div className="product-list">
            {cartproducts.map((cartproduct) => (
              <Cartcard
                key={cartproduct._id} // Added key prop for unique identification
                id={cartproduct.P_Id}
                image={cartproduct.P_Image}
                name={cartproduct.P_Name}
                cost={cartproduct.P_Cost}
                qty={cartproduct.Qty}
              />
            ))}
          </div>
          <center>
            <div className='buy-div'>
              <h2>Total Amount : ₹{totalAmount()}</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className='buy-btn'>Buy Now</button>
            </div>
          </center>
        </>
      )}
    </div>
  );
};

export default Cart;
