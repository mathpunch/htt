const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Set up the proxy
app.use('/redirect10', createProxyMiddleware({
  target: 'https://extramathequations.web.app/',  // Replace with your target server
  changeOrigin: true,                             // Ensures the request is forwarded correctly
  pathRewrite: {
    '^/redirect10': '',                          // Remove "/redirect10" from the path
  },
}));

// Start the server
app.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000');
});
