

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
          target: 'https://192.168.1.72/',
          changeOrigin: true,
          ws:false
        }
    }
  },

  publicPath: '/map',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}