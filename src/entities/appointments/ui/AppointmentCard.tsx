import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  FiCalendar,
  FiCheck,
  FiDollarSign,
  FiEdit2,
  FiMessageSquare,
  FiX,
} from "react-icons/fi";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useState, useEffect } from "react";
import type { Appointment } from "../model/types";
import ShowMoreAppointment from "@/widgets/AppointmentsList/ShowMoreAppoiment";
import AppointmentStatusBadge from "@/entities/appointments/ui/AppointmentStatusBadge";
import ValidatedCostInput from "@/shared/ui/ValidatedCostInput";
import { FormProvider, useForm } from "react-hook-form";

interface AppointmentCardProps {
  appointment: Appointment;
  onConfirm: (id: number) => Promise<void>;
  onSaveCost: (id: number, cost: number) => Promise<void>;
}

export const AppointmentCard = ({
  appointment,
  onConfirm,
  onSaveCost,
}: AppointmentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const borderClr = useColorModeValue("gray.200", "gray.700");
  const bgCard = useColorModeValue("white", "gray.800");
  const textMuted = useColorModeValue("gray.600", "gray.400");

  const form = useForm<{ cost: number | null }>({
    defaultValues: { cost: appointment.cost },
  });

  const { handleSubmit, reset } = form;

  const handleSave = async (data: { cost: number | null }) => {
    if (data.cost === null) return;
    setIsSaving(true);
    await onSaveCost(appointment.id, data.cost);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleConfirm = async () => {
    setIsUpdating(true);
    await onConfirm(appointment.id);
    setIsUpdating(false);
  };

  const cancelEdit = () => {
    reset({ cost: appointment.cost });
    setIsEditing(false);
  };

  useEffect(() => {
    if (appointment.status === "done" && isEditing) {
      cancelEdit();
    }
  }, [appointment.status]);

  return (
    <Card.Root
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderClr}
      bg={bgCard}
      boxShadow="sm"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.2s ease"
      opacity={isUpdating ? 0.6 : 1}
      position="relative"
    >
      {(isSaving || isUpdating) && (
        <Flex
          justify="center"
          align="center"
          position="absolute"
          inset={0}
          bg={useColorModeValue("rgba(255,255,255,0.6)", "rgba(0,0,0,0.5)")}
          borderRadius="xl"
          zIndex={2}
        >
          <Spinner size="lg" />
        </Flex>
      )}

      <Card.Header pb={2}>
        <Box mb={1}>
          <Heading size="sm">{appointment.patient_full_name}</Heading>
        </Box>
        <Flex justifyContent={"space-between"} alignItems={"baseline"}>
          <Text fontSize="sm" color={textMuted}>
            Пациент ID: {appointment.patient_id}
          </Text>
          <AppointmentStatusBadge status={appointment.status} />
        </Flex>
      </Card.Header>

      <Card.Body pt={2}>
        <Flex align="center" mb={2}>
          <FiCalendar style={{ marginRight: 6 }} />
          <Text fontSize="sm">
            {new Date(appointment.date).toLocaleString("ru-RU", {
              timeZone: "UTC",
            })}
          </Text>
        </Flex>

        <Flex align="center" mb={2}>
          <FiMessageSquare style={{ marginRight: 6 }} />
          <Text fontSize="sm">{appointment.notes || "Без заметок"}</Text>
        </Flex>

        <Flex align="center" justify="space-between">
          <Flex align="center">
            <FiDollarSign style={{ marginRight: 6 }} />

            {isEditing ? (
              <FormProvider {...form}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <ValidatedCostInput
                    name="cost"
                    required="Стоимость обязательна"
                    placeholder="Стоимость (сум)"
                  />
                </form>
              </FormProvider>
            ) : (
              <Text fontSize="sm" fontWeight="medium">
                {Number(appointment.cost).toLocaleString("ru-RU")} сум
              </Text>
            )}
          </Flex>

          {appointment.status === "done" ? null : isEditing ? (
            <Flex gap={1}>
              <IconButton
                aria-label="Сохранить"
                size="xs"
                colorScheme="green"
                onClick={handleSubmit(handleSave)}
                disabled={isSaving}
              >
                <FiCheck />
              </IconButton>
              <IconButton
                aria-label="Отменить"
                size="xs"
                colorScheme="red"
                onClick={cancelEdit}
                disabled={isSaving}
              >
                <FiX />
              </IconButton>
            </Flex>
          ) : (
            <IconButton
              aria-label="Редактировать стоимость"
              size="xs"
              variant="ghost"
              onClick={() => {
                setIsEditing(true);
                reset({ cost: appointment.cost });
              }}
            >
              <FiEdit2 />
            </IconButton>
          )}
        </Flex>
      </Card.Body>

      <Card.Footer justifyContent="space-between" alignItems="center">
        <Text fontSize="xs" color={textMuted}>
          ID: {appointment.id}
        </Text>
        <Flex gap={1}>
          <ShowMoreAppointment patientId={appointment.patient_id} />
          <IconButton
            aria-label="Подтвердить"
            size="sm"
            backgroundColor="teal"
            color="white"
            variant="solid"
            onClick={handleConfirm}
            disabled={appointment.status === "done"}
          >
            <FiCheck />
          </IconButton>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};
