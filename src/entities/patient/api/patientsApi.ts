import api from "@/app/api";
import type { PatientCreateAndEditRequest, PatientData } from "../model/types";
import { toaster } from "@/components/ui/toaster";

export async function CreatePatient(
  data: PatientCreateAndEditRequest
): Promise<PatientData | null> {
  try {
    const response = await api.post<PatientData>("/patients/", data);
    toaster.create({
      description: `Пациент ${response.data.full_name} успешно создан.`,
      type: "success",
    });
    return response.data;
  } catch (err: any) {
    toaster.create({
      description:
        err?.response?.data?.detail || "Ошибка при создании пациента.",
      type: "error",
    });
    return null;
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
