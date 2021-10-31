declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    HOST: string;
    SESSION_SECRET: string;
    GOOGLE_CLIENT_SECRET: string;
    DISCORD_CLIENT_SECRET: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_DISCORD_CLIENT_ID: string;
    IMGUR_CLIENT_ID: string;
  }
}
