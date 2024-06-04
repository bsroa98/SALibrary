import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from '../LogIn/LogIn';
import Signup from '../SignUp/SignUp';
import Shop from '../Shop/Shop';
import '../../Styles/App.css';
import '../../Styles/cart.css';
import Cart from "../Cart";

const AuthContext = createContext();

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userName, setUserName }}>
            <Router>
                <div className="body">
                    <div className="header">
                        {isAuthenticated && <p>¡Bienvenido {userName} a la mejor tienda de libros!</p>}
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
                    </Routes>
                    <footer>
                        <p></p>
                    </footer>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

function Home() {
    return <div>Welcome to the Home Page!</div>;
}

export { AuthContext };
export default App;
