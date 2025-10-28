export interface PatientData {
  id: number;
  patient_uid: string;
  full_name: string;
  birth_date: string;
  gender: GenderType;
  phone: string;
  passport: string;
  address: string;
  created_at: string;
}

export interface PatientsDataType {
  patients: PatientData[];
  total_count: number;
}

export interface PatientsState {
  data: PatientsDataType;
  loading: boolean;
  error: string | null;
}

export interface PatientCreateAndEditRequest {
  full_name: string;
  birth_date: string;
  gender: GenderType;
  phone: string;
  passport: string;
  address: string;
}

export type GenderType = "male" | "female";
