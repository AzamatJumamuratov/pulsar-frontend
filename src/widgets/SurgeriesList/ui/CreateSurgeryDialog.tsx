import { type SurgeryCreateRequest } from "@/entities/surgery/model/types";
import {
  Button,
  CloseButton,
  Dialog,
  Heading,
  Icon,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import { PatientSearchSelect } from "./PatientSearchSelect";
import { useState } from "react";
import { type PatientData } from "@/entities/patient/model/types";
import ValidatedInput from "@/features/auth/ui/ValidatedInput";
import { ValidatedDateTimeInput } from "@/shared/ui/DateTimeInput";
import CustomSelect from "@/shared/ui/CustomSelect";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { toaster } from "@/components/ui/toaster";
import { createSurgery } from "@/entities/surgery/api/surgeriesApi";
import { fetchDefaultSurgeries } from "@/entities/surgery/model/surgerySlice";

const outcomeOptions = [
  { label: "Успешно", value: "successful" },
  { label: "Неудачно", value: "unsuccessful" },
  { label: "Нет улучшений", value: "no_improvement" },
];

const CreateSurgeryDialog = () => {
  const dispatch = useAppDispatch();
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const { data: profile } = useAppSelector((state) => state.profile);

  const form = useForm<SurgeryCreateRequest>({
    defaultValues: {
      patient_id: 0,
      surgeon_id: profile?.id || 0,
      operation_name: "",
      operation_date: "",
      start_time: "",
      end_time: "",
      pre_op_days: 0,
      post_op_days: 0,
      notes: "",
      complications: "",
      outcome: "",
      additional_data: {},
    },
  });
  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(data: SurgeryCreateRequest) {
    const startTime = new Date(data.start_time);
    const endTime = new Date(data.end_time);

    if (startTime >= endTime) {
      form.setError("start_time", {
        type: "manual",
        message: "Время начала должно быть раньше времени окончания",
      });
      form.setError("end_time", {
        type: "manual",
        message: "Время окончания должно быть позже времени начала",
      });
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    const surgeryData = {
      ...data,
      operation_date: currentDate,
    };

    try {
      await createSurgery(surgeryData);
      toaster.create({
        title: "Операция создана",
        description: "Операция успешно добавлена в список",
        type: "success",
      });
      form.reset();
      setOpen(false);
      setSelectedPatient(null);
      dispatch(fetchDefaultSurgeries());
    } catch {
      toaster.create({
        title: "Ошибка создания операции",
        description: "Не удалось создать операцию. Проверьте введенные данные.",
        type: "error",
      });
    }
  }

  register("patient_id", { required: "Выберите пациента" });
  register("outcome", { required: "Выберите исход операции" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFieldError = (errors: any, field: keyof SurgeryCreateRequest) =>
    errors[field];
  return (
    <Dialog.Root
      placement={"center"}
      size={{ smDown: "full", mdDown: "xs", md: "lg" }}
      closeOnInteractOutside={!isSubmitting}
      closeOnEscape={!isSubmitting}
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <Dialog.Trigger asChild>
        <Button backgroundColor="teal" color={"white"}>
          Добавить операцию
          <Icon as={GoPlus} ml={2} />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={6}>
            <Dialog.Header>
              <Heading size={"md"} fontWeight="bold" fontSize="lg">
                Создание операции
              </Heading>
              <Dialog.CloseTrigger asChild>
                <CloseButton />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <VStack align="stretch" gap={4}>
                    <PatientSearchSelect
                      onSelect={(patient) => {
                        if (patient) {
                          setValue("patient_id", patient.id, {
                            shouldValidate: true,
                          });
                          setSelectedPatient(patient);
                        } else {
                          setValue("patient_id", 0, {
                            shouldValidate: true,
                          });
                          setSelectedPatient(null);
                        }
                      }}
                      selectedPatient={selectedPatient}
                    />
                    {getFieldError(errors, "patient_id") && (
                      <Text color="red.500" fontSize="sm">
                        {getFieldError(errors, "patient_id")?.message ||
                          "Выберите пациента"}
                      </Text>
                    )}

                    <ValidatedInput
                      label="Название операции"
                      placeholder="Введите название операции"
                      register={register("operation_name", {
                        required: "Название операции обязательно",
                      })}
                      error={getFieldError(errors, "operation_name")}
                    />

                    <VStack align="stretch">
                      <Text fontWeight="medium">Время начала операции</Text>
                      <ValidatedDateTimeInput
                        name="start_time"
                        type="datetime-local"
                        required="Укажите время начала операции"
                        requiredMessage="Укажите время начала операции"
                      />
                    </VStack>

                    <VStack align="stretch">
                      <Text fontWeight="medium">Время окончания операции</Text>
                      <ValidatedDateTimeInput
                        name="end_time"
                        type="datetime-local"
                        required="Укажите время окончания операции"
                        requiredMessage="Укажите время окончания операции"
                      />
                    </VStack>

                    <ValidatedInput
                      label="Дни до операции"
                      placeholder="0"
                      type="number"
                      register={register("pre_op_days", {
                        valueAsNumber: true,
                      })}
                      error={getFieldError(errors, "pre_op_days")}
                    />

                    <ValidatedInput
                      label="Дни после операции"
                      placeholder="0"
                      type="number"
                      register={register("post_op_days", {
                        valueAsNumber: true,
                      })}
                      error={getFieldError(errors, "post_op_days")}
                    />

                    <VStack align="stretch">
                      <Text fontWeight="medium">Исход операции</Text>
                      <CustomSelect
                        placeholder="Выберите исход"
                        items={outcomeOptions}
                        value={watch("outcome")}
                        onChange={(value: string) =>
                          setValue("outcome", value, {
                            shouldValidate: true,
                          })
                        }
                      />
                      {getFieldError(errors, "outcome") && (
                        <Text color="red.500" fontSize="sm">
                          {getFieldError(errors, "outcome")?.message ||
                            "Выберите исход операции"}
                        </Text>
                      )}
                    </VStack>

                    <ValidatedInput
                      label="Осложнения"
                      placeholder="Опишите осложнения (если есть)"
                      register={register("complications", {
                        required: false,
                      })}
                      error={getFieldError(errors, "complications")}
                    />

                    <ValidatedInput
                      label="Примечания"
                      placeholder="Дополнительные примечания"
                      register={register("notes", {
                        required: false,
                      })}
                      error={getFieldError(errors, "notes")}
                    />
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      backgroundColor={"teal"}
                      color={"white"}
                    >
                      {isSubmitting ? "Создание..." : "Создать Операцию"}
                    </Button>
                  </VStack>
                </form>
              </FormProvider>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CreateSurgeryDialog;
