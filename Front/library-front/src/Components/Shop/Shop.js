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



function Shop() {
  const url = "https://aslibrarystorage.blob.core.windows.net/bookimages?sp=r&st=2024-04-22T20:50:55Z&se=2024-04-29T04:57:55Z&skoid=8608da46-50a7-44a0-a5ad-9bde91dea05b&sktid=d4227148-4930-4f06-8baa-0845ff57e541&skt=2024-04-22T20:50:55Z&ske=2024-04-29T04:57:55Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=c&sig=7K901C3MdIgfYpWkZtsRpte6EHep%2Fqp%2FpoBr%2Byp5nsg%3D";
  const partes = url.split("?");
  const urlRecurso = partes[0];
  const token = partes[1];

  const allProducts = [{
    id: 3,
    name: "Dracula",
    author: "Bram Stoker",
    price: 70000,
    url: `${urlRecurso}/DraculaBook.webp?${token}`,
    quantity: 1,
    isbn : "9789583054891",
    genre: "Terror",
    publicationDate: "1897-05-26"
  },
    {
      id: 1,
      name: "HabitosAtomicos",
      author: "James Clear",
      price: 100000,
      url: `${urlRecurso}/HabitosAtomicosBook.jpg?${token}`,
      quantity: 1,
      isbn : "9789584277954",
      genre: "Autoayuda",
      publicationDate: "2018-10-16"
    },
    {
      id: 2,
      name: "Orgullo y Prejuicio",
      author: "Jane Austen",
      price: 80000,
      url: `${urlRecurso}/OrgYPrejBook.webp?${token}`,
      quantity: 1,
      isbn : "9789585285330",
      genre: "Clásico",
      publicationDate: "1813-01-28"
    },
    {
      id: 5,
      name: "Arte de la Guerra",
      author: "Sun Tzu",
      price: 70000,
      url: `${urlRecurso}/arte de la guerra.jpeg?${token}`,
      quantity: 1,
      isbn : "9789583054",
      genre: "Estrategia",
      publicationDate: "500 AC"
    }]

  const [cartItems, setCartItems] = useState([]);
  const [productItems, setProductItems] = useState([...allProducts]);
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

    const searchResults = allProducts.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm);
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
        if (filters.isbn && !product.isbn.toLowerCase().includes(filters.isbn.toLowerCase())) {
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
              type="number"
              name="isbn"
              placeholder="ISBN"
              value={filters.isbn}
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
            {productItems.map((item) => (
                <div className="productcard" key={item.id}>
                    <img src={item.url} alt="accesorio"/>
                    <h3>{item.name}</h3>
                    <p>Price: {item.price}</p>
                    <p>Author: {item.author}</p>
                    <p>Gender: {item.genre}</p>
                    <button className="btn btn-primary btn-block" onClick={() => addToCart(item)}>Add to Cart</button>
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