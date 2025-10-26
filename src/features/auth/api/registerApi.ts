import api from "@/app/api";

interface RegisterData {
  username: string;
  full_name: string;
  email: string;
  password: string;
  role: string;
}

export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
