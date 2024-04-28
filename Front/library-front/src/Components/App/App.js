import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../LogIn/LogIn';
import Signup from '../SignUp/SignUp';
import Shop from '../Shop/Shop';
import '../../Styles/App.css';
import '../../Styles/cart.css';
import Cart from "../Cart";
import { MdOutlineShoppingCart } from "react-icons/md";


function App() {

  return (
  <Router>
    <div className="body">
        <div className="header">
            <Link to="/">Home</Link>
            <Link to="/Shop">Shop</Link>
            <Link to="/LogIn">Sign In</Link>
            <Link to="/SignUp">Sign Up</Link>
        </div>
        <Routes>
            <Route path="/App" element={<App />} />
            <Route path="/LogIn" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/Shop" element={<Shop />} />
        </Routes>
        <footer>
          <p></p>
        </footer>
    </div>
  </Router>
  );
}

export default App;