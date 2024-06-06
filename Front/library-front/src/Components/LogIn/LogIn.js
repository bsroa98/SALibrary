import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App/App';
import '../../Styles/LogIn.css';

function LogIn() {
    const { setIsAuthenticated, setUserName, setUserId, setMemberCard } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
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
            const userData = response.data;
            setUserId(userData.id);
            setUserName(userData.name);
            setIsAuthenticated(true);

            if (userData.idMemberCard) {
                const cardResponse = await axios.get(`http://localhost:80/api/membercard/customer/${userData.id}`);
                setMemberCard(cardResponse.data);
            } else {
                setMemberCard(null);
            }

            navigate('/Shop');
        } catch (error) {
            console.error('Error during login:', error);
            setAttempts(attempts + 1);

            if (attempts >= 2) {
                try {
                    await axios.delete(`http://localhost:80/api/customers/delete`, { data: { email } });
                    setError('Usuario eliminado por múltiples intentos fallidos.');
                } catch (deleteError) {
                    setError('Error eliminando el usuario: ' + deleteError.message);
                }
            } else {
                setError(`Inicio de sesión fallido. Intentos restantes: ${2 - attempts}`);
            }
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
                    <a href="/Reset">¿Olvidaste tu contraseña?</a>
                    <div className="buttonLogIn">
                        <button className="btn btn-primary btn-block">Iniciar Sesión</button>
                    </div>
                    <a href="/SignUp">No tienes cuenta Registrate</a>
                </form>
            </main>
            <div className="copyright">
                Copyright {new Date().getFullYear()} &copy;
            </div>
        </div>
    );
}

export default LogIn;
