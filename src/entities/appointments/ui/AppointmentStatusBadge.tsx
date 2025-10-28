import { Badge } from "@chakra-ui/react";
import type { appointmentStatus } from "../model/types";

interface AppointmentStatusBadgeProps {
  status: appointmentStatus;
}

export default function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const isDone = status === "done";

  return (
    <Badge
      colorPalette={isDone ? "teal" : "gray"}
      variant="subtle"
      px={2}
      py={1}
      borderRadius="lg"
      fontSize="sm"
      fontWeight="medium"
    >
      {isDone ? "Завершён" : "Запланировано"}
    </Badge>
  );
}
