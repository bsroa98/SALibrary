import React from 'react';
import './App.css';

function App() {
  return (
    <div className="body">
      <div className="header">
        <a href="/">Home</a>
        <a href="/">Shop</a>
        <input type="text" placeholder="Search" />
        <a href="/">Sign Up</a>
        <a href="/">Sign In</a>
      </div>

      <div className="contenido">
        <section className="product">
          <div className="productcard">
            <img src="../imgs/Dracula.jpg" alt="accesorio" />
            <h3>Accesorios</h3>
            <p>Precio: $50.000</p>
            <button className="button">Dracula</button>
          </div>
          <div className="productcard">
            <img src="../imgs/LaDivinaComedia.jpg" alt="ropa" />
            <h3>Ropa</h3>
            <p>Precio: $60.000</p>
            <button className="button">La Divina Comedia</button>
          </div>
          <div className="productcard">
            <img src="../imgs/Dracula.jpg" alt="zapato" />
            <h3>Zapatos</h3>
            <p>Precio: $70.000</p>
            <button className="button">Dracula</button>
          </div>
          <div className="productcard">
            <img src="../imgs/LaDivinaComedia.jpg" alt="perfume" />
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