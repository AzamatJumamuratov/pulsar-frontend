import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/entities/profile/model/profileSlice";
import patientsReducer from "@/entities/patient/model/patientsSlice";
import doctorsListReducer from "@/entities/doctorsList/model/doctorsSlice";
import appointmentsReducer from "@/entities/appointments/model/appointmentsSlice";
import surgeriesReducer from "@/entities/surgery/model/surgerySlice";
import uiReducer from "@/app/uiSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    patients: patientsReducer,
    appointments: appointmentsReducer,
    doctorsList: doctorsListReducer,
    surgeries: surgeriesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
