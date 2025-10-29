"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input, Text } from "@chakra-ui/react";
import React from "react";

interface ValidatedCostInputProps {
  name: string;
  placeholder?: string;
  required?: string;
}

const formatPrice = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const ValidatedCostInput: React.FC<ValidatedCostInputProps> = ({
  name,
  placeholder,
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
        validate: (val) =>
          val === null || val >= 0 || "Стоимость не может быть отрицательной",
      }}
      render={({ field }) => {
        const display =
          field.value === null || field.value === undefined
            ? ""
            : formatPrice(field.value);

        return (
          <div style={{ width: "100%" }}>
            <Input
              placeholder={placeholder}
              value={display}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "");

                if (!cleaned) {
                  field.onChange(null);
                  return;
                }

                field.onChange(Number(cleaned));
              }}
              onBlur={field.onBlur}
            />

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

export default ValidatedCostInput;
