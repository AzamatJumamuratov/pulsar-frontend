export interface SurgeryData {
  id: number;
  patient_id: number;
  patient_full_name: string;
  surgeon_id: number;
  surgeon_full_name: string;
  operation_name: string;
  operation_date: string;
  start_time: string;
  end_time: string;
  pre_op_days: number;
  post_op_days: number;
  notes: string;
  complications: string;
  outcome: string;
  additional_data: Record<string, any>;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export type SurgeriesDataType = SurgeryData[];

export interface SurgeriesResponse {
  data: SurgeryData[];
  total_count: number;
}

export interface SurgeriesState {
  data: SurgeryData[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

export interface SurgeryCreateRequest {
  patient_id: number;
  surgeon_id: number;
  operation_name: string;
  operation_date: string;
  start_time: string;
  end_time: string;
  pre_op_days: number;
  post_op_days: number;
  notes: string;
  complications: string;
  outcome: string;
  additional_data: Record<string, any>;
}

export interface SurgeryUpdateRequest {
  operation_name: string;
  operation_date: string;
  start_time: string;
  end_time: string;
  pre_op_days: number;
  post_op_days: number;
  notes: string;
  complications: string;
  outcome: string;
  additional_data: Record<string, any>;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ApiErrorResponse {
  detail: ValidationError[];
}
