import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Login from '../LogIn/LogIn';
import Signup from '../SignUp/SignUp';
import Shop from '../Shop/Shop';
import '../../Styles/App.css';
import '../../Styles/cart.css';
import Cart from "../Cart";
import Reset from '../Reset/Reset';
import header from '../../imgs/header.jpg';

const AuthContext = createContext();

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);
    const [memberCard, setMemberCard] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [rechargeValue, setRechargeValue] = useState('');

    useEffect(() => {
        if (userId) {
            fetchMemberCard();
        }
    }, [userId]);

    const generateMemberCard = async () => {
        if (!userId) {
            console.error("userId is null or undefined");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:80/api/membercard/generate/${userId}`, userId);
            const newMemberCard = response.data;
            await axios.put(`http://localhost:80/api/customers/${userId}/update-member-card`, { idMemberCard: newMemberCard.id });
            setMemberCard(newMemberCard);
        } catch (error) {
            console.error("Error generating member card", error);
        }
    };

    const fetchMemberCard = async () => {
        if (!userId) {
            console.error("User ID is not available");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:80/api/membercard/customer/${userId}`);
            setMemberCard(response.data);
            setShowPopup(true);
        } catch (error) {
            console.error("Error fetching member card", error);
        }
    };

    const handleRecharge = async () => {
        if (!rechargeValue || isNaN(rechargeValue)) {
            console.error("Invalid recharge value");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:80/api/membercard/customer/${userId}/memberCar/${memberCard.id}`, {
                rechargeValue: parseInt(rechargeValue, 10)
            });
            setMemberCard({ ...memberCard, balance: memberCard.balance + parseInt(rechargeValue, 10) });
            setRechargeValue('');
        } catch (error) {
            console.error("Error recharging balance", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userName, setUserName, userId, setUserId, memberCard, setMemberCard }}>
            <Router>
                <div className="body">
                    <div className="header">
                        {isAuthenticated && (
                            <div className="button-container">
                                <p>¡Bienvenido {userName} a la mejor tienda de libros!</p>
                                {memberCard ? (
                                    <button className="btn btn-primary btn-block" onClick={() => setShowPopup(true)}>Ver Tarjeta de Membresía</button>
                                ) : (
                                    <button className="btn btn-primary btn-block" onClick={generateMemberCard}>Generar Tarjeta de Membresía</button>
                                )}
                            </div>
                        )}
                        <Link to="/">Home</Link>
                        <Link to="/Shop" className="btn-link">Shop</Link>
                        {!isAuthenticated && <Link to="/LogIn">Sign In</Link>}
                        {!isAuthenticated && <Link to="/SignUp">Sign Up</Link>}
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/LogIn" element={<Login />} />
                        <Route path="/SignUp" element={<Signup />} />
                        <Route path="/Shop" element={<Shop />} />
                        <Route path="/Cart" element={<Cart />} />
                        <Route path="/Reset" element={<Reset />} />
                    </Routes>
                    <footer>
                        <p></p>
                    </footer>
                </div>
            </Router>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Tarjeta de Membresía</h2>
                        <p>ID de Membresía: {memberCard.id}</p>
                        <p>Número de Tarjeta: {memberCard.cardNumber}</p>
                        <p>Saldo: ${memberCard.balance}</p>
                        <div className="recharge-container">
                        <h6>*Valores entre COP 50000 y COP 200000</h6>
                            <input
                                type="number"
                                placeholder="Valor de recarga"
                                value={rechargeValue}
                                onChange={(e) => setRechargeValue(e.target.value)}
                            />
                            <button onClick={handleRecharge}>Recargar</button>
                        </div>
                        <button onClick={() => setShowPopup(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
}

function Home() {
    return <img src={header} alt="Home" className="home-image" />;
}

export { AuthContext };
export default App;
