// src/entities/patients/model/patientsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/api";
import type { PatientsDataType, PatientsState } from "./types";

const initialState: PatientsState = {
  data: {
    patients: [],
    total_count: 0,
  },
  loading: false,
  error: null,
};

export const fetchDefaultPatients = () => fetchPatients({ page: 1, limit: 10 });

export const fetchPatients = createAsyncThunk<
  PatientsDataType,
  { page: number; limit: number },
  { rejectValue: string }
>("patients/fetchPatients", async ({ page, limit }, { rejectWithValue }) => {
  try {
    const skip = (page - 1) * limit;
    const response = await api.get<PatientsDataType>("/patients/", {
      params: { skip, limit },
    });
    return response.data;
  } catch (error: any) {
    const detail =
      error?.response?.data?.detail ||
      error?.message ||
      "Не удалось загрузить список пациентов.";
    return rejectWithValue(detail);
  }
});

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    clearPatients(state) {
      state.data.patients = [];
      state.data.total_count = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при загрузке пациентов.";
      });
  },
});

export const { clearPatients } = patientsSlice.actions;
export default patientsSlice.reducer;
