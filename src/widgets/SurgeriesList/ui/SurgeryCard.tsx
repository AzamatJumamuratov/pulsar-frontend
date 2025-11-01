import {
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useAppSelector } from "@/shared/model/hooks";
import type { SurgeryData } from "@/entities/surgery/model/types";
import EditSurgeryDialog from "./EditSurgeryDialog";
import DeleteSurgeryDialog from "./DeleteSurgeryDialog";

interface SurgeryCardProps {
  surgery: SurgeryData;
  showSurgeonName?: boolean;
  showDeleteButton?: boolean;
  onDelete?: (surgeryId: number) => Promise<void>;
}

export function SurgeryCard({
  surgery,
  showSurgeonName = false,
  showDeleteButton = false,
  onDelete,
}: SurgeryCardProps) {
  const textMuted = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { data: doctors } = useAppSelector((s) => s.doctorsList);
  const surgeon = doctors.find((d) => d.id === surgery.surgeon_id);

  return (
    <Box
      p={4}
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      shadow="sm"
    >
      <VStack align="start" gap={2}>
        <HStack justify="space-between" w="full">
          <Heading size="sm" color="teal.600">
            {surgery.operation_name}
          </Heading>
        </HStack>
        <Text fontSize="sm" color={textMuted}>
          Пациент: {surgery.patient_full_name}
        </Text>
        {showSurgeonName && (
          <Text fontSize="sm" color={textMuted}>
            Хирург: {surgeon?.full_name || surgery.surgeon_full_name}
          </Text>
        )}
        <Text fontSize="sm" color={textMuted}>
          Дата операции:{" "}
          {new Date(surgery.operation_date).toLocaleDateString("ru-RU")}
        </Text>
        <Text fontSize="sm" color={textMuted}>
          Начало: {new Date(surgery.start_time).toLocaleString("ru-RU")}
        </Text>
        <Text fontSize="sm" color={textMuted}>
          Конец: {new Date(surgery.end_time).toLocaleString("ru-RU")}
        </Text>
        {surgery.outcome && (
          <Badge
            colorScheme={
              surgery.outcome === "successful"
                ? "green"
                : surgery.outcome === "no_improvement"
                ? "yellow"
                : "red"
            }
          >
            {surgery.outcome === "successful"
              ? "Успешно"
              : surgery.outcome === "no_improvement"
              ? "Нет улучшений"
              : "Неудачно"}
          </Badge>
        )}
        {surgery.notes && (
          <Text fontSize="sm" color={textMuted}>
            Примечания: {surgery.notes}
          </Text>
        )}
        <Flex width={"full"} justifyContent={"end"} gap={2}>
          <EditSurgeryDialog surgery={surgery} />
          {showDeleteButton && onDelete && (
            <DeleteSurgeryDialog
              surgeryId={surgery.id}
              surgeryName={surgery.operation_name}
              onDelete={onDelete}
            />
          )}
        </Flex>
      </VStack>
    </Box>
  );
}
