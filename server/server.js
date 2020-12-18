const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();
const path = require('path');
//const port = 80;
const port = 3000;

app.use(express.static('public'));

app.use('/products', createProxyMiddleware({
  target: 'http://localhost:3004/bundle-product-information-service.js',
  changeOrigin: true,
  pathRewrite: { '^/products' : '' },
}));

app.use('/:id', (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
