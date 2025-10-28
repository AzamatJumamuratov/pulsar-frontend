import { Box, Heading, Spinner, SimpleGrid } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { useEffect } from "react";
import { fetchAppointmentsList } from "@/entities/appointments/model/appointmentsSlice";
import { useColorModeValue } from "@/components/ui/color-mode";

import { AppointmentCard } from "@/entities/appointments/ui/AppointmentCard";
import { appointmentsApi } from "@/entities/appointments/api/appointmentsApi";

export default function AppointmentsList() {
  const dispatch = useAppDispatch();
  const {
    data: appointments,
    loading,
    error,
  } = useAppSelector((s) => s.appointments);

  const textMuted = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    dispatch(fetchAppointmentsList());
  }, [dispatch]);

  const handleConfirm = async (id: number) => {
    await appointmentsApi.confirmAppointment(id);
    dispatch(fetchAppointmentsList());
  };

  const handleUpdateCost = async (id: number, cost: number) => {
    await appointmentsApi.updateCost(id, cost);
    dispatch(fetchAppointmentsList());
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
        Назначений пока нет.
      </Box>
    );

  return (
    <Box mt={8}>
      <Heading size="md" mb={4}>
        Список приёмов
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
        {appointments.map((a) => (
          <AppointmentCard
            key={a.id}
            appointment={a}
            onConfirm={handleConfirm}
            onSaveCost={handleUpdateCost}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
