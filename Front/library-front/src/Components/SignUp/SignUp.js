import React, {useEffect, useState} from 'react';
import '../../Styles/SignUp.css';

function SignUp() {

function validateForm() {
        var name = document.getElementById('name');
        var lastName = document.getElementById('lastName');
        var email = document.getElementById('email');
        var city = document.getElementById('city');
        var country = document.getElementById('country');
        var gender = document.getElementById('gender');
        var birthdate = document.getElementById('birthdate');
        var profession = document.getElementById('profession');
        var password = document.getElementById('password');
        var isValid = true;

        if (name.value === '') {
            name.classList.add('error');
            isValid = false;
        } else {
            name.classList.remove('error');
        }

        if (lastName.value === '') {
            lastName.classList.add('error');
            isValid = false;
        } else {
            lastName.classList.remove('error');
        }

        if (email.value === '') {
            email.classList.add('error');
            isValid = false;
        } else {
            email.classList.remove('error');
        }

        if (city.value === '') {
            city.classList.add('error');
            isValid = false;
        } else {
            city.classList.remove('error');
        }

        if (country.value === '') {
            country.classList.add('error');
            isValid = false;
        } else {
            country.classList.remove('error');
        }

        if (gender.value === '') {
            gender.classList.add('error');
            isValid = false;
        } else {
            gender.classList.remove('error');
        }

        if (birthdate.value === '') {
            birthdate.classList.add('error');
            isValid = false;
        } else {
            birthdate.classList.remove('error');
        }

        if (profession.value === '') {
            profession.classList.add('error');
            isValid = false;
        } else {
            profession.classList.remove('error');
        }

        if (password.value === '') {
            password.classList.add('error');
            isValid = false;
        } else {
            password.classList.remove('error');
        }

        if (isValid) {
            document.getElementById('registerForm').submit();
        }
    }

return (
          <body>
              <div class="container">
                          <form id="registerForm">
                              <div class="head">Registrarse</div>
                              <p class="subtitle">*Todos los campos son obligatorios</p>
                              <div class="body">
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="Nombres" id="name" required />
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="Apellidos" id="lastName" required />
                                  </div>
                                  <div class="form-group">
                                      <input type="email" class="form-control" placeholder="Correo" id="email" required />
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="Ciudad" id="city" required />
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="Pais" id="country" required />
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="Genero" id="gender" required />
                                  </div>
                                  <div class="form-group">
                                      <input type="date" class="form-control" placeholder="Fecha Cumpleaños DD/MM/AA" id="birthdate" required />
                                  </div>
                                  <div class="form-group">
                                      <input type="text" class="form-control" placeholder="Profesion" id="profession" required />
                                  </div>
                                  <div class="form-group">
                                      <input type="password" class="form-control" placeholder="Contraseña" id="password" required />
                                  </div>
                                  <div class="head" href="index.html">
                                      <p class="head">Registrarse con redes sociales</p>
                                      <div class="container text-center">
                                          <div class="social-links">
                                              <a href="#" class="link" onclick="openSocialPopup('https://www.facebook.com/')"><i class="ti-facebook"></i></a>
                                              <a href="#" class="link" onclick="openSocialPopup('https://www.google.com/')"><i class="ti-google"></i></a>
                                          </div>
                                      </div>
                                  </div>
                                  <div class="footer">
                                      <button class="btn btn-primary btn-block" onclick="validateForm()">Registrarse</button>
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