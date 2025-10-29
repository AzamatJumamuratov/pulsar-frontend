import { Box, Heading, Spinner, SimpleGrid } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { useEffect } from "react";
import { fetchReceptionDoneAppointments } from "@/entities/appointments/model/appointmentsSlice";
import { useColorModeValue } from "@/components/ui/color-mode";

import { ReceptionAppointmentCard } from "@/entities/appointments/ui/ReceptionAppointmentCard";
import { payAppointment } from "@/entities/appointments/api/appointmentsApi";

export default function ReceptionDoneAppointments() {
  const dispatch = useAppDispatch();
  const {
    receptionDone: appointments,
    receptionDoneLoading: loading,
    receptionDoneError: error,
  } = useAppSelector((s) => s.appointments);

  const textMuted = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    dispatch(fetchReceptionDoneAppointments());
  }, [dispatch]);

  const handlePay = async (id: number) => {
    await payAppointment(id);
    dispatch(fetchReceptionDoneAppointments());
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <Spinner size="lg" />
      </Box>
    );

  if (error)
    return (
      <Box color="red.500" textAlign="center" py={8}>
        {error}
      </Box>
    );

  if (appointments.length === 0)
    return (
      <Box textAlign="center" py={10} color={textMuted}>
        Завершённых назначений пока нет.
      </Box>
    );

  return (
    <Box mt={8}>
      <Heading size="md" mb={6}>
        Завершённые приёмы
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
        {appointments.map((a) => (
          <ReceptionAppointmentCard
            key={a.id}
            appointment={a}
            onPay={handlePay}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
