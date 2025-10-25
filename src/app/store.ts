import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/entities/profile/model/profileSlice";
import patientsReducer from "@/entities/patient/model/patientsSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    patients: patientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
