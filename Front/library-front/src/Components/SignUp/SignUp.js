import React, { useState } from 'react';
import '../../Styles/SignUp.css';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        emailConfirm: '',
        city: '',
        country: '',
        gender: '',
        birthdate: '',
        profession: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (formData.email !== formData.emailConfirm) {
        errors.emailConfirm = 'Los correos no coinciden';
        isValid = false;
    }

    if (formData.profession !== formData.profession.trim()) {
        errors.profession = 'No se permiten espacios al principio o al final';
        isValid = false;
    }

    for (const key in formData) {
        if (formData[key].trim() === '') {
            errors[key] = 'Este campo es obligatorio';
            isValid = false;
        }
    }

    console.log('Form Errors:', errors);
    console.log('Is Form Valid:', isValid);

    setFormErrors(errors);
    setIsFormValid(isValid);

    if (isValid) {
        console.log('Formulario válido, enviando...');
    }
};

    return (
        <body>
            <div className="container">
                <form id="registerForm">
                    <div className="head">¿Qué esperas para registrarte y empezar a leer tus libros favoritos?</div>
                    <br/>
                    <p className="subtitle">*Todos los campos son obligatorios</p>
                    <div className="body">
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-control ${formErrors.name ? 'error' : ''}`}
                                placeholder="Nombres"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-control ${formErrors.lastName ? 'error' : ''}`}
                                placeholder="Apellidos"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className={`form-control ${formErrors.email ? 'error' : ''}`}
                                placeholder="Correo"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className={`form-control ${formErrors.emailConfirm ? 'error' : ''}`}
                                placeholder="Confirmar Correo"
                                id="emailConfirm"
                                value={formData.emailConfirm}
                                onChange={handleInputChange}
                                onPaste={(e) => e.preventDefault()}
                                onCopy={(e) => e.preventDefault()}
                                required
                            />
                            {formErrors.emailConfirm && <span className="error-message">{formErrors.emailConfirm}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-control ${formErrors.city ? 'error' : ''}`}
                                placeholder="Ciudad"
                                id="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.city && <span className="error-message">{formErrors.city}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-control ${formErrors.country ? 'error' : ''}`}
                                placeholder="Pais"
                                id="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.country && <span className="error-message">{formErrors.country}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-control ${formErrors.gender ? 'error' : ''}`}
                                placeholder="Genero"
                                id="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="date"
                                className={`form-control ${formErrors.birthdate ? 'error' : ''}`}
                                placeholder="Fecha de Cumpleaños (DD/MM/AAAA)"
                                id="birthdate"
                                value={formData.birthdate}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.birthdate && <span className="error-message">{formErrors.birthdate}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-control ${formErrors.profession ? 'error' : ''}`}
                                placeholder="Profesion"
                                id="profession"
                                value={formData.profession}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.profession && <span className="error-message">{formErrors.profession}</span>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={`form-control ${formErrors.password ? 'error' : ''}`}
                                placeholder="Contraseña"
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                        </div>
                        <div className="head" href="index.html">
                            <p className="link">Registrarse con redes sociales</p>
                            <div className="container text-center">
                                <div className="social-links">
                                    <a href="#" className="link" onClick={() => openSocialPopup('https://www.facebook.com/')}><i className="ti-facebook"></i></a>
                                    <a href="#" className="link" onClick={() => openSocialPopup('https://www.google.com/')}><i className="ti-google"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={validateForm}
                            >
                                Registrarse
                            </button>
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

export default SignUp;