export type UserRole = "reception" | "doctor";

export const USER_ROLES: Record<UserRole, string> = {
  reception: "Регистратор",
  doctor: "Врач",
} as const;

export interface Profile {
  id: number;
  full_name: string;
  role: UserRole;
  username: string;
  email: string;
}

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}
