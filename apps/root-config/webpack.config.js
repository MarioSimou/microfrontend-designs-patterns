const {merge} = require('webpack-merge')
const singleSpaDefaults = require('webpack-config-single-spa-ts')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (webpackConfigEnv, argv) => {
  const orgName = 'dailyposts'
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: 'root-config',
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  })

  const isLocal = webpackConfigEnv && webpackConfigEnv.isLocal
  const rootBundleUrl = process.env.ROOT_BUNDLE_URL ?? 'http://localhost:9000/dailyposts-root-config.js'
  const postsBundleUrl = process.env.POSTS_BUNDLE_URL ?? 'http://localhost:9002/dailyposts-posts.js'
  const accountBundleUrl = process.env.ACCOUNT_BUNDLE_URL ?? 'http://localhost:9001/dailyposts-account.js'

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.ejs',
        templateParameters: {
          isLocal,
          rootBundleUrl,
          accountBundleUrl,
          postsBundleUrl,
          orgName,
        },
      }),
    ],
  })
}
