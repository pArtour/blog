// "proxy": "https://test-api.febest.dev/"

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/v1/blog/posts',
        createProxyMiddleware({
            target: 'https://test-api.febest.dev',
            changeOrigin: true
        })
    );
};
