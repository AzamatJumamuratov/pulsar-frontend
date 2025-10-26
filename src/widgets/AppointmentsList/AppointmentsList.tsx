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
  FiEdit2,
  FiX,
} from "react-icons/fi";
import ShowMoreAppointment from "./ShowMoreAppoiment";
import api from "@/app/api";
import { FormattedNumberInput } from "@/shared/ui/FormattedNumberInput";

const AppointmentsList = () => {
  const dispatch = useAppDispatch();
  const {
    data: appointments,
    loading,
    error,
  } = useAppSelector((s) => s.appointments);

  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedCost, setEditedCost] = useState<string>("");
  const [savingId, setSavingId] = useState<number | null>(null);

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
    } catch {
      toaster.create({
        title: `Не удалось подтвердить приём #${id}`,
        type: "error",
        duration: 3000,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveCost = async (id: number) => {
    const parsed = Number(
      String(editedCost).replace(/\s+/g, "").replace(/,/g, ".")
    );
    if (!isFinite(parsed) || parsed < 0) {
      toaster.create({
        title: "Неверная сумма",
        description: "Введите корректное числовое значение стоимости.",
        type: "error",
        duration: 3500,
      });
      return;
    }

    try {
      setSavingId(id);
      const payload = { cost: parsed };
      const res = await api.patch(`/appointments/my/${id}/cost`, payload);

      toaster.create({
        title: "Стоимость обновлена",
        description: `Новая стоимость: ${Number(
          res.data.cost ?? parsed
        ).toLocaleString()} сум`,
        type: "success",
        duration: 2500,
      });

      setEditingId(null);
      setEditedCost("");
      await dispatch(fetchAppointmentsList());
    } catch (err: any) {
      const detail =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Не удалось изменить стоимость. Попробуйте ещё раз.";
      toaster.create({
        title: "Ошибка при сохранении",
        description: String(detail),
        type: "error",
        duration: 4000,
      });
    } finally {
      setSavingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedCost("");
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
          const isEditing = editingId === a.id;
          const isSaving = savingId === a.id;

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
              position="relative"
            >
              {(isUpdating || isSaving) && (
                <Flex
                  justify="center"
                  align="center"
                  position="absolute"
                  inset={0}
                  bg={useColorModeValue(
                    "rgba(255,255,255,0.6)",
                    "rgba(0,0,0,0.5)"
                  )}
                  borderRadius="xl"
                  zIndex={2}
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
                      />
                    ) : (
                      <Text fontSize="sm" fontWeight="medium">
                        {Number(a.cost).toLocaleString("ru-RU")} сум
                      </Text>
                    )}
                  </Flex>

                  {isEditing ? (
                    <Flex gap={1}>
                      <IconButton
                        aria-label="Сохранить"
                        size="xs"
                        colorScheme="green"
                        onClick={() => handleSaveCost(a.id)}
                        disabled={isSaving}
                      >
                        <FiCheck />
                      </IconButton>
                      <IconButton
                        aria-label="Отменить"
                        size="xs"
                        colorScheme="red"
                        onClick={handleCancelEdit}
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
                        setEditingId(a.id);
                        setEditedCost(String(a.cost));
                      }}
                    >
                      <FiEdit2 />
                    </IconButton>
                  )}
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
