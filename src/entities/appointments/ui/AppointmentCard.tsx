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
import { FormattedNumberInput } from "@/shared/ui/FormattedNumberInput";
import { useState } from "react";
import type { Appointment } from "../model/types";
import ShowMoreAppointment from "@/widgets/AppointmentsList/ShowMoreAppoiment";
import AppointmentStatusBadge from "@/entities/appointments/ui/AppointmentStatusBadge";

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
  const [editedCost, setEditedCost] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const borderClr = useColorModeValue("gray.200", "gray.700");
  const bgCard = useColorModeValue("white", "gray.800");
  const textMuted = useColorModeValue("gray.600", "gray.400");

  const handleSave = async () => {
    const parsed = Number(editedCost.replace(/\s+/g, "").replace(/,/g, "."));
    if (!isFinite(parsed) || parsed < 0) return;
    setIsSaving(true);
    await onSaveCost(appointment.id, parsed);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleConfirm = async () => {
    setIsUpdating(true);
    await onConfirm(appointment.id);
    setIsUpdating(false);
  };

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
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="sm">{appointment.patient_full_name}</Heading>
            <Text fontSize="sm" color={textMuted}>
              Пациент ID: {appointment.patient_id}
            </Text>
          </Box>
          <AppointmentStatusBadge status={appointment.status} />
        </Flex>
      </Card.Header>

      <Card.Body pt={2}>
        <Flex align="center" mb={2}>
          <FiCalendar style={{ marginRight: 6 }} />
          <Text fontSize="sm">
            {new Date(appointment.date).toLocaleString()}
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
              <FormattedNumberInput
                size="sm"
                value={editedCost}
                onChange={(val) => setEditedCost(String(val))}
                w="100px"
                disabled={isSaving}
                placeholder="Стоимость"
              />
            ) : (
              <Text fontSize="sm" fontWeight="medium">
                {Number(appointment.cost).toLocaleString("ru-RU")} сум
              </Text>
            )}
          </Flex>

          {isEditing ? (
            <Flex gap={1}>
              <IconButton
                aria-label="Сохранить"
                size="xs"
                colorScheme="green"
                onClick={handleSave}
                disabled={isSaving}
              >
                <FiCheck />
              </IconButton>
              <IconButton
                aria-label="Отменить"
                size="xs"
                colorScheme="red"
                onClick={() => setIsEditing(false)}
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
                setEditedCost(String(appointment.cost));
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
