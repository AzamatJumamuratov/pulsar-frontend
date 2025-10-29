import { Box, Card, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import {
  FiCalendar,
  FiDollarSign,
  FiMessageSquare,
  FiCreditCard,
  FiUser,
} from "react-icons/fi";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useState } from "react";
import { useAppSelector } from "@/shared/model/hooks";
import type { Appointment } from "../model/types";
import ShowMoreAppointment from "@/widgets/AppointmentsList/ShowMoreAppoiment";
import AppointmentStatusBadge from "@/entities/appointments/ui/AppointmentStatusBadge";

interface ReceptionAppointmentCardProps {
  appointment: Appointment;
  onPay: (id: number) => Promise<void>;
}

export const ReceptionAppointmentCard = ({
  appointment,
  onPay,
}: ReceptionAppointmentCardProps) => {
  const [isPaying, setIsPaying] = useState(false);
  const borderClr = useColorModeValue("gray.200", "gray.700");
  const bgCard = useColorModeValue("white", "gray.800");
  const textMuted = useColorModeValue("gray.600", "gray.400");

  const { data: doctors } = useAppSelector((s) => s.doctorsList);
  const doctor = doctors.find((d) => d.id === appointment.doctor_id);

  const handlePay = async () => {
    setIsPaying(true);
    await onPay(appointment.id);
    setIsPaying(false);
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
    >
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
          <FiUser style={{ marginRight: 6 }} />
          <Text fontSize="sm" fontWeight="medium">
            {doctor?.full_name || "Неизвестен"}
          </Text>
        </Flex>

        <Flex align="center" mb={2}>
          <FiMessageSquare style={{ marginRight: 6 }} />
          <Text fontSize="sm">{appointment.notes || "Без заметок"}</Text>
        </Flex>

        <Flex align="center">
          <FiDollarSign style={{ marginRight: 6 }} />
          <Text fontSize="sm" fontWeight="medium">
            {Number(appointment.cost).toLocaleString("ru-RU")} сум
          </Text>
        </Flex>
      </Card.Body>

      <Card.Footer justifyContent="space-between" alignItems="center">
        <Text fontSize="xs" color={textMuted}>
          ID: {appointment.id}
        </Text>
        <Flex gap={1}>
          <ShowMoreAppointment patientId={appointment.patient_id} />
          <IconButton
            aria-label="Оплатить"
            size="sm"
            backgroundColor="teal"
            color="white"
            variant="solid"
            onClick={handlePay}
            disabled={isPaying}
          >
            <FiCreditCard />
          </IconButton>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};
