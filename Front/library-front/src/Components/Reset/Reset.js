import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App/App';
import '../../Styles/Reset.css';

function Reset() {
    const { setIsAuthenticated, setUserName, setUserId } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.put('http://localhost:80/api/customers/reset-password', {
                email,
                newPassword,
                confirmPassword
            });
            console.log('Cambio de contraseña exitoso:', response.data);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/LogIn');
            }, 2000);
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setError('Error al cambiar la contraseña. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="contentlogin">
            <div className="inicio">Cambia tu Contraseña</div>
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
                                placeholder="Nueva Contraseña*"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control password-input"
                                placeholder="Confirmar Nueva Contraseña*"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <div className="buttonLogIn">
                        <button className="btn btn-primary btn-block">Cambiar Contraseña</button>
                    </div>
                </form>
                {success && <p className="success-message">Cambio de contraseña exitoso. Redirigiendo...</p>}
            </main>
            <div className="copyright">
                Copyright {new Date().getFullYear()} &copy;
            </div>
        </div>
    );
}

export default Reset;
