import { Box, Flex, HStack } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import Logo from "@/shared/Logo/Logo";
import { Wrapper } from "@/shared/Wrapper";

export default function Header() {
  const bg = useColorModeValue("white", "gray.800"); // светлая и тёмная темы
  const textColor = useColorModeValue("teal.600", "teal.200");
  return (
    <Box
      as="header"
      boxShadow={"sm"}
      position={"sticky"}
      bg={bg}
      color={textColor}
      top="0"
    >
      <Wrapper>
        <Flex align="center" justify="space-between" py={4}>
          <Logo />
          <HStack gap={6}>
            {/* <Button variant="ghost">О нас</Button>
        <Button variant="ghost">Услуги</Button>
        <Button variant="ghost">Врачи</Button>
        <Button variant="ghost">Контакты</Button> */}
            <ColorModeButton /> {/* переключатель темы */}
          </HStack>
        </Flex>
      </Wrapper>
    </Box>
  );
}
