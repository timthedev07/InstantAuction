declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: string;
    HOST: string;
    SESSION_SECRET: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    IMGUR_CLIENT_ID: string;
    AZURE_CLIENT_SECRET: string;
    AZURE_CLIENT_ID: string;
  }
}
