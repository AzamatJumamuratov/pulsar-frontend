import React from "react";
import { Box, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import { Global } from "@emotion/react";

// --- 1. Глобальный сброс CSS (Убирает нежелательный скролл <body>) ---
const GlobalStyleFix = () => (
  <Global
    styles={`
      /* Убеждаемся, что body и html не имеют внешних отступов */
      html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      body {
        margin: 0 !important;
      }
    `}
  />
);

const Test = () => {
  return (
    <React.Fragment>
      <GlobalStyleFix />

      {/* Основной контейнер: 
        gridTemplateRows="auto 1fr"
      */}
      <Grid
        h="100vh"
        gridTemplateRows="auto 1fr" // Хедер = АВТО (высота контента), Контент = 1fr (остаток)
        overflow="hidden"
      >
        {/* --- A. Хедер (Автоматическая строка) --- */}
        <Box
          bg="blue.600"
          color="white"
          p={6} // Увеличил padding, чтобы показать, что высота АВТОМАТИЧЕСКИ изменилась
          display="flex"
          alignItems="center"
          shadow="lg"
        >
          <Text fontSize="xl" fontWeight="bold">
            Липкий Хедер (Автоматическая высота)
          </Text>
        </Box>

        {/* --- B. Основная область (1fr - занимает все оставшееся место) --- */}
        <Box as="main" overflow="hidden">
          <Flex h="100%">
            {/* 1. ЛЕВАЯ КОЛОНКА (ЛИПКИЙ САЙДБАР) */}
            <Box
              w="250px"
              h="full"
              flexShrink={0}
              bg="gray.50"
              borderRight="1px solid"
              borderColor="gray.200"
              p={4}
              overflowY="auto" // <-- Скролл только здесь
            >
              <VStack gap={4} align="stretch">
                <Text fontWeight="bold" fontSize="md">
                  Профиль / Навигация
                </Text>
                {/* Длинный контент для демонстрации скролла */}
                {[...Array(20)].map((_, i) => (
                  <Box key={i} p={2} bg="white" borderRadius="sm">
                    Элемент {i + 1}
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* 2. ПРАВАЯ КОЛОНКА (КОНТЕНТ) */}
            <Box
              flex="1"
              overflowY="auto" // <-- Скролл только здесь
              p={6}
              bg="white"
            >
              <Text fontWeight="extrabold" fontSize="3xl" mb={4}>
                Основной Контент
              </Text>
              <Text fontSize="lg" mb={6}>
                Этот контент скроллится независимо.
              </Text>
              {/* Очень длинный контент для демонстрации скролла */}
              {[...Array(60)].map((_, i) => (
                <Box key={i} p={3} mb={2} bg="green.50" borderRadius="md">
                  Строка контента #{i + 1}. Скролл работает, а хедер и сайдбар
                  остаются на месте.
                </Box>
              ))}
            </Box>
          </Flex>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default Test;
