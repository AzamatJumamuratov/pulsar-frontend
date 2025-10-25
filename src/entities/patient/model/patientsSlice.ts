import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mockPatients } from "./mockPatients";
import type { PatientData, PatientsState } from "./types";

const initialState: PatientsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPatients = createAsyncThunk<PatientData[]>(
  "patients/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      const patients = await new Promise<PatientData[]>((resolve) => {
        setTimeout(() => {
          resolve(mockPatients);
        }, 2500);
      });

      return patients;
    } catch (error: any) {
      return rejectWithValue("Ошибка при загрузке списка пациентов");
    }
  }
);

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
        state.error = action.payload as string;
      });
  },
});

export const { clearPatients } = patientsSlice.actions;
export default patientsSlice.reducer;
