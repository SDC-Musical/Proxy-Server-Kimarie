
require('newrelic');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const path = require('path');
const axios = require('axios');
const morgan = require('morgan');
//const port = 80;
const port = 3000;

app.use(express.static('public'));
app.use(morgan('dev'));

app.use('/api/products', createProxyMiddleware({
  target: 'http://localhost:3004/',
  changeOrigin: true,
}));

app.use('/api/update', createProxyMiddleware({
  target: 'http://localhost:3004/',
  changeOrigin: true,
}));

app.get('/title.js', (req, res) => {
  axios.get('http://localhost:3004/products/1/title.js')
  .then((response) => {
    res.send(response.data);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

app.get('/description.js', (req, res) => {
  axios.get('http://localhost:3004/products/1/description.js')
  .then((response) => {
    res.send(response.data);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

app.get('/specs.js', (req, res) => {
  axios.get('http://localhost:3004/products/1/specs.js')
  .then((response) => {
    res.send(response.data);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
