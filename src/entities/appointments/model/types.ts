export interface Appointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  date: string;
  cost: number;
  notes: string;
  status: appointmentStatus;
  //это типа username врача
  doctor_name: string;
}

export interface AppointmentsState {
  data: Appointment[];
  loading: boolean;
  error: string | null;
}

export type appointmentStatus = "scheduled" | "done";
