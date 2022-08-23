import { createAppConfig } from "./config";

describe("createAppConfig", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("should return a correct configuration", () => {
    process.env.REACT_APP_API_URL = "REACT_APP_API_URL";

    const result = createAppConfig();

    expect(result).toEqual({
      baseApiUrl: "REACT_APP_API_URL",
    });
  });

  it("should throw an error if the environment is not well configured", () => {
    process.env.REACT_APP_API_URL = undefined;
    expect(() => createAppConfig()).toThrowError();
  });
});
