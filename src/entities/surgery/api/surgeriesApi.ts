import api from "@/app/api";
import type {
  SurgeryCreateRequest,
  SurgeryUpdateRequest,
  SurgeryData,
} from "../model/types";

export const createSurgery = async (
  data: SurgeryCreateRequest
): Promise<SurgeryData> => {
  const response = await api.post<SurgeryData>("/surgeries/", data);
  return response.data;
};

export const updateSurgery = async (
  surgeryId: number,
  data: SurgeryUpdateRequest
): Promise<SurgeryData> => {
  const response = await api.patch<SurgeryData>(
    `/surgeries/${surgeryId}`,
    data
  );
  return response.data;
};

export const deleteSurgery = async (surgeryId: number): Promise<void> => {
  await api.delete(`/surgeries/${surgeryId}`);
};
