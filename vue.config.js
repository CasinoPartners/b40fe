module.exports = {
  lintOnSave: false,
  productionSourceMap: false
  // chainWebpack: config => {
  //   config.optimization.minimizer('terser').tap(args => {
  //     const opts = args[0]

  //     opts.terserOptions.mangle = {
  //       ...opts.terserOptions.mangle,
  //       properties: true, // mangle all property names
  //     }

  //     return args
  //   })
  // }
};
