module.exports = {
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8000,
    https: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8084',
        changeOrigin: true
      }
    }
  },
}
