import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../Styles/Shop.css';

function Shop({ addToCart }) {
  const url =
    'https://aslibrarystorage.blob.core.windows.net/bookimages?sp=r&st=2024-04-22T20:50:55Z&se=2024-04-29T04:57:55Z&skoid=8608da46-50a7-44a0-a5ad-9bde91dea05b&sktid=d4227148-4930-4f06-8baa-0845ff57e541&skt=2024-04-22T20:50:55Z&ske=2024-04-29T04:57:55Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=c&sig=7K901C3MdIgfYpWkZtsRpte6EHep%2Fqp%2FpoBr%2Byp5nsg%3D';
  const partes = url.split('?');
  const urlRecurso = partes[0];
  const token = partes[1];

  const [showDetails, setShowDetails] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

    const handleMouseEnter = (book) => {
      setCurrentBook(book);
      setShowDetails(true);
    };

    const handleMouseLeave = () => {
      setShowDetails(false);
    };

  console.log('URL del recurso:', urlRecurso);
  console.log('Token:', token);

  return (
      <div className="body">
        <div className="contenido">
          <section className="product">
            <div className="productcard" onMouseEnter={() => handleMouseEnter({ title: 'Dracula', author: 'Bram Stoker', category: 'Horror', available: 5 })} onMouseLeave={handleMouseLeave}>
                <img src={`${urlRecurso}/DraculaBook.webp?${token}`} alt="DraculaBook" />
                <h3>Dracula</h3>
                <p>Precio: $50.000</p>
                <button className="button">Comprar</button>
                <button className="button" onClick={() => addToCart({ title: 'Dracula', price: 50000 })}>
                    Añadir al carrito
                </button>
            </div>
            <div className="productcard" onMouseEnter={() => handleMouseEnter({ title: 'Habitos Atomicos', author: 'James Clear', category: 'Autoayuda', available: 3 })} onMouseLeave={handleMouseLeave}>
              <img src={`${urlRecurso}/HabitosAtomicosBook.jpg?${token}`} alt="HabitosAtomicosBook" />
              <h3>Habitos Atomicos</h3>
              <p>Precio: $60.000</p>
              <button className="button">Comprar</button>
              <button className="button" onClick={() => addToCart({ title: 'Habitos Atomicos', price: 60000 })}>
                Añadir al carrito
              </button>
            </div>
            <div className="productcard" onMouseEnter={() => handleMouseEnter({ title: 'Orgullo y Prejuicio', author: 'Jane Austen', category: 'Ficción', available: 3 })} onMouseLeave={handleMouseLeave}>
              <img src={`${urlRecurso}/OrgYPrejBook.webp?${token}`} alt="OrgYPrej" />
              <h3>Orgullo y Prejuicio</h3>
              <p>Precio: $70.000</p>
              <button className="button">Comprar</button>
              <button className="button" onClick={() => addToCart({ title: 'Orgullo y Prejuicio', price: 70000 })}>
                Añadir al carrito
              </button>
            </div>
            <div className="productcard"  onMouseEnter={() => handleMouseEnter({ title: 'Arte de la Guerra', author: 'Sun Tzu', category: 'Tratado', available: 3 })} onMouseLeave={handleMouseLeave}>
              <img src={`${urlRecurso}/arte de la guerra.jpeg?${token}`} alt="artedelaguerra" />
              <h3>Arte de la Guerra</h3>
              <p>Precio: $80.000</p>
              <button className="button">Comprar</button>
              <button className="button" onClick={() => addToCart({ title: 'Arte de la Guerra', price: 80000 })}>
                Añadir al carrito
              </button>
            </div>
          </section>
        </div>
        {showDetails && currentBook && (
                <div className="book-details">
                    <h2>{currentBook.title}</h2>
                    <p>Autor: {currentBook.author}</p>
                    <p>Categoría/Género: {currentBook.category}</p>
                    <p>Cantidad de libros disponibles: {currentBook.available}</p>
                </div>
        )}
        <footer>
          <p></p>
        </footer>
      </div>
  );
}

export default Shop;