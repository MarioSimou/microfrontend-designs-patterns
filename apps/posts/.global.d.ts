declare namespace NodeJS {
  interface ProcessEnv {
    WEB_APP_BASE_URL: string
    NEXT_PUBLIC_ENV_CONFIG: 'development ' | 'production'
  }
}
