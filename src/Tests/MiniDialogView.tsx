// src/widgets/MiniDialog/MiniDialogView.tsx
"use client";

import {
  Button,
  VStack,
  Box,
  IconButton,
  Dialog,
  Input, // Используем базовый компонент Chakra Input
  Textarea, // Используем базовый компонент Chakra Textarea
  HStack,
  Field, // Компонент для форм в v3
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { type UseFormReturn } from "react-hook-form";
import { type FormValues } from "./useMiniDialog"; // (Предполагается, что useMiniDialog.ts остался без изменений)

interface MiniDialogViewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<FormValues>;
  onSubmit: (data: FormValues) => void;
  currentStep: number;
}

// Анимации для Framer Motion
const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { duration: 0.24 },
};

export function MiniDialogView({
  isOpen,
  onOpenChange,
  form,
  onSubmit,
  currentStep,
}: MiniDialogViewProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <>
      <Button onClick={() => onOpenChange(true)}>Открыть Мини-Диалог</Button>

      <Dialog.Root open={isOpen}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="500px" p={6}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Dialog.Title as="h3" fontWeight="bold" fontSize="lg">
                {currentStep === 1
                  ? "Шаг 1: Данные пациента"
                  : "Шаг 2: Создание приёма"}
              </Dialog.Title>
              <IconButton
                aria-label="Закрыть"
                onClick={() => onOpenChange(false)}
                size="sm"
                variant="ghost"
              >
                <RxCross1 />
              </IconButton>
            </Box>

            {/* ЕДИНЫЙ ТЕГ <form> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {currentStep === 1 ? (
                  // --- ШАГ 1: Поля для пациента ---
                  <motion.div
                    key="step1"
                    initial={variants.initial}
                    animate={variants.animate}
                    exit={variants.exit}
                    transition={variants.transition}
                  >
                    <Dialog.Body>
                      <VStack gap={4}>
                        <Field.Root>
                          <Field.Label>Имя</Field.Label>
                          {/* Используем Chakra Input напрямую */}
                          <Input
                            placeholder="Иван"
                            {...register("firstName", { required: true })}
                          />
                        </Field.Root>

                        <Field.Root>
                          <Field.Label>Фамилия</Field.Label>
                          {/* Используем Chakra Input напрямую */}
                          <Input
                            placeholder="Иванов"
                            {...register("lastName", { required: true })}
                          />
                        </Field.Root>
                      </VStack>
                    </Dialog.Body>
                    <Dialog.Footer mt={6}>
                      <Button
                        w="100%"
                        colorPalette="teal"
                        type="submit" // Переход на следующий шаг
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Отправка..." : "Далее"}
                      </Button>
                    </Dialog.Footer>
                  </motion.div>
                ) : (
                  // --- ШАГ 2: Поле для приёма и кнопки завершения ---
                  <motion.div
                    key="step2"
                    initial={variants.initial}
                    animate={variants.animate}
                    exit={variants.exit}
                    transition={variants.transition}
                  >
                    <Dialog.Body>
                      <Field.Root>
                        <Field.Label>Заметки для приёма</Field.Label>
                        {/* Используем Chakra Textarea напрямую */}
                        <Textarea
                          placeholder="Жалобы пациента..."
                          {...register("appointmentNotes")}
                        />
                      </Field.Root>
                    </Dialog.Body>
                    <Dialog.Footer mt={6}>
                      <HStack w="100%">
                        <Button
                          variant="ghost"
                          type="button" // 👈 КЛЮЧЕВО: НЕ отправляет форму
                          onClick={() => onOpenChange(false)}
                        >
                          Закрыть
                        </Button>
                        <Button
                          flex={1}
                          colorPalette="teal"
                          type="submit" // 👈 КЛЮЧЕВО: Отправляет форму и закрывает
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Создание..." : "Создать прием"}
                        </Button>
                      </HStack>
                    </Dialog.Footer>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
}
