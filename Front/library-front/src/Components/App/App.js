import React, {useEffect, useState} from 'react';
import '../../Styles/App.css';
import '../../Styles/cart.css';
import Cart from "../Cart";
function App() {

  const url = "https://aslibrarystorage.blob.core.windows.net/bookimages?sp=r&st=2024-04-20T00:09:25Z&se=2024-04-20T08:09:25Z&skoid=8608da46-50a7-44a0-a5ad-9bde91dea05b&sktid=d4227148-4930-4f06-8baa-0845ff57e541&skt=2024-04-20T00:09:25Z&ske=2024-04-20T08:09:25Z&sks=b&skv=2022-11-02&sip=186.155.110.85&sv=2022-11-02&sr=c&sig=6amb94Vr34H5HHBOPt4jSozLEer2fCQUDgK%2BRcplyGo%3D";

  const partes = url.split("?");

  const urlRecurso = partes[0];

  const token = partes[1];



  const [cartItems, setCartItems] = useState([]);

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const closeCartOnOutsideClick = (event) => {
      if (showCart && !event.target.closest('.cart-container') && !event.target.closest('.cart-button')) {
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

  console.log("URL del recurso:", urlRecurso);
  console.log("Token:", token);
  return (
    <div className="body">
      <div className="header">
        <a href="/">Home</a>
        <a href="/">Shop</a>
        <input type="text" placeholder="Search" />
        <a href="/">Sign Up</a>
        <a href="/">Sign In</a>
        <button onClick={toggleCart} className="cart-button">Carrito ({cartItems.length})</button>
      </div>

      {showCart && (
          <div className="cart-container">
            <div className="cart">
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            </div>
          </div>
      )}
      <div className="contenido">
        <section className="product">
          <div className="productcard">
            <img src ={`${urlRecurso}/DraculaBook.webp?${token}`} alt="accesorio" />
            <h3>Accesorios</h3>
            <p>Precio: $50.000</p>
            <button className="button">Dracula</button>
          </div>
          <div className="productcard">
            <img src="../../imgs/LaDivinaComedia.jpg" alt="ropa" />
            <h3>Ropa</h3>
            <p>Precio: $60.000</p>
            <button className="button">La Divina Comedia</button>
          </div>
          <div className="productcard">
            <img src="../../imgs/Dracula.jpg" alt="zapato" />
            <h3>Zapatos</h3>
            <p>Precio: $70.000</p>
            <button className="button">Dracula</button>
          </div>
          <div className="productcard">
            <img src="../../imgs/LaDivinaComedia.jpg" alt="perfume" />
            <h3>Perfume</h3>
            <p>Precio: $80.000</p>
            <button className="button">La Divina Comedia</button>
          </div>
        </section>
      </div>
      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default App;