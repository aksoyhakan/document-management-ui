import { ErrorCode, MWError } from "../error";
import { createMainApiAxiosInstance, mainApiInstance } from "./axios-instance";
import { AuthService, MainFilesService, MainFoldersService } from "./services";

export * from "./services";

function addInterceptors(instance, abortController, token) {
  instance.interceptors.request.use((config) => {
    config.signal = abortController.signal;

    if (
      token ||
      JSON.parse(localStorage.getItem("global-state"))?.state?.token
    ) {
      config.headers.Authorization =
        token ??
        `Bearer ${
          JSON.parse(localStorage.getItem("global-state"))?.state?.token
        }`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (apiError) => {
      const error = createError(apiError);

      if (error?.isUnauthorized) {
        await mainApiInstance.post("/auth/logout").then(() => {
          location.href = "/";
          localStorage.clear();
        });
      }

      throw error;
    }
  );
}

export function createError(err) {
  const isCanceled = err.code === ErrorCode.CANCELED;

  const errResponse = err.response;

  const msg = isCanceled
    ? "Request Cancelled"
    : errResponse?.data?.message ||
      errResponse?.data?.err ||
      err.message ||
      errResponse?.statusText ||
      err.toString();

  const code = errResponse?.data.code || err.code || ErrorCode.UNKNOWN;

  const status = errResponse?.status || err.status;

  return new MWError(msg, code, status, err);
}

export class MainApi {
  token;

  constructor(instance) {
    this.instance = instance;

    this.files = new MainFilesService(instance);

    this.folders = new MainFoldersService(instance);

    this.auth = new AuthService(instance);

    this.abortController = new AbortController();

    addInterceptors(instance, this.abortController, this.token);
  }
}

export const MainApiService = new MainApi(createMainApiAxiosInstance());
