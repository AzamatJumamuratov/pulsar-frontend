import { useState } from "react";
import { useForm } from "react-hook-form";
import type { PatientData } from "@/entities/patient/model/types";
import type { PatientCreateAndEditRequest } from "@/entities/patient/model/types";
import { EditPatient } from "@/entities/patient/api/patientsApi";
// import { toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "@/shared/model/hooks";
import { fetchDefaultPatients } from "@/entities/patient/model/patientsSlice";

export function useEditPatientDialog(initialPatient: PatientData | null) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<PatientCreateAndEditRequest>({
    defaultValues: initialPatient || {
      full_name: "",
      birth_date: "",
      gender: "male",
      phone: "",
      passport: "",
      address: "",
    },
  });
  const dispatch = useAppDispatch();

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    form.reset(initialPatient || {});
  };

  const onSubmit = async (data: PatientCreateAndEditRequest) => {
    if (!initialPatient) return;
    const updated = await EditPatient(initialPatient.id, data);
    if (updated) {
      // toaster.create({
      //   description: "Данные успешно обновлены",
      //   type: "success",
      // });
      dispatch(fetchDefaultPatients());
      close();
    }
  };

  return { isOpen, open, close, form, onSubmit };
}
