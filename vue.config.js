module.exports = {
    devServer: {
        proxy: {
          '/': {
            target: 'http://192.168.102.221:7080/',
            changeOrigin: true,
            ws:false
          }
        }
      }
  }