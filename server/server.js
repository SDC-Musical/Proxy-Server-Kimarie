const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();
const path = require('path');
//const port = 80;
const port = 3000;

app.use(express.static('public'));

// app.use('/api/reviews/', createProxyMiddleware({
//   target: 'http://localhost:3001',
//   changeOrigin: true
// }));

// //copy and paste for other routes
// app.use('/api/seller/', createProxyMiddleware({
//   target: 'http://localhost:3002',
//   changeOrigin: true
// }))

// app.use('/api/images/', createProxyMiddleware({
//   target: 'http://localhost:3003',
//   changeOrigin: true
// }))

app.use('/api/products/', createProxyMiddleware({
  target: 'http://localhost:3004',
  changeOrigin: true
}))

// app.use('/hashtags/', createProxyMiddleware({
//   target: 'http://18.189.26.97:4001',
//   changeOrigin: true
// }))

// app.use('/users/', createProxyMiddleware({
//   target: 'http://18.218.58.9:4002/',
//   changeOrigin: true
// }))

app.use('/:current', (req, res) => {
  res.sendFile(path.join(__dirname,'/public/index.html'));
})

app.listen(port, () => console.log(`Listening on port ${port}`));
