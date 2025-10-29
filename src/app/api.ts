import axios from "axios";

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";
const TYPE_KEY = "token_type";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

/* Получение токенов */
export const getTokens = () => ({
  access: localStorage.getItem(ACCESS_KEY),
  refresh: localStorage.getItem(REFRESH_KEY),
  token_type: localStorage.getItem(TYPE_KEY),
});

/* Сохранение токенов */
export const saveTokens = (
  access: string,
  refresh: string,
  token_type: string = "bearer"
) => {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
  localStorage.setItem(TYPE_KEY, token_type);
};

/* Очистка токенов */
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(TYPE_KEY);
};

/* Предотвращение множественных refresh-запросов */
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });
  failedQueue = [];
};

/* Добавляем Authorization */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* Интерцептор для обновления токена */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refresh } = getTokens();

      if (!refresh) {
        clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          { refresh_token: refresh }
        );

        const { access_token, refresh_token, token_type } = res.data;

        saveTokens(access_token, refresh_token, token_type);
        api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        processQueue(null, access_token);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
