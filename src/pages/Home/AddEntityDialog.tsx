import {
  Dialog,
  Button,
  Input,
  Icon,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";

export default function AddEntityDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button colorPalette="teal">
          Добавить
          <Icon as={GoPlus} ml={2} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="650px" p={6}>
          <Dialog.Header fontWeight="bold">Добавление пациента</Dialog.Header>

          <Dialog.CloseTrigger>
            <Icon as={RxCross1} boxSize={4} />
          </Dialog.CloseTrigger>

          <Dialog.Body>
            <VStack align="stretch" gap={4}>
              <HStack gap={4}>
                <Text w="150px" fontWeight="medium">
                  ФИО
                </Text>
                <Input placeholder="Введите ФИО" />
              </HStack>

              <HStack gap={4}>
                <Text w="150px" fontWeight="medium">
                  Телефон
                </Text>
                <Input placeholder="Введите номер телефона" />
              </HStack>

              <HStack gap={4}>
                <Text w="150px" fontWeight="medium">
                  Врач
                </Text>
                <Input placeholder="Введите врача" />
              </HStack>

              <HStack gap={4}>
                <Text w="150px" fontWeight="medium">
                  Дата рождения
                </Text>
                <Input type="date" />
              </HStack>

              <HStack gap={4}>
                <Text w="150px" fontWeight="medium">
                  Наименование
                </Text>
                <Input placeholder="Введите наименование" />
              </HStack>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button w="100%" colorPalette="teal">
              Сохранить
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
