import React, { useState } from 'react';
import '../../Styles/SignUp.css';

function SignUp() {
    const initialState = {
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
    };

    const [formData, setFormData] = useState(initialState);
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

        for (const key in formData) {
            if (formData[key].trim() === '') {
                errors[key] = 'Este campo es obligatorio';
                isValid = false;
            }
        }

        setFormErrors(errors);
        setIsFormValid(isValid);

        if (isValid) {
            console.log('Formulario válido, enviando...');
        }
    };

    return (
        <div className="containerSignup">
            <form id="registerForm">
                <div className="cabecerasign">¿Qué esperas para registrarte y empezar a leer tus libros favoritos?</div>
                <br />
                <p className="subtitle">*Todos los campos son obligatorios</p>
                <div className="bodysign">
                    {Object.keys(formData).map((key) => (
                        <div className="form-group" key={key}>
                            <input
                                type={key === 'email' || key === 'emailConfirm' ? 'email' : key === 'birthdate' ? 'date' : 'text'}
                                className={`form-control ${formErrors[key] ? 'error' : ''}`}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                id={key}
                                value={formData[key]}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors[key] && <span className="error-message">{formErrors[key]}</span>}
                        </div>
                    ))}
                    <div className="head" href="index.html">
                        <p className="link">Registrarse con redes sociales</p>
                        <div className="container text-center">
                            <div className="social-links">
                                <a href="#" className="link" onClick={() => openSocialPopup('https://www.facebook.com/')}><i className="ti-facebook"></i></a>
                                <a href="#" className="link" onClick={() => openSocialPopup('https://www.google.com/')}><i className="ti-google"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="footersign">
                        <button
                            className="btn btn-primary btn-block"
                            onClick={validateForm}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
                <div ClassName="copiright">
                    Copyright <script>document.write(new Date().getFullYear()</script> &copy;
                </div>
            </form>
        </div>
    );
}

export default SignUp;