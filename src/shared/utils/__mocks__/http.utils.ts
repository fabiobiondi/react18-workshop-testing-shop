import { httpClient as httpClientOriginal } from "../http.utils";

export const httpClient: jest.Mocked<typeof httpClientOriginal> = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  onRequest: jest.fn(),
  onResponse: jest.fn(),
};
