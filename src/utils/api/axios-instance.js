import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export function createMainApiAxiosInstance() {
  return axios.create({
    baseURL: import.meta.env.VITE_BACKEND_COCRAFTER_API_URL,
    headers,
  });
}

export const mainApiInstance = createMainApiAxiosInstance();
