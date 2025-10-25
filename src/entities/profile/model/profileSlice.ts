// import api from "@/app/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Profile, ProfileState } from "./types";

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const fetchProfile = createAsyncThunk<Profile>(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // throw new Error("Сервер временно недоступен");

      // Если бы ошибки не было, вернули бы профиль
      return { name: "Иван Иванов", role: "doctor" };
    } catch (error: any) {
      return rejectWithValue(error?.message || "Ошибка при загрузке профиля");
    }
  }
);

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
