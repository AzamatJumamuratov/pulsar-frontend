"use client";

import { useForm } from "react-hook-form";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Link, useNavigate } from "react-router";
import { useColorModeValue } from "@/components/ui/color-mode";
import ValidatedInput from "@/features/auth/ui/ValidatedInput";
import RoleSelect from "@/shared/RoleSelect/RoleSelect";
import { register as registerUser } from "@/features/auth/api/registerApi";
import type { UserRole } from "@/entities/profile/model/types";

export interface RegisterFormValues {
  username: string;
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
}

export default function RegisterPage() {
  const textColor = useColorModeValue("gray.800", "gray.100");
  const linkColor = useColorModeValue("teal.600", "teal.300");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      full_name: "",
      email: "",
      password: "",
      role: "doctor",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await registerUser(data);

      toaster.create({
        title: "Регистрация успешна",
        description: "Теперь вы можете использовать систему",
        type: "success",
        duration: 4000,
      });

      if (response.role == "reception") {
        navigate("/reception");
      } else if (response.role == "doctor") {
        navigate("/doctor");
      }
    } catch (error: any) {
      toaster.create({
        title: "Ошибка регистрации",
        description:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Не удалось зарегистрировать пользователя",
        type: "error",
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Box w="full">
        <Heading as="h2" mb={6} textAlign="center" color={textColor} size="lg">
          Регистрация
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ValidatedInput
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            register={register("username", {
              required: "Имя пользователя обязательно",
            })}
            error={errors.username}
          />

          <ValidatedInput
            label="Полное имя"
            placeholder="Введите полное имя"
            register={register("full_name", {
              required: "Полное имя обязательно",
            })}
            error={errors.full_name}
          />

          <ValidatedInput
            label="Email"
            type="email"
            placeholder="Введите email"
            register={register("email", {
              required: "Email обязателен",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный email",
              },
            })}
            error={errors.email}
          />

          <ValidatedInput
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            register={register("password", {
              required: "Пароль обязателен",
            })}
            error={errors.password}
          />

          <RoleSelect setValue={setValue} />

          <Button
            type="submit"
            colorPalette="teal"
            width="full"
            disabled={isSubmitting}
            mt={4}
          >
            Зарегистрироваться
          </Button>
        </form>

        <Text textAlign="center" mt={4} color={textColor} fontSize="sm">
          Уже есть аккаунт?{" "}
          <Link
            to="/auth/login"
            style={{ color: linkColor, textDecoration: "underline" }}
          >
            Войти
          </Link>
        </Text>
      </Box>
    </>
  );
}
