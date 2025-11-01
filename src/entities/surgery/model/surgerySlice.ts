// src/entities/surgery/model/surgerySlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/app/api";
import {
  createSurgery,
  updateSurgery,
  deleteSurgery,
} from "../api/surgeriesApi";
import type {
  SurgeriesState,
  SurgeriesResponse,
  SurgeryCreateRequest,
  SurgeryUpdateRequest,
  SurgeryData,
} from "./types";

const initialState: SurgeriesState = {
  data: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const fetchDefaultSurgeries = () =>
  fetchSurgeries({ page: 1, limit: 10 });

export const createNewSurgery = createAsyncThunk<
  SurgeryData,
  SurgeryCreateRequest,
  { rejectValue: string }
>("surgeries/createSurgery", async (data, { rejectWithValue }) => {
  try {
    const response = await createSurgery(data);
    return response;
  } catch (error: any) {
    const detail =
      error?.response?.data?.detail ||
      error?.message ||
      "Не удалось создать операцию.";
    return rejectWithValue(detail);
  }
});

export const updateExistingSurgery = createAsyncThunk<
  SurgeryData,
  { id: number; data: SurgeryUpdateRequest },
  { rejectValue: string }
>("surgeries/updateSurgery", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await updateSurgery(id, data);
    return response;
  } catch (error: any) {
    const detail =
      error?.response?.data?.detail ||
      error?.message ||
      "Не удалось обновить операцию.";
    return rejectWithValue(detail);
  }
});

export const deleteExistingSurgery = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("surgeries/deleteSurgery", async (surgeryId, { rejectWithValue }) => {
  try {
    await deleteSurgery(surgeryId);
    return surgeryId;
  } catch (error: any) {
    const detail =
      error?.response?.data?.detail ||
      error?.message ||
      "Не удалось удалить операцию.";
    return rejectWithValue(detail);
  }
});

export const fetchSurgeries = createAsyncThunk<
  SurgeriesResponse,
  {
    page: number;
    limit: number;
    search?: string;
    patient_id?: number;
    surgeon_id?: number;
  },
  { rejectValue: string }
>(
  "surgeries/fetchSurgeries",
  async (
    { page, limit, search, patient_id, surgeon_id },
    { rejectWithValue }
  ) => {
    try {
      const skip = (page - 1) * limit;
      const params: any = { skip, limit };
      if (search) params.search = search;
      if (patient_id) params.patient_id = patient_id;
      if (surgeon_id) params.surgeon_id = surgeon_id;
      const response = await api.get<SurgeriesResponse>("/surgeries/", {
        params,
      });
      return response.data;
    } catch (error: any) {
      const detail =
        error?.response?.data?.detail ||
        error?.message ||
        "Не удалось загрузить список операций.";
      return rejectWithValue(detail);
    }
  }
);

const surgerySlice = createSlice({
  name: "surgeries",
  initialState,
  reducers: {
    clearSurgeries(state) {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurgeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurgeries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalCount = action.payload.total_count;
      })
      .addCase(fetchSurgeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при загрузке операций.";
      })
      .addCase(createNewSurgery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewSurgery.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
      })
      .addCase(createNewSurgery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при создании операции.";
      })
      .addCase(updateExistingSurgery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingSurgery.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateExistingSurgery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при обновлении операции.";
      })
      .addCase(deleteExistingSurgery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingSurgery.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (surgery) => surgery.id !== action.payload
        );
      })
      .addCase(deleteExistingSurgery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при удалении операции.";
      });
  },
});

export const { clearSurgeries } = surgerySlice.actions;
export default surgerySlice.reducer;
