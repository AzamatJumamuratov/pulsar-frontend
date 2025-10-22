import { useColorModeValue } from "@/components/ui/color-mode";
import { Button, Dialog, Flex, Text, IconButton } from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export function ShowMoreDialog() {
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const valueColor = useColorModeValue("gray.900", "gray.100");
  const titleColor = useColorModeValue("gray.800", "gray.100");
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton aria-label="Показать подробнее">
          <MdOutlineRemoveRedEye />
        </IconButton>
      </Dialog.Trigger>

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
              Информация о клиенте
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Flex direction="column" gap={3}>
              {[
                ["ФИО", "Аширепов Акканат Жамбул улы"],
                ["Тел. номер", "+998 90 123 45 67"],
                ["Врач", "Джураев Алишер Ахмадович"],
                ["Дата рождения", "12.03.1997"],
                ["Наименование", "Общий анализ крови"],
                ["Сумма", "150 000 сум"],
              ].map(([label, value]) => (
                <Flex
                  key={label}
                  justify="space-between"
                  align="center"
                  gap={6}
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
          </Dialog.Body>

          <Dialog.Footer justifyContent="flex-end">
            <Dialog.ActionTrigger asChild>
              <Button colorPalette="teal">Закрыть</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
