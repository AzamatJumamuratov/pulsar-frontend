import {
  Box,
  Heading,
  Spinner,
  SimpleGrid,
  Text,
  Card,
  Badge,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { useEffect, useState } from "react";
import { fetchAppointmentsList } from "@/entities/appointments/model/appointmentsSlice";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import {
  FiCheck,
  FiCalendar,
  FiMessageSquare,
  FiDollarSign,
} from "react-icons/fi";
import ShowMoreAppointment from "./ShowMoreAppoiment";
import api from "@/app/api";

const AppointmentsList = () => {
  const dispatch = useAppDispatch();
  const {
    data: appointments,
    loading,
    error,
  } = useAppSelector((s) => s.appointments);

  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchAppointmentsList());
  }, [dispatch]);

  const bgCard = useColorModeValue("white", "gray.800");
  const textMuted = useColorModeValue("gray.600", "gray.400");
  const borderClr = useColorModeValue("gray.200", "gray.700");

  const handleConfirm = async (id: number) => {
    try {
      setUpdatingId(id);
      await api.patch(`/appointments/my/${id}/finish`);
      toaster.create({
        title: `Приём #${id} успешно подтверждён.`,
        type: "success",
        duration: 2000,
      });
      await dispatch(fetchAppointmentsList());
    } catch (error) {
      toaster.create({
        title: `Не удалось подтвердить приём #${id}`,
        type: "error",
        duration: 3000,
      });
    } finally {
      setUpdatingId(null);
    }
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
        {appointments.map((a) => {
          const statusColor =
            a.status === "done"
              ? "green"
              : a.status === "scheduled"
              ? "blue"
              : "gray";
          const statusText = a.status === "done" ? "Завершён" : "Запланирован";

          const isUpdating = updatingId === a.id;

          return (
            <Card.Root
              key={a.id}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderClr}
              bg={bgCard}
              boxShadow="sm"
              _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.2s ease"
              opacity={isUpdating ? 0.6 : 1}
              pointerEvents={isUpdating ? "none" : "auto"}
            >
              {isUpdating && (
                <Flex
                  justify="center"
                  align="center"
                  position="absolute"
                  inset={0}
                  bg="rgba(0,0,0,0.05)"
                  borderRadius="xl"
                >
                  <Spinner size="lg" />
                </Flex>
              )}

              <Card.Header pb={2}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Heading size="sm">{a.doctor_name}</Heading>
                    <Text fontSize="sm" color={textMuted}>
                      Пациент ID: {a.patient_id}
                    </Text>
                  </Box>
                  <Badge colorScheme={statusColor}>{statusText}</Badge>
                </Flex>
              </Card.Header>

              <Card.Body pt={2}>
                <Flex align="center" mb={2}>
                  <FiCalendar style={{ marginRight: 6 }} />
                  <Text fontSize="sm">{new Date(a.date).toLocaleString()}</Text>
                </Flex>

                <Flex align="center" mb={2}>
                  <FiMessageSquare style={{ marginRight: 6 }} />
                  <Text fontSize="sm">{a.notes || "Без заметок"}</Text>
                </Flex>

                <Flex align="center">
                  <FiDollarSign style={{ marginRight: 6 }} />
                  <Text fontSize="sm" fontWeight="medium">
                    {a.cost.toLocaleString()} сум
                  </Text>
                </Flex>
              </Card.Body>

              <Card.Footer justifyContent="space-between" alignItems="center">
                <Text fontSize="xs" color={textMuted}>
                  ID: {a.id}
                </Text>
                <Flex gap={2}>
                  <ShowMoreAppointment patientId={a.patient_id} />
                  <IconButton
                    aria-label="Подтвердить"
                    size="sm"
                    backgroundColor="teal"
                    color="white"
                    variant="solid"
                    onClick={() => handleConfirm(a.id)}
                    disabled={a.status === "done"}
                  >
                    <FiCheck />
                  </IconButton>
                </Flex>
              </Card.Footer>
            </Card.Root>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default AppointmentsList;
