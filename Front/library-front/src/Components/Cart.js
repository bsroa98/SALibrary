import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CgClose } from "react-icons/cg";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function Cart({onCloseCart,cartItems,onAddToCart,onRemoveFromCart,setCartItems}) {
    const [customerInfo, setCustomerInfo] = useState({
        customerId: '',
        membershipId: ''
    });
    const [showCart] = useState(true); // Estado para mostrar/ocultar el carrito





    const calculateTotal = () => {
        return Object.values(cartItems).reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        console.log('Checkout');
        console.log('Customer ID:', customerInfo.customerId);
        console.log('Membership ID:', customerInfo.membershipId);
        console.log('Cart Items:', Object.values(cartItems));
        console.log('Total:', calculateTotal());
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
            {showCart && ( // Mostrar el carrito solo si showCart es true
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
                                        <img src={item.url} className="img-fluid rounded-3" style={{ width: "120px" }} alt="Book" />
                                        <div className="flex-column ms-4">
                                            <p className="mb-2">{item.name}</p>
                                            <p className="mb-0">Autor: {item.author}</p>
                                        </div>
                                    </div>
                                </th>
                                <td className="align-middle">
                                    <div className="d-flex flex-row">
                                        <Button variant="link" className="px-2" onClick={() => onRemoveFromCart(item.id)}>
                                            <i className="fas fa-minus"></i>
                                        </Button>

                                        <button
                                            className="btn btn-link"
                                            onClick={() => incrementQuantity(item.id)}
                                        >
                                            <i className="fas fa-minus"></i>
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
                                        <button
                                            className="btn btn-link"
                                            onClick={() => decrementQuantity(item.id)}
                                        >
                                            <i className="fas fa-minus"></i>
                                            <IoIosArrowDown />
                                        </button>

                                        <Button variant="link" className="px-2" onClick={() => onAddToCart(item)}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
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
                        <tr><div className="checkout-section">

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

                                <Form.Group controlId="membershipId">
                                    <Form.Label>ID de Membresía</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese ID de Membresía"
                                        value={customerInfo.membershipId}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, membershipId: e.target.value })}
                                    />
                                </Form.Group>

                                <Button variant="primary" onClick={handleCheckout}>
                                    Pagar
                                </Button>
                            </Form>
                        </div></tr>
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
