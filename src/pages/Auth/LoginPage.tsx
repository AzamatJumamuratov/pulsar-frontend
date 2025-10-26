// src/pages/auth/LoginPage.tsx
"use client";

import { useForm } from "react-hook-form";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router";
import { useColorModeValue } from "@/components/ui/color-mode";
import ValidatedInput from "@/features/auth/ui/ValidatedInput";
import { login, type LoginRequest } from "@/features/auth/api/loginApi";
import { toaster } from "@/components/ui/toaster";

const LoginPage = () => {
  const textColor = useColorModeValue("gray.800", "gray.100");
  const linkColor = useColorModeValue("teal.600", "teal.300");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await login(data);

      toaster.create({
        description: "Успешный вход.",
        type: "success",
        closable: true,
      });

      if (response.role == "reception") {
        navigate("/reception");
      } else if (response.role == "doctor") {
        navigate("/doctor");
      }
    } catch (error: any) {
      const message =
        error?.message ||
        error?.response?.data?.detail ||
        "Ошибка при входе. Попробуйте позже.";

      toaster.create({
        description: String(message),
        type: "error",
        closable: true,
      });
    }
  };

  return (
    <Box w="full">
      <Heading as="h2" mb={6} textAlign="center" color={textColor} size="lg">
        Вход в систему
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
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          register={register("password", { required: "Пароль обязателен" })}
          error={errors.password}
          mb={6}
        />

        <Button
          type="submit"
          colorPalette="teal"
          width="full"
          disabled={isSubmitting}
        >
          Войти
        </Button>
      </form>

      <Text textAlign="center" mt={4} color={textColor} fontSize="sm">
        Нет аккаунта?{" "}
        <Link
          to="/auth/register"
          style={{ color: linkColor, textDecoration: "underline" }}
        >
          Зарегистрироваться
        </Link>
      </Text>
    </Box>
  );
};

export default LoginPage;
