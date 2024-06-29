import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import Card from './Card';
import './main.css';
import axios from 'axios';
import url from '../url';
import { store } from '../App'; // Import your store context

const Home = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const { token } = useContext(store); // Retrieve token from context
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + '/home', {
          headers: {
            'Bhargav': {token}
          }
        });
        setProducts(response.data);
        setStatus('loaded');
      } catch (error) {
        console.error("Error fetching products: ", error);
        setStatus('error');
      }
    };

    if (token) {
      try {
        // Decode the token to get the username
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log("Decoded Token: ", decodedToken); // Log the decoded token
        if (decodedToken.user && decodedToken.user.username) {
          setUsername(decodedToken.user.username);
          setUserId(decodedToken.user._id)
          console.log(username)
        } else {
          console.error("Username not found in token");
        }
      } catch (error) {
        console.error("Error decoding token: ", error);
      }

      fetchData();
    }
  }, [token]);

  console.log("Token: ", token); // Log the token

  if (!token) {
    return <Navigate to='/' />;
  }

  if (status === 'loading') {
    return <center>Loading...</center>;
  }

  if (status === 'error') {
    return <div>Error loading products. Please try again later.</div>;
  }

  return (
    <div>
      <div className="navbar">
        <h2 className='homeh1'>Welcome : {username}</h2>
        <NavLink to="/home" className="homecs">
          Home
        </NavLink>
        <NavLink to="/cart" className="cart">
          Cart
        </NavLink>
        <NavLink to="/about" className="aboutcs">
          About
        </NavLink>
        <NavLink to="/contact" className="contactcs">
          Contact
        </NavLink>
      </div>
      <div>
        <div className="product-list">
          {products.map((product) => (
            <Card
              key={product.P_Id} // Added key prop for unique identification
              id={product.P_Id}
              image={product.P_Image}
              name={product.P_Name}
              description={product.P_Desc}
              cost={product.P_Cost}
              userId={userId} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
