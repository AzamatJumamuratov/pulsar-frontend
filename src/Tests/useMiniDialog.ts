// src/widgets/MiniDialog/useMiniDialog.ts
import { useState } from "react";
import { useForm } from "react-hook-form";

// Типы для наших двух форм
export type FormValues = {
  // Шаг 1
  firstName: string;
  lastName: string;
  // Шаг 2
  appointmentNotes: string;
};

// Простой MOCK API-запроса
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useMiniDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const form = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      appointmentNotes: "",
    },
  });

  const open = () => {
    setIsOpen(true);
    setCurrentStep(1); // Всегда начинаем с 1
    form.reset(); // Сбрасываем форму
  };

  const close = () => {
    setIsOpen(false);
    // Даем анимации закрытия время
    setTimeout(() => {
      setCurrentStep(1);
      form.reset();
    }, 300);
  };

  // ЕДИНАЯ функция отправки
  const onSubmit = async (data: FormValues) => {
    if (currentStep === 1) {
      // --- ЛОГИКА ШАГА 1 ---
      console.log("Отправка Шага 1:", data);
      await sleep(500); // Имитация API
      console.log("Шаг 1 Успех. Переход на Шаг 2.");

      // Ключевой момент: просто меняем шаг, НЕ закрываем
      setCurrentStep(2);
    } else {
      // --- ЛОГИКА ШАГА 2 ---
      console.log("Отправка Шага 2 (Создание приёма):", data);
      await sleep(500); // Имитация API
      console.log("Шаг 2 Успех. Приём создан.");

      // А вот теперь закрываем
      close();
    }
  };

  return {
    isOpen,
    open,
    close,
    form,
    onSubmit,
    currentStep,
  };
}
