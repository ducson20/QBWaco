/* eslint-disable */

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

enum MethodEnums {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const PRODUCTION = '113.161.12.175';
const DEVELOPMENT = 'localhost';

const BASE_URL = `http://${PRODUCTION}:8081/Apis`;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.data) {
      const { message } = error.response.data;
    }
    return Promise.reject(error);
  }
);

const request = <T, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) => {
  return instance.request<T, R>({ ...config, ...options });
};

export function get<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return request<T, R>({ ...config, method: MethodEnums.GET }, options);
}

export function post<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return request<T, R>({ ...config, method: MethodEnums.POST }, options);
}

export function patch<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return request<T, R>({ ...config, method: MethodEnums.PATCH }, options);
}

export function put<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return request<T, R>({ ...config, method: MethodEnums.PUT }, options);
}

export function remove<T = any, R = T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return request<T, R>({ ...config, method: MethodEnums.DELETE }, options);
}

export default request;
export type { AxiosInstance, AxiosResponse };
