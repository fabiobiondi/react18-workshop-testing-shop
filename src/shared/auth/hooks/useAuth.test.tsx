import { act, renderHook } from "@testing-library/react";
import { httpClient } from "../../utils/http.utils";
import { useAuth } from "./useAuth";

jest.mock("../../utils/http.utils");
jest.mock("../../utils/localstorage.utils.ts");

describe("useAuth", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("SignIn", () => {
    const { result } = renderHook(() => useAuth());
    const credentials = {
      username: "username",
      password: "password",
    };
    let httpClientMock = httpClient as jest.Mocked<typeof httpClient>;

    describe("Success", () => {
      beforeEach(() => {
        httpClientMock.post.mockResolvedValue({
          accessToken: "123",
        });
      });

      test("should set Error false before call api", async () => {
        await act(async () => {
          await result.current.signIn(credentials);
        });
        expect(result.current.isError).toBeFalsy();
      });

      test("should call the signIn method", async () => {
        await act(async () => {
          await result.current.signIn(credentials);
        });
        expect(httpClientMock.post).toHaveBeenCalledWith("/login", {
          email: "username",
          password: "password",
        });
      });

      test("should set pending to false when signIn is ended", async () => {
        await act(async () => {
          await result.current.signIn(credentials);
        });
        expect(result.current.pending).toBeFalsy();
      });
    });

    describe("error", () => {
      beforeEach(() => {
        httpClientMock.post.mockRejectedValue(new Error("error"));
      });

      test("should throw error if http request fails", async () => {
        await expect(
          act(async () => {
            await result.current.signIn(credentials);
          })
        ).rejects.toThrowError("error");
      });

      test.todo("should set error to true when http request fails");
    });
  });
});
