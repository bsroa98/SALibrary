import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App/App';
import '../../Styles/LogIn.css';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const { setIsAuthenticated, setUserName } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:80/api/customers/login', {
                email,
                password
            });
            console.log('Inicio de sesión exitoso:', response.data);
            setSuccess(true);
            setIsAuthenticated(true);
            setUserName(response.data.name); // Asumimos que el nombre del usuario viene en response.data.name
            setTimeout(() => {
                setSuccess(false);
                navigate('/Shop');
            }, 2000); // Espera 2 segundos antes de redirigir
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
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="buttonLogIn">
                        <button className="btn btn-primary btn-block">Iniciar Sesión</button>
                    </div>
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
