// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router";
import { Box, Flex } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import Logo from "@/shared/Logo/Logo";

const AuthLayout = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Flex
      minH="100vh"
      justify="center"
      align="center"
      bg={bg}
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 0 }}
    >
      <Box
        w="full"
        maxW={{ base: "90%", sm: "420px" }}
        bg={cardBg}
        p={{ base: 6, sm: 8 }}
        rounded="2xl"
        shadow="lg"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Flex
          w="full"
          justify={{ base: "center", sm: "space-between" }}
          align="center"
          mb={{ base: 4, sm: 6 }}
          flexDir={{ base: "column", sm: "row" }}
          gap={{ base: 3, sm: 0 }}
        >
          <Logo />
          <ColorModeButton />
        </Flex>

        <Outlet />
      </Box>
    </Flex>
  );
};

export default AuthLayout;
