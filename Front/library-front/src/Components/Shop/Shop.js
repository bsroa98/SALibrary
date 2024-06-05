import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../LogIn/LogIn';
import Signup from '../SignUp/SignUp';
import '../../Styles/cart.css';
import Cart from "../Cart";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import '../../Styles/Shop.css';
import axios from "axios";

function Shop() {
  const token = "?sp=r&st=2024-06-04T16:00:11Z&se=2024-06-13T00:00:11Z&sv=2022-11-02&sr=c&sig=6oolhHY5Gxx3atdaLKxpOB6ui5r8793awbTc4QEjKNA%3D"

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('http://localhost/api/book');
        setBooks(response.data);
        console.log(books)
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    }

    fetchBooks();


  }, []);
  useEffect(() => {

    setProductItems(books);
  }, [books]);



  const [cartItems, setCartItems] = useState([]);
  const [productItems, setProductItems] = useState([...books]);
  const [showCart, setShowCart] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    priceMin: '',
    priceMax: '',
    author: '',
    publicationDate: '',
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    const searchTerm = searchInput.toLowerCase();

    const searchResults = books.filter((item) => {
      const nameMatch = item.title.toLowerCase().includes(searchTerm);
      const isbnMatch = item.isbn && item.isbn.toLowerCase().includes(searchTerm);
      const authorMatch = item.author.toLowerCase().includes(searchTerm);
      return nameMatch || isbnMatch || authorMatch;
    });

    setSearchHistory((prevHistory) => [...prevHistory, searchInput]);
    applyFilters(searchResults);
  };

  const applyFilters = (products) => {
    if (Array.isArray(products)) {
      let filteredProducts = products.filter((product) => {
        let match = true;
        if (filters.genre && product.genre.toLowerCase() !== filters.genre.toLowerCase()) {
          match = false;
        }
        if (filters.priceMin && parseInt(product.price) < parseInt(filters.priceMin)) {
          match = false;
        }
        if (filters.priceMax && parseInt(product.price) > parseInt(filters.priceMax)) {
          match = false;
        }
        if (filters.author && !product.author.toLowerCase().includes(filters.author.toLowerCase())) {
          match = false;
        }
        if (filters.publicationDate && !product.publicationDate.toLowerCase().includes(filters.publicationDate.toLowerCase())) {
          match = false;
        }
        return match;
      });
      setProductItems(filteredProducts);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };


  const addToCart = (product) => {
    const existingProduct = cartItems.find((p) => p.id === product.id);
    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementa su cantidad
      const updatedCartItems = cartItems.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCartItems(updatedCartItems);
    } else {
      // Si el producto no está en el carrito, añádelo con cantidad 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((p)=>p.id!==productId)
    setCartItems(updatedCart);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  function toggleFilter() {

  }


  return (
    <div className="body">
    <section className="shop-section">
        <div className="header-search">
        <button type="button" className="btn btn-light btn-block p-2" onClick={toggleFilterPanel}><IoFilter /></button>
        <input
            className="form-control w-50 form-control-lg rounded"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
        />
        <button type="button" className="btn btn-primary btn-block p-2" onClick={handleSearch}>
          <FaSearch />
        </button>
        {showFilterPanel &&
          <div className="filters-panel">
            <input
              type="text"
              name="genre"
              placeholder="Gender"
              value={filters.genre}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="priceMin"
              placeholder="Min Price"
              value={filters.priceMin}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="priceMax"
              placeholder="Max Price"
              value={filters.priceMax}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={filters.author}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="publicationDate"
              placeholder="Publication Date"
              value={filters.publicationDate}
              onChange={handleFilterChange}
            />
          </div>
        }
        </div>
        <div className="header-shop">
            <button type="button" className="btn btn-light " onClick={toggleCart}>
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
            {productItems.map((books) => (
                <div className="productcard" key={books.id}>
                    <img src={books.urlimage+token} alt="accesorio"/>
                    <h3>{books.title}</h3>
                    <p>Price: $ {books.price} COP</p>
                    <p>Author: {books.author}</p>
                    <p>Gender: {books.genre}</p>
                    <button className="btn btn-primary btn-block" onClick={() => addToCart(books)}>Add to Cart</button>
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