import api, { saveTokens } from "@/app/api";
import type { LoginResponse } from "./loginApi";

interface RegisterData {
  username: string;
  full_name: string;
  email: string;
  password: string;
  role: string;
}

export const register = async (data: RegisterData): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/register", data);

    const { access_token, refresh_token, token_type } = response.data;

    saveTokens(access_token, refresh_token, token_type);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        throw new Error(
          error.response.data?.detail || "Некорректные данные для регистрации"
        );
      } else if (status === 409) {
        throw new Error("Пользователь с таким именем уже существует");
      } else if (status >= 500) {
        throw new Error("Ошибка сервера. Попробуйте позже");
      } else {
        throw new Error(
          error.response.data?.detail || "Ошибка при регистрации"
        );
      }
    }

    if (error.request) {
      throw new Error("Сервер недоступен. Проверьте подключение к интернету");
    }

    throw new Error("Произошла непредвиденная ошибка при регистрации");
  }
};
