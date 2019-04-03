
module.exports = {
  devServer: {
    proxy: {
      '/': {
          target: 'http://192.168.103.216:7080/',
          changeOrigin: true,
          ws:false
        }
    }
  },

  publicPath: '',

  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}