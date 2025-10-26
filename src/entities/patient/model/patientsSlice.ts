// src/entities/patients/model/patientsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/api";
import type { PatientData, PatientsState } from "./types";

const initialState: PatientsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPatients = createAsyncThunk<
  PatientData[],
  void,
  { rejectValue: string }
>("patients/fetchPatients", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<PatientData[]>("/patients/", {
      params: { skip: 0, limit: 10 },
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
      state.data = [];
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
