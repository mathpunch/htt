const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Set up the proxy to the correct URL
app.use('/greenbean', createProxyMiddleware({
  target: 'https://mathpunch.browbar.ar',  // Correct proxy URL
  changeOrigin: true,                      // Ensures correct forwarding of requests
  pathRewrite: {
    '^/greenbean': '',                    // Remove "/greenbean" from the path before forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Log the request for debugging
    console.log(`Proxying request to: ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  },
}));

// Serve the app
app.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000');
});
