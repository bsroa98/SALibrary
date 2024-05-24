import React from 'react';
import '../../Styles/LogIn.css';

function LogIn() {
    return (
        <div className="contentlogin">
            <div className="inicio">Iniciar Sesión</div>
            <main className="body">
                <form className="login-form">
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Correo" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Contraseña*" />
                    </div>
                    <div className="register-link">
                        <div className="head">¿No tienes cuenta? <span className="register-text">Regístrate</span></div>
                    </div>
                    <div className="buttonLogIn">
                        <button className="btn btn-primary btn-block">Iniciar Sesión</button>
                    </div>
                </form>
            </main>
            <div className="copyright">
                Copyright {new Date().getFullYear()} &copy;
            </div>
        </div>
    );
}

export default LogIn;