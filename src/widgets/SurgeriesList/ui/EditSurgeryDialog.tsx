import {
  type SurgeryUpdateRequest,
  type SurgeryData,
} from "@/entities/surgery/model/types";
import {
  Button,
  CloseButton,
  Dialog,
  Heading,
  IconButton,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { GoPencil } from "react-icons/go";
import { useEffect, useState } from "react";
import ValidatedInput from "@/features/auth/ui/ValidatedInput";
import { ValidatedDateTimeInput } from "@/shared/ui/DateTimeInput";
import CustomSelect from "@/shared/ui/CustomSelect";
import { useAppDispatch } from "@/shared/model/hooks";
import { toaster } from "@/components/ui/toaster";
import { fetchDefaultSurgeries } from "@/entities/surgery/model/surgerySlice";
import { updateSurgery } from "@/entities/surgery/api/surgeriesApi";

const outcomeOptions = [
  { label: "Успешно", value: "successful" },
  { label: "Неудачно", value: "unsuccessful" },
  { label: "Нет улучшений", value: "no_improvement" },
];

interface EditSurgeryDialogProps {
  surgery: SurgeryData;
  onSuccess?: () => void;
}

const EditSurgeryDialog = ({ surgery, onSuccess }: EditSurgeryDialogProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const form = useForm<SurgeryUpdateRequest>({
    defaultValues: {
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

  useEffect(() => {
    if (open) {
      const startTime = new Date(surgery.start_time).toISOString().slice(0, 16);
      const endTime = new Date(surgery.end_time).toISOString().slice(0, 16);
      form.reset({
        operation_name: surgery.operation_name,
        operation_date: surgery.operation_date,
        start_time: startTime,
        end_time: endTime,
        pre_op_days: surgery.pre_op_days,
        post_op_days: surgery.post_op_days,
        notes: surgery.notes,
        complications: surgery.complications,
        outcome: surgery.outcome,
        additional_data: surgery.additional_data,
      });
    }
  }, [open, surgery, form]);

  async function onSubmit(data: SurgeryUpdateRequest) {
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

    try {
      await updateSurgery(surgery.id, data);
      toaster.create({
        title: "Операция обновлена",
        description: "Операция успешно обновлена",
        type: "success",
      });
      form.reset();
      setOpen(false);
      dispatch(fetchDefaultSurgeries());
      onSuccess?.();
    } catch (error) {
      toaster.create({
        title: "Ошибка обновления операции",
        description:
          "Не удалось обновить операцию. Проверьте введенные данные.",
        type: "error",
      });
    }
  }

  register("outcome", { required: "Выберите исход операции" });

  const getFieldError = (errors: any, field: keyof SurgeryUpdateRequest) =>
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
        <IconButton backgroundColor={"teal"} color={"white"} size="xs">
          <GoPencil />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={6}>
            <Dialog.Header>
              <Heading size={"md"} fontWeight="bold" fontSize="lg">
                Редактирование операции
              </Heading>
              <Dialog.CloseTrigger asChild>
                <CloseButton />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <VStack align="stretch" gap={4}>
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
                      {isSubmitting ? "Обновление..." : "Обновить Операцию"}
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

export default EditSurgeryDialog;
