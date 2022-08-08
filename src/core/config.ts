type AppConfig = {
  baseApiUrl: string;
};

function createAppConfig(): AppConfig {
  console.log("createAppConfig", process.env.REACT_APP_API_URL);
  if (!process.env.REACT_APP_API_URL)
    throw new Error("REACT_APP_API_URL is not defined");

  return {
    baseApiUrl: process.env.REACT_APP_API_URL,
  };
}

export const APP_CONFIG = createAppConfig();
