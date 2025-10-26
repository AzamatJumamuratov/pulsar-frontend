import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/api";
import type { DoctorData, DoctorsListState } from "./types";

const initialState: DoctorsListState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDoctorsList = createAsyncThunk<
  DoctorData[],
  void,
  { rejectValue: string }
>("doctorsList/fetchDoctorsList", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<DoctorData[]>("appointments/doctors/");
    return response.data;
  } catch (error: any) {
    const detail =
      error?.response?.data?.detail ||
      error?.message ||
      "Не удалось загрузить список врачей.";
    return rejectWithValue(detail);
  }
});

const doctorsListSlice = createSlice({
  name: "doctorsList",
  initialState,
  reducers: {
    clearDoctorsList(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDoctorsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при загрузке списка Врачей.";
      });
  },
});

export const { clearDoctorsList } = doctorsListSlice.actions;
export default doctorsListSlice.reducer;
