import React from 'react';
import '../../Styles/LogIn.css';

function LogIn() {
    return (
        <body>
            <div class="container">
                        <form class="header-form">
                            <div class="head">Iniciar Sesión</div>
                            <div class="body">
                                <div class="form-group">
                                    <input type="email" class="form-control" placeholder="Correo" />
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Contraseña*" />
                                </div>
                                <div class="head">
                                    <a href="register.html" class="head">¿No tienes cuenta? Registráte</a>
                                </div>
                                <div class="footer">
                                    <button class="btn btn-primary btn-block">Iniciar Sesión</button>
                                </div>
                            </div>
                        </form>
            </div>
            <footer>
                <div>
                    <p>Copyright <script>document.write(new Date().getFullYear())</script> &copy;</p>
                </div>
            </footer>
        </body>
    );
}

export default LogIn;