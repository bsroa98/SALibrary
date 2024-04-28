import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../LogIn/LogIn';
import Signup from '../SignUp/SignUp';
import '../../Styles/cart.css';
import Cart from "../Cart";
import { MdOutlineShoppingCart } from "react-icons/md";
import '../../Styles/Shop.css';

function Shop() {
  const url = "https://aslibrarystorage.blob.core.windows.net/bookimages?sp=r&st=2024-04-22T20:50:55Z&se=2024-04-29T04:57:55Z&skoid=8608da46-50a7-44a0-a5ad-9bde91dea05b&sktid=d4227148-4930-4f06-8baa-0845ff57e541&skt=2024-04-22T20:50:55Z&ske=2024-04-29T04:57:55Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=c&sig=7K901C3MdIgfYpWkZtsRpte6EHep%2Fqp%2FpoBr%2Byp5nsg%3D";
  const partes = url.split("?");
  const urlRecurso = partes[0];
  const token = partes[1];


  const [cartItems, setCartItems] = useState([]);
  const [productItems, setProductItems] = useState([
  {
    id: 3,
    name: "Dracula",
    author: "Bram Stoker",
    price: 70000,
    url: `${urlRecurso}/DraculaBook.webp?${token}`,
    quantity: 1
  },
  {
    id: 1,
    name: "HabitosAtomicos",
    author: "James Clear",
    price: 100000,
    url: `${urlRecurso}/HabitosAtomicosBook.jpg?${token}`,
    quantity: 1
  },
  {
    id: 2,
    name: "Orgullo y Prejuicio",
    author: "Jane Austen",
    price: 80000,
    url: `${urlRecurso}/OrgYPrejBook.webp?${token}`,
    quantity: 1
  },
  {
    id: 5,
    name: "Arte de la Guerra",
    author: "Sun Tzu",
    price: 70000,
    url: `${urlRecurso}/arte de la guerra.jpeg?${token}`,
    quantity: 1
  }]);
  const [showCart, setShowCart] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = () => {
    const searchTerm = searchInput.toLowerCase();

    const searchResults = productItems.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm);
      const isbnMatch = item.isbn && item.isbn.toLowerCase().includes(searchTerm);
      const authorMatch = item.author.toLowerCase().includes(searchTerm);
      return nameMatch || isbnMatch || authorMatch;
    });

    setSearchHistory((prevHistory) => [...prevHistory, searchInput]);
    setProductItems(searchResults);
    };



  const addToCart = (product) => {
    if (cartItems.find((p)=>p.id===product.id)==null){
      setCartItems([...cartItems, product]);
    }
    else {
      product.quantity +=1;
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((p)=>p.id!==productId)
    setCartItems(updatedCart);
  };
  const toggleCart = () => {
    setShowCart(!showCart);
  };


  return (
    <div className="body">
    <section className="shop-section">
        <div className="header-search">
        <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
        />
        <button type="button" className="btn btn-primary btn-block" onClick={handleSearch}>
            Buscar
        </button>
        </div>
        <div className="header-shop">
            <button type="button" className="btn btn-light" onClick={toggleCart}>
                <MdOutlineShoppingCart />
                <span className="cart-count">{cartItems.length}</span>
            </button>
        </div>
    </section>

    <Routes>
        <Route path="/Shop" element={<Shop addToCart={addToCart} />} />
    </Routes>

        {showCart && (
            <div className="cart-overlay">
              <Cart
                  cartItems={cartItems}
                  onAddToCart={addToCart}
                  setShowCart={setShowCart}
                  setCartItems={setCartItems}
                  onCloseCart= {toggleCart}
                  onRemoveFromCart={removeFromCart}
              />
            </div>
        )}

        <div className="contenido">
          <section className="product">
            {productItems.map((item) => (
                <div className="productcard" key={item.id}>
                    <img src={item.url} alt="accesorio"/>
                    <h3>{item.name}</h3>
                    <p>Precio: {item.price}</p>
                    <button className="btn btn-primary btn-block" onClick={() => addToCart(item)}>Añadir al carrito</button>
                </div>
            ))}
          </section>
        </div>
        <footer>
          <p></p>
        </footer>
    </div>
  );
}

export default Shop;