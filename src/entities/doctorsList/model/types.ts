import type { UserRole } from "@/entities/profile/model/types";

export interface DoctorData {
  id: number;
  username: string;
  full_name: string;
  role: UserRole;
  email: string;
}

export interface DoctorsListState {
  data: DoctorData[];
  loading: boolean;
  error: string | null;
}
