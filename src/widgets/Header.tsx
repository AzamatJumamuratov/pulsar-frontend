import { Box, Flex, HStack } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import Logo from "@/shared/Logo/Logo";
import { Wrapper } from "@/shared/Wrapper";

export default function Header() {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("teal.600", "teal.200");
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
          </HStack>
        </Flex>
      </Wrapper>
    </Box>
  );
}
