import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [membershipId, setMembershipId] = useState('');

    const addToCart = (product) => {
        const existingIndex = cartItems.findIndex((item) => item.id === product.id);

        if (existingIndex !== -1) {
            const updatedCart = [...cartItems];
            updatedCart[existingIndex].quantity += 1;
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        // Implement your checkout logic here
        console.log('Checkout');
        console.log('Customer ID:', customerId);
        console.log('Membership ID:', membershipId);
        console.log('Cart Items:', cartItems);
        console.log('Total:', calculateTotal());
    };

    return (
        <div className="cart-overlay">
            <div className="cart-container">
                <button className="close-button" onClick={() => setCartItems([])}>Cerrar</button>
                <h2 className="mb-4">Carrito de Compras</h2>

                <table className="table">
                    <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="outline-primary" size="sm" onClick={() => addToCart(item)}>+</Button>{' '}
                                {item.quantity}{' '}
                                <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(index)}>-</Button>
                            </td>
                            <td>${item.price}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => removeFromCart(index)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="total-section">
                    <h5>Total: ${calculateTotal().toFixed(2)}</h5>
                </div>

                <div className="checkout-section">
                    <h5>Información del Cliente</h5>
                    <Form>
                        <Form.Group controlId="customerId">
                            <Form.Label>ID del Cliente</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese ID del Cliente"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="membershipId">
                            <Form.Label>ID de Membresía</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese ID de Membresía"
                                value={membershipId}
                                onChange={(e) => setMembershipId(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleCheckout}>
                            Pagar
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Cart;
