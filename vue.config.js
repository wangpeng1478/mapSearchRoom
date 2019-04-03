

module.exports = {
  configureWebpack:{
    externals: {
        'BMap': 'BMap',
        'BMap_Symbol_SHAPE_POINT': 'BMap_Symbol_SHAPE_POINT'
      }
},
  devServer: {
    proxy: {
      '/': {
          target: 'http://192.168.1.72/',
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