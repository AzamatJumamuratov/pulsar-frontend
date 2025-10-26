import { Box, Button, Flex, HStack, IconButton } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import Logo from "@/shared/Logo/Logo";
import { Wrapper } from "@/shared/Wrapper";
import { useNavigate } from "react-router";

import { IoExitOutline } from "react-icons/io5";
import { clearTokens } from "@/app/api";

export default function Header() {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("teal.600", "teal.200");
  const navigate = useNavigate();

  function exitProfile() {
    clearTokens();
    navigate("/login");
  }
  return (
    <Box
      as="header"
      boxShadow={"sm"}
      position={"sticky"}
      bg={bg}
      color={textColor}
      top="0"
      zIndex={20}
    >
      <Wrapper>
        <Flex align="center" justify="space-between" py={4}>
          <Logo />
          <HStack gap={6}>
            <ColorModeButton />
            <IconButton onClick={exitProfile} variant={"ghost"}>
              <IoExitOutline />
            </IconButton>
          </HStack>
        </Flex>
      </Wrapper>
    </Box>
  );
}
