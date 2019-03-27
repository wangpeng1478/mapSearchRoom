module.exports = {
    devServer: {
        proxy: {
          '/': {
            target: 'http://192.168.102.221:7080/', //对应自己的接口
            changeOrigin: true,
            ws: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        }
      }
  }