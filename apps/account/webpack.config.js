const {merge} = require('webpack-merge')
const singleSpaDefaults = require('webpack-config-single-spa-react-ts')
const path = require('path')
const {cwd} = require('process')
const webpack = require('webpack')

const getPath = (...args) => path.join(cwd(), ...args)

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'dailyposts',
    projectName: 'account',
    webpackConfigEnv,
    argv,
  })

  return merge(defaultConfig, {
    resolve: {
      alias: {
        '@components': getPath('src', 'components'),
        '@features': getPath('src', 'features'),
        '@lib': getPath('..', '..', 'packages', 'lib'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
        'process.env.REACT_APP_AUTH_DOMAIN': JSON.stringify(process.env.REACT_APP_AUTH_DOMAIN),
        'process.env.REACT_APP_PROJECT_ID': JSON.stringify(process.env.REACT_APP_PROJECT_ID),
        'process.env.REACT_APP_STORAGE_BUCKET': JSON.stringify(process.env.REACT_APP_STORAGE_BUCKET),
        'process.env.REACT_APP_MESSAGING_SENDER_ID': JSON.stringify(process.env.REACT_APP_MESSAGING_SENDER_ID),
        'process.env.REACT_APP_APP_ID': JSON.stringify(process.env.REACT_APP_APP_ID),
        'process.env.REACT_MEASUREMENT_ID': JSON.stringify(process.env.REACT_MEASUREMENT_ID),
      }),
    ],
  })
}
