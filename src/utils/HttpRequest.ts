import axios from "axios";
import queryString from "query-string";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    charset: "utf-8",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export class HttpRequest {
  public static async get<T = any>(url: string, params, config: any = {}) {
    return instance.request<any, T>({ method: "GET", url, params, ...config });
  }

  public static async post<T = any, D = any>(url: string, data: D, config: any = {}) {
    return instance.request<any, T>({ method: "POST", url, data, ...config });
  }

  public static async patch<T = any, D = any>(url: string, data: D, config: any = {}) {
    return instance.request<any, T>({ method: "PATCH", url, data, ...config });
  }

  public static async put<T = any, D = any>(url: string, data: D, config: any = {}) {
    return instance.request<any, T>({ method: "PUT", url, data, ...config });
  }

  public static async delete<T = any, D = any>(url: string, config: any = {}) {
    return instance.request<any, T>({ method: "DELETE", url, ...config });
  }
}
