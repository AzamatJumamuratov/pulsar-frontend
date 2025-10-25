export interface PatientData {
  id: number;
  fullName: string;
  phone: string;
  total_money: number;
  birthDate: string;
  assignedDoctor: string;
  appointment: string;
}

export interface PatientsState {
  data: PatientData[];
  loading: boolean;
  error: string | null;
}
