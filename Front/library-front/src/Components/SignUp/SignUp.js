import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/SignUp.css';

function SignUp() {
    const initialState = {
        name: '',
        age: '',
        city: '',
        country: '',
        gender: '',
        occupation: '',
        email: '',
        emailConfirm: '',
        birthdate: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});

    const cities = [
        { id: 1, name: 'Bogota' }
    ];

    const countries = [
        { id: 1, name: 'Colombia' },
        { id: 3, name: 'China' },
        { id: 4, name: 'Estados Unidos' },
        { id: 5, name: 'Otro' }
    ];

    const genders = [
        { id: 1, name: 'Masculino' },
        { id: 2, name: 'Femenino' },
        { id: 3, name: 'No especifico' }
    ];

    const occupations = [
        { id: 1, name: 'Estudiante' },
        { id: 2, name: 'Docente' },
        { id: 3, name: 'Pensionado' },
        { id: 4, name: 'Independiente' }
    ];

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

        if (isValid) {
            handleSubmit();
        }
    };

    const mapFormDataToApiData = (formData) => {
        return {
            name: formData.name,
            age: formData.age,
            idCity: parseInt(formData.city),
            idCountry: parseInt(formData.country),
            idGender: parseInt(formData.gender),
            idOccupation: parseInt(formData.occupation),
            email: formData.email,
            birthdate: formData.birthdate,
            password: formData.password
        };
    };

    const handleSubmit = async () => {
        try {
            const apiData = mapFormDataToApiData(formData);
            const response = await axios.post('http://localhost:80/api/customers/create', apiData);
            console.log('User registered:', response.data);
            // You can add logic here to redirect the user or show a success message
        } catch (error) {
            console.error('There was an error registering the user!', error);
            // You can add logic here to handle the error, such as showing a message to the user
        }
    };

    return (
        <div className="containerSignup">
            <form id="registerForm" onSubmit={(e) => e.preventDefault()}>
                <div className="cabecerasign">¿Qué esperas para registrarte y empezar a leer tus libros favoritos?</div>
                <br />
                <p className="subtitle">*Todos los campos son obligatorios</p>
                <div className="bodysign">
                    <div className="form-group">
                        <input
                            type="text"
                            className={`form-control ${formErrors.name ? 'error' : ''}`}
                            placeholder="Nombre"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            className={`form-control ${formErrors.age ? 'error' : ''}`}
                            placeholder="Edad"
                            id="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.age && <span className="error-message">{formErrors.age}</span>}
                    </div>
                    <div className="form-group">
                        <select
                            className={`form-control ${formErrors.city ? 'error' : ''}`}
                            id="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccione una ciudad</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.city && <span className="error-message">{formErrors.city}</span>}
                    </div>
                    <div className="form-group">
                        <select
                            className={`form-control ${formErrors.country ? 'error' : ''}`}
                            id="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccione un país</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.country && <span className="error-message">{formErrors.country}</span>}
                    </div>
                    <div className="form-group">
                        <select
                            className={`form-control ${formErrors.gender ? 'error' : ''}`}
                            id="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccione un género</option>
                            {genders.map((gender) => (
                                <option key={gender.id} value={gender.id}>
                                    {gender.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
                    </div>
                    <div className="form-group">
                        <select
                            className={`form-control ${formErrors.occupation ? 'error' : ''}`}
                            id="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccione una ocupación</option>
                            {occupations.map((occupation) => (
                                <option key={occupation.id} value={occupation.id}>
                                    {occupation.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.occupation && <span className="error-message">{formErrors.occupation}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className={`form-control ${formErrors.email ? 'error' : ''}`}
                            placeholder="Correo Electrónico"
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
                            placeholder="Confirmar Correo Electrónico"
                            id="emailConfirm"
                            value={formData.emailConfirm}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.emailConfirm && <span className="error-message">{formErrors.emailConfirm}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            className={`form-control ${formErrors.birthdate ? 'error' : ''}`}
                            placeholder="Fecha de Nacimiento"
                            id="birthdate"
                            value={formData.birthdate}
                            onChange={handleInputChange}
                            required
                        />
                        {formErrors.birthdate && <span className="error-message">{formErrors.birthdate}</span>}
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
                    <div className="footersign">
                        <button
                            className="btn btn-primary btn-block"
                            onClick={validateForm}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
                <div className="copiright">
                    Copyright <script>document.write(new Date().getFullYear())</script> &copy;
                </div>
            </form>
        </div>
    );
}

export default SignUp;
