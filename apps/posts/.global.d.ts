declare namespace NodeJS {
  interface ProcessEnv {
    WEB_APP_BASE_URL: string
    ENV_CONFIG: 'development' | 'production' | 'complete'
    FIREBASE_API_KEY: string
    FIREBASE_AUTH_DOMAIN: string
    FIREBASE_PROJECT_ID: string
    FIREBASE_STORAGE_BUCKET: string
    FIREBASE_MESSAGING_SENDER_ID: string
    FIREBASE_APP_ID: string
  }
}
