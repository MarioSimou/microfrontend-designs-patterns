const withTM = require('next-transpile-modules')(['lib'])

const WEB_APP_BASE_URL = process.env.WEB_APP_BASE_URL
if(!WEB_APP_BASE_URL){
  throw new Error('error: please provide a valid configuration')
}

module.exports = withTM({
  reactStrictMode: true,
  assetPrefix: process.env.WEB_APP_BASE_URL
})
