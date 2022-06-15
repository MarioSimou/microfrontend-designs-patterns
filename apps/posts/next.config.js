const withTM = require('next-transpile-modules')(['lib'])

module.exports = withTM({
  reactStrictMode: true,
  assetPrefix: 'http://posts.com.cy:3001',
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    WEB_APP_BASE_URL: process.env.WEB_APP_BASE_URL,
    ENV_CONFIG: process.env.ENV_CONFIG,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
})
