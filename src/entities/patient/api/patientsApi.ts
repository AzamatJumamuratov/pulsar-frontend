import api from "@/app/api";
import type {
  PatientCreateAndEditRequest,
  PatientData,
  PatientsDataType,
} from "../model/types";
import { toaster } from "@/components/ui/toaster";

export async function CreatePatient(
  data: PatientCreateAndEditRequest
): Promise<PatientData | null> {
  try {
    const response = await api.post<PatientData>("/patients/", data);

    return Promise.resolve(response.data);
  } catch (err: any) {
    return Promise.reject(null);
  }
}

export async function EditPatient(
  patient_id: number,
  data: PatientCreateAndEditRequest
): Promise<PatientData | null> {
  try {
    const response = await api.patch<PatientData>(
      `/patients/${patient_id}`,
      data
    );
    toaster.create({
      description: `Пациент #${response.data.id} успешно Изменен!.`,
      type: "success",
    });
    return response.data;
  } catch (err: any) {
    toaster.create({
      description:
        err?.response?.data?.detail || "Ошибка при изменении пациента.",
      type: "error",
    });
    return null;
  }
}

export async function DeletePatient(
  patient_id: number
): Promise<PatientData | null> {
  try {
    const response = await api.delete(`/patients/${patient_id}`);
    return response.data;
  } catch (err: any) {
    toaster.create({
      description:
        err?.response?.data?.detail || "Ошибка при удалении пациента.",
      type: "error",
    });
    return null;
  }
}

export async function searchPatients(
  search?: string,
  phone?: string,
  skip: number = 0,
  limit: number = 10
): Promise<PatientsDataType> {
  try {
    const params: any = { skip, limit };
    if (search) params.search = search;
    if (phone) params.phone = phone;
    const response = await api.get<PatientsDataType>("/patients/", { params });
    return response.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.detail || "Ошибка при поиске пациентов."
    );
  }
}
