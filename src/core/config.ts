type AppConfig = {
  baseApiUrl: string;
};

export function createAppConfig(env = process.env): AppConfig {
  if (!env.REACT_APP_API_URL)
    throw new Error("REACT_APP_API_URL is not defined");

  return {
    baseApiUrl: env.REACT_APP_API_URL,
  };
}

export const APP_CONFIG = createAppConfig();
