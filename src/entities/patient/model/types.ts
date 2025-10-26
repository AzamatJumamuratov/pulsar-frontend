export interface PatientData {
  id: number;
  patient_uid: string;
  full_name: string;
  birth_date: string;
  gender: GenderType;
  phone: string;
  passport: string;
  address: string;
  email: string;
  created_at: string;
}

export interface PatientsState {
  data: PatientData[];
  loading: boolean;
  error: string | null;
}

export type GenderType = "male" | "female";
