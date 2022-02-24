const resolve = (module) => require.resolve(module)

// get alias ts paths working - https://github.com/doczjs/docz/issues/48
const TSPathsPlugin = require('tsconfig-paths-webpack-plugin');

// get SASS working
exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  
  const { setWebpackConfig } = actions
  const PRODUCTION = stage !== `develop`
  const isSSR = stage.includes(`html`)

  const sassLoader = {
    loader: resolve(`sass-loader`),
    options: {
      sourceMap: !PRODUCTION
    }
  }

  const sassRule = {
    test: /\.s(a|c)ss$/,
    use:
      isSSR && !PRODUCTION
        ? [loaders.null()]
        : [loaders.miniCssExtract(), loaders.css({ importLoaders: 2 }), sassLoader]
  }
  const sassRuleModules = {
    test: /\.module\.s(a|c)ss$/,
    use: [
      (!isSSR || !PRODUCTION) && loaders.miniCssExtract({ hmr: false }),
      loaders.css({ modules: true, importLoaders: 2, camelCase: false }),
      sassLoader
    ].filter(Boolean)
  }

  let configRules = []

  switch (stage) {
    case `develop`:
    case `build-javascript`:
    case `build-html`:
    case `develop-html`:
      configRules = configRules.concat([
        {
          oneOf: [sassRuleModules, sassRule]
        }
      ])
      break
    default:
      break
  }

  setWebpackConfig({
    module: {
      rules: configRules
    },
    resolve: {
      plugins: [new TSPathsPlugin({ configFile: '../tsconfig.json' })]
    }
  })
}
