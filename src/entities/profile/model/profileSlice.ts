// import api from "@/app/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Profile, ProfileState } from "./types";
import api from "@/app/api";

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
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.detail || "Ошибка при загрузке профиля");
    }
  }
);

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
