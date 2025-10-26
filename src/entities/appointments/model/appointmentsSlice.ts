import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/api";
import type { Appointment, AppointmentsState } from "./types";

const initialState: AppointmentsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchAppointmentsList = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>("appointments/fetchAppointmentsList", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Appointment[]>("appointments/my");
    return response.data;
  } catch (error: any) {
    const detail =
      error?.response?.data?.detail ||
      error?.message ||
      "Не удалось загрузить список назначений";
    return rejectWithValue(detail);
  }
});

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearAppointmentsList(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentsList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAppointmentsList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Ошибка при загрузке списка Назначений.";
      });
  },
});

export const { clearAppointmentsList } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
