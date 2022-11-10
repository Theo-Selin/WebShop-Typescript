import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL || "http://localhost:4000";

type HttpVerbWithoutBody = "get" | "delete" | "head" | "options";
type HttpVerbWithBody = "post" | "put" | "patch";

type ApiCallOverloads = {
  <ReturnType>(
    verb: HttpVerbWithoutBody,
    url: string,
    config?: AxiosRequestConfig
  ): ReturnType;
  <ReturnType, InputType = any>(
    verb: HttpVerbWithBody,
    url: string,
    body?: InputType,
    config?: AxiosRequestConfig
  ): ReturnType;
};

export const apiCall: ApiCallOverloads = async <ReturnType, InputType>(
  verb: HttpVerbWithoutBody | HttpVerbWithBody,
  url: string,
  bodyOrConfig?: InputType | AxiosRequestConfig,
  config?: AxiosRequestConfig
) => {
  if (
    verb === "get" ||
    verb === "delete" ||
    verb === "head" ||
    verb === "options"
  ) {
    const response = await axios[verb]<ReturnType>(
      url,
      bodyOrConfig as AxiosRequestConfig
    );
    return response.data;
  } else {
    const response = await axios[verb]<ReturnType>(
      url,
      bodyOrConfig as InputType,
      config
    );
    return response.data;
  }
};

export const apiCallAuth: ApiCallOverloads = async <ReturnType, InputType>(
  verb: HttpVerbWithoutBody | HttpVerbWithBody,
  url: string,
  bodyOrConfig?: InputType | AxiosRequestConfig,
  config?: AxiosRequestConfig
) => {
  const token = localStorage.getItem("webshop-jwt");

  if (!token) {
    return null;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (
    verb === "get" ||
    verb === "delete" ||
    verb === "head" ||
    verb === "options"
  ) {
    return apiCall<ReturnType>(verb, url, {
      ...(bodyOrConfig as AxiosRequestConfig),
      headers,
    });
  } else {
    return apiCall<ReturnType, InputType>(
      verb,
      url,
      bodyOrConfig as InputType | undefined,
      { ...config, headers }
    );
  }
};
