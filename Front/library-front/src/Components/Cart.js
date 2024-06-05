import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CgClose } from "react-icons/cg";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';

function Cart({onCloseCart, cartItems, onAddToCart, onRemoveFromCart, setCartItems}) {
    const token = "?sp=r&st=2024-06-04T16:00:11Z&se=2024-06-13T00:00:11Z&sv=2022-11-02&sr=c&sig=6oolhHY5Gxx3atdaLKxpOB6ui5r8793awbTc4QEjKNA%3D"
    const [customerInfo, setCustomerInfo] = useState({
        customerId: '',
        membershipId: ''
    });
    const [showCart] = useState(true);

    const calculateTotal = () => {
        return Object.values(cartItems).reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = async () => {
        const paymentData = cartItems.map(item => ({
            bookId: item.id,
            quantity: item.quantity,
            customerId: customerInfo.customerId
        }));

        console.log('Payment data:', JSON.stringify(paymentData, null, 2));

        try {
            const response = await axios.post('http://localhost:80/api/buy/book/', paymentData);
            console.log('Response:', response);
            if (response.status === 200) {
                alert('Payment successful');
                setCartItems([]); // Clear the cart after successful payment
            } else {
                alert('Payment failed');
            }
        } catch (error) {
            console.error('Payment error', error);
            console.error('Payment error', error);
            alert('Payment error');
        }
    };


    const incrementQuantity = (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const decrementQuantity = (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    return (
        <div className="cart-overlay">
            {showCart && (
                <div className="cart-container cart">
                    <button className="close-button" onClick={onCloseCart}><CgClose /></button>
                    <h2 className="mb-4">Shopping Cart</h2>
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
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">
                                    <div className="d-flex align-items-center">
                                        <img src={item.urlimage+token} className="img-fluid rounded-3" style={{ width: "120px" }} alt="Book" />
                                        <div className="flex-column ms-4">
                                            <p className="mb-2">{item.name}</p>
                                            <p className="mb-0">Autor: {item.author}</p>
                                        </div>
                                    </div>
                                </th>
                                <td className="align-middle">
                                    <div className="d-flex flex-row">
                                        <button className="btn btn-link" onClick={() => incrementQuantity(item.id)}>
                                            <IoIosArrowUp />
                                        </button>
                                        <input
                                            id={`quantity-${item.id}`}
                                            min="1"
                                            name="quantity"
                                            value={item.quantity}
                                            type="number"
                                            className="form-control form-control-sm"
                                            style={{ width: "50px" }}
                                            readOnly
                                        />
                                        <button className="btn btn-link" onClick={() => decrementQuantity(item.id)}>
                                            <IoIosArrowDown />
                                        </button>
                                    </div>
                                </td>
                                <td className="align-middle">
                                    <p className="mb-0" style={{ fontWeight: 500 }}>${item.price}</p>
                                </td>
                                <td className="align-middle">
                                    <p className="mb-0" style={{ fontWeight: 500 }}>${(item.price * item.quantity).toFixed(2)}</p>
                                </td>
                                <td className="align-middle">
                                    <Button variant="danger" size="sm" onClick={() => onRemoveFromCart(item.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5">
                                <div className="checkout-section">
                                    <h5>Información del Cliente</h5>
                                    <Form>
                                        <Form.Group controlId="customerId">
                                            <Form.Label>ID del Cliente</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese ID del Cliente"
                                                value={customerInfo.customerId}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, customerId: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleCheckout}>
                                            Pagar
                                        </Button>
                                    </Form>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="total-section">
                        <h5>Total: ${calculateTotal().toFixed(2)}</h5>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
