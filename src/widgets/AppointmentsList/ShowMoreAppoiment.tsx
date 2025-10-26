import { useState } from "react";
import {
  Button,
  Dialog,
  Flex,
  Text,
  IconButton,
  Spinner,
  Box,
  Portal,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { PatientData } from "@/entities/patient/model/types";
import api from "@/app/api";

import { FiEye } from "react-icons/fi";

interface ShowMoreAppointmentProps {
  patientId: number;
}

export default function ShowMoreAppointment({
  patientId,
}: ShowMoreAppointmentProps) {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labelColor = useColorModeValue("gray.600", "gray.400");
  const valueColor = useColorModeValue("gray.900", "gray.100");
  const titleColor = useColorModeValue("gray.800", "gray.100");
  const bgColor = useColorModeValue("white", "gray.800");

  const fetchPatient = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get<PatientData>(
        `/appointments/patients/${patientId}`
      );
      setPatient(res.data);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.detail) {
        setError(error?.response?.data?.detail);
      } else setError("Не удалось загрузить данные пациента.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    fetchPatient();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(details) => setOpen(details.open)}>
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Показать подробнее"
          size="sm"
          colorPalette="teal"
          onClick={handleOpen}
        >
          <FiEye />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            maxW="600px"
            p={6}
            borderRadius="xl"
            bg={bgColor}
            boxShadow="lg"
          >
            <Dialog.Header>
              <Dialog.Title fontSize="xl" fontWeight="bold" color={titleColor}>
                Информация о пациенте
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              {loading ? (
                <Flex justify="center" py={10}>
                  <Spinner size="lg" />
                </Flex>
              ) : error ? (
                <Text color="red.500" textAlign="center">
                  {error}
                </Text>
              ) : patient ? (
                <Flex direction="column" gap={3}>
                  {Object.entries({
                    "Полное имя": patient.full_name,
                    "Дата рождения": patient.birth_date,
                    Пол: patient.gender === "male" ? "Мужской" : "Женский",
                    Телефон: patient.phone,
                    Паспорт: patient.passport,
                    Адрес: patient.address,
                    "Эл. почта": patient.email,
                    UID: patient.patient_uid,
                    Создан: new Date(patient.created_at).toLocaleString(),
                  }).map(([label, value]) => (
                    <Flex
                      key={label}
                      justify="space-between"
                      alignItems="center"
                      gap={8}
                    >
                      <Text
                        fontWeight="medium"
                        color={labelColor}
                        minW="180px"
                        textAlign="right"
                      >
                        {label}
                      </Text>
                      <Text
                        fontWeight="semibold"
                        color={valueColor}
                        textAlign="left"
                        flex="1"
                      >
                        {value}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              ) : (
                <Box textAlign="center" py={6} color={labelColor}>
                  Нет данных для отображения.
                </Box>
              )}
            </Dialog.Body>

            <Dialog.Footer justifyContent="flex-end">
              <Dialog.ActionTrigger asChild>
                <Button colorPalette="teal">Закрыть</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
