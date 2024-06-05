import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App/App';
import '../../Styles/LogIn.css';

function LogIn() {
    const { setIsAuthenticated, setUserName, setUserId } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:80/api/customers/login', {
                email,
                password
            });
            console.log('Inicio de sesión exitoso:', response.data);
            const { id, name } = response.data;
            console.log('userId:', id);
            setSuccess(true);
            setIsAuthenticated(true);
            setUserName(name);
            setUserId(id);
            setTimeout(() => {
                setSuccess(false);
                navigate('/Shop');
            }, 2000);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Credenciales incorrectas o error del servidor');
        }
    };

    return (
        <div className="contentlogin">
            <div className="inicio">Iniciar Sesión</div>
            <main className="body">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control password-input"
                                placeholder="Contraseña*"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password-button"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <a href="/">¿Olvidaste tu contraseña?</a>
                    <div className="buttonLogIn">
                        <button className="btn btn-primary btn-block">Iniciar Sesión</button>
                    </div>
                    <a href="/SignUp">Ya tienes cuenta Registrate</a>
                </form>
                {success && <p className="success-message">Inicio de sesión exitoso. Redirigiendo...</p>}
            </main>
            <div className="copyright">
                Copyright {new Date().getFullYear()} &copy;
            </div>
        </div>
    );
}

export default LogIn;
