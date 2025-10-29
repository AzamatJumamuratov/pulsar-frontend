"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input, Text, Box } from "@chakra-ui/react";
import React from "react";

interface ValidatedPhoneInputProps {
  name: string;
  placeholder?: string;
  required?: string;
}

// Функция для форматирования номера телефона в формате XX XXX XX XX (без +998)
const formatPhoneNumber = (value: string) => {
  // Убираем все нецифровые символы
  const cleaned = value.replace(/\D/g, "");

  // Если начинается с 998, убираем его
  const withoutPrefix = cleaned.startsWith("998") ? cleaned.slice(3) : cleaned;

  // Ограничиваем до 9 цифр (без кода страны)
  const limited = withoutPrefix.slice(0, 9);

  // Форматируем: XX XXX XX XX
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 5) {
    return `${limited.slice(0, 2)} ${limited.slice(2)}`;
  } else if (limited.length <= 7) {
    return `${limited.slice(0, 2)} ${limited.slice(2, 5)} ${limited.slice(5)}`;
  } else {
    return `${limited.slice(0, 2)} ${limited.slice(2, 5)} ${limited.slice(
      5,
      7
    )} ${limited.slice(7)}`;
  }
};

// Функция для получения полного номера с кодом страны (экспортируется для совместимости)
export const getFullPhoneNumber = (cleaned: string) => {
  return cleaned ? `+998${cleaned}` : "";
};

// Функция для получения отображаемого значения с префиксом
const getDisplayValue = (value: string) => {
  if (!value) return "+998 ";
  const withoutPrefix = value.replace(/^\+998/, "").replace(/\D/g, "");
  const formatted = formatPhoneNumber(withoutPrefix);
  return `+998 ${formatted}`;
};

// Функция для определения оператора по коду
const getOperatorName = (code: string) => {
  const operators: Record<string, string> = {
    "90": "Beeline",
    "91": "Beeline",
    "92": "Ucell",
    "93": "Ucell",
    "94": "Ucell",
    "95": "Uzmobile",
    "97": "MobiUz",
    "98": "Perfectum",
    "99": "Uzmobile",
  };
  return operators[code] || "";
};

// Функция для обработки ввода с учетом позиции курсора
const handleInputChange = (input: string, currentValue: string) => {
  // Не позволяем редактировать префикс +998
  if (!input.startsWith("+998")) {
    return currentValue;
  }

  // Получаем только часть после +998
  const afterPrefix = input.slice(5); // "+998 " = 5 символов
  const cleaned = afterPrefix.replace(/\D/g, "");

  // Ограничиваем до 9 цифр
  const limited = cleaned.slice(0, 9);

  return limited ? `+998${limited}` : "";
};

const ValidatedPhoneInput: React.FC<ValidatedPhoneInputProps> = ({
  name,
  placeholder = "+998 XX XXX XX XX",
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ?? "Это поле обязательно",
        validate: (val) => {
          if (!val) return true; // Пропускаем если пустое (обработано required)
          const cleaned = val.replace(/\D/g, "").replace(/^998/, "");
          return (
            cleaned.length === 9 || "Номер телефона должен содержать 9 цифр"
          );
        },
      }}
      render={({ field }) => {
        const displayValue = getDisplayValue(field.value);
        const operatorCode =
          field.value?.replace(/^\+998/, "").slice(0, 2) || "";
        const operatorName = getOperatorName(operatorCode);

        return (
          <div style={{ width: "100%" }}>
            <Input
              placeholder={placeholder}
              value={displayValue}
              onChange={(e) => {
                const input = e.target.value;
                const newValue = handleInputChange(input, field.value || "");
                field.onChange(newValue || "");
              }}
              onFocus={() => {
                // Если поле пустое, устанавливаем префикс
                if (!field.value) {
                  field.onChange("+998");
                }
              }}
              onBlur={field.onBlur}
              maxLength={17} // +998 + пробел + 2+1+3+1+2+1+2+1 = 17 символов (9 цифр)
            />

            {operatorName && (
              <Box mt={1}>
                <Text fontSize="xs" color="gray.600">
                  Оператор: {operatorName}
                </Text>
              </Box>
            )}

            {errors[name] && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors[name]?.message as string}
              </Text>
            )}
          </div>
        );
      }}
    />
  );
};

export default ValidatedPhoneInput;
