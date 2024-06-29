import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Main/Home';
import Contact from './Contact/Contact';
import About from './About/About';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Cart from './Main/Cart';

export const store = createContext();

function App() {
  const [token, setToken] = useState(null);

  return (
    <store.Provider value={{ token, setToken }}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </store.Provider>
  );
}

export default App;
