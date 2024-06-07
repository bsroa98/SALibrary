const express = require('express');
const request = require('request');
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

// Ruta para manejar las solicitudes a http://localhost:3001/api/character
app.get('/api/character', (req, res) => {
  // Aquí puedes hacer la solicitud al servidor correcto y devolver la respuesta
  const apiUrl = 'https://rickandmortyapi.com/api/character'; // URL correcta
  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Devolver la respuesta al cliente
      res.send(body);
    } else {
      // Manejar el error
      console.error('Error en la solicitud a la API de personajes:', error);
      res.status(response.statusCode).send(body);
    }
  });
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
