import api from "@/app/api";
import { toaster } from "@/components/ui/toaster";
import type { AppointmentRequest } from "../model/types";

export async function confirmAppointment(id: number, onSuccess?: () => void) {
  try {
    await api.patch(`/appointments/my/${id}/finish`);
    toaster.create({ title: `Приём #${id} подтверждён`, type: "success" });
    onSuccess?.();
  } catch {
    toaster.create({
      title: `Ошибка при подтверждении приёма #${id}`,
      type: "error",
    });
  }
}

export async function createAppointment({
  doctor_id,
  patient_id,
  date,
  notes,
  cost,
}: AppointmentRequest) {
  try {
    await api.post("/appointments/", {
      doctor_id,
      patient_id,
      date,
      notes,
      cost,
    });
  } catch {
    //лучше пусто было
  }
}

export async function updateCost(
  id: number,
  cost: number,
  onSuccess?: (newCost: number) => void
) {
  try {
    const { data } = await api.patch(`/appointments/my/${id}/cost`, { cost });
    toaster.create({
      title: "Стоимость обновлена",
      description: `Новая сумма: ${Number(data.cost ?? cost).toLocaleString(
        "ru-RU"
      )} сум`,
      type: "success",
    });
    onSuccess?.(data.cost ?? cost);
  } catch (err: any) {
    toaster.create({
      title: "Ошибка при сохранении",
      description:
        err?.response?.data?.detail || err?.message || "Попробуйте ещё раз.",
      type: "error",
    });
  }
}

export async function payAppointment(id: number, onSuccess?: () => void) {
  try {
    await api.patch(`/appointments/reception/${id}/pay`);
    toaster.create({
      title: `Приём #${id} оплачен`,
      type: "success",
    });
    onSuccess?.();
  } catch (err: any) {
    toaster.create({
      title: `Ошибка при оплате приёма #${id}`,
      description:
        err?.response?.data?.detail || err?.message || "Попробуйте ещё раз.",
      type: "error",
    });
  }
}
