import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importa Routes
import Login from '../LogIn/LogIn';
import Signup from '../SignUp/SignUp';
import Shop from '../Shop/Shop';
import '../../Styles/App.css';
import '../../Styles/cart.css';
import Cart from '../Cart';

function App() {
  const url =
    'https://aslibrarystorage.blob.core.windows.net/bookimages?sp=r&st=2024-04-22T20:50:55Z&se=2024-04-29T04:57:55Z&skoid=8608da46-50a7-44a0-a5ad-9bde91dea05b&sktid=d4227148-4930-4f06-8baa-0845ff57e541&skt=2024-04-22T20:50:55Z&ske=2024-04-29T04:57:55Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=c&sig=7K901C3MdIgfYpWkZtsRpte6EHep%2Fqp%2FpoBr%2Byp5nsg%3D';
  const partes = url.split('?');
  const urlRecurso = partes[0];

  const token = partes[1];



  const [cartItems, setCartItems] = useState([]);

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const closeCartOnOutsideClick = (event) => {
      if (
        showCart &&
        !event.target.closest('.cart-container') &&
        !event.target.closest('.cart-button')
      ) {
        setShowCart(false);
      }
    };

    document.addEventListener('click', closeCartOnOutsideClick);

    return () => {
      document.removeEventListener('click', closeCartOnOutsideClick);
    };
  }, [showCart]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  console.log('URL del recurso:', urlRecurso);
  console.log('Token:', token);

  return (
    <Router>
      <div className="body">
        <div className="header">
          <Link to="/">Home</Link>
          <Link to="/Shop">Shop</Link>
          <input type="text" placeholder="Search" />
          <Link to="/LogIn">Sign In</Link>
          <Link to="/SignUp">Sign Up</Link>
          <button onClick={toggleCart} className="cart-button">
            Carrito ({cartItems.length})
          </button>
        </div>
        <Routes>
          <Route path="/LogIn" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/Shop" element={<Shop addToCart={addToCart} />} />
        </Routes>

        {showCart && (
          <div className="cart-container">
            <div className="cart">
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;