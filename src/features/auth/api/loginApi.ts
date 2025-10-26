import api, { saveTokens } from "@/app/api";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;

  full_name: string;
  role: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>("/auth/login", data);

    saveTokens(
      response.data.access_token,
      response.data.refresh_token,
      response.data.token_type
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        throw new Error("Неверное имя пользователя или пароль");
      } else if (status >= 500) {
        throw new Error("Ошибка сервера. Попробуйте позже");
      } else {
        throw new Error(error.response.data?.detail || "Ошибка при входе");
      }
    }

    // Если нет ответа (например, сервер не доступен)
    if (error.request) {
      throw new Error("Сервер недоступен. Проверьте подключение к интернету");
    }

    // Неизвестная ошибка
    throw new Error("Произошла непредвиденная ошибка");
  }
}
