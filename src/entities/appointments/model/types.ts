export interface Appointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  patient_full_name: string;
  date: string;
  status: appointmentStatus;
  cost: number;
  notes: string;
}

export interface AppointmentRequest {
  doctor_id: string;
  patient_id: string;
  date: string;
  notes: string;
  cost: number | null;
}
export interface AppointmentsState {
  data: Appointment[];
  loading: boolean;
  error: string | null;
  receptionDone: Appointment[];
  receptionDoneLoading: boolean;
  receptionDoneError: string | null;
}

export type appointmentStatus = "scheduled" | "done";
