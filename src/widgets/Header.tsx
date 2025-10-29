import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import Logo from "@/shared/Logo/Logo";
import { Wrapper } from "@/shared/Wrapper";
import ExitButtonDialog from "@/shared/ui/ExitButtonDialog";
import { MdMenu } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { setSidebarOpen } from "@/app/uiSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);
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
          <HStack gap={4}>
            <IconButton
              aria-label="Открыть меню"
              display={{ base: "flex", md: "none" }}
              onClick={() => dispatch(setSidebarOpen(!isSidebarOpen))}
              bg={bg}
              color={textColor}
              _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
            >
              <MdMenu />
            </IconButton>
            <Logo />
          </HStack>
          <HStack gap={6}>
            <ColorModeButton />
            <ExitButtonDialog />
          </HStack>
        </Flex>
      </Wrapper>
    </Box>
  );
}
