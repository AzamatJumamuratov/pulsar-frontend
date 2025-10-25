export type UserRole = "reception" | "doctor";

export const USER_ROLES: Record<UserRole, string> = {
  reception: "Регистратор",
  doctor: "Врач",
} as const;

export interface Profile {
  name: string;
  role: UserRole;
}

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}
