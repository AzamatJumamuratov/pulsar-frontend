import { Box, Flex, Text, Button, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import ProfileInfo from "@/widgets/ProfileInfo";
import { MdRefresh } from "react-icons/md";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { fetchProfile } from "@/entities/profile/model/profileSlice";
import AppointmentsList from "@/widgets/AppointmentsList/AppointmentsList";
import { fetchAppointmentsList } from "@/entities/appointments/model/appointmentsSlice";
import SidebarDrawer from "@/widgets/SidebarDrawer";

const DoctorPage = () => {
  const dispatch = useAppDispatch();
  const { error: profileError } = useAppSelector((s) => s.profile);
  const { error: appointmentsError } = useAppSelector((s) => s.appointments);

  const hasError = profileError || appointmentsError;

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchAppointmentsList());
  }, [dispatch]);

  if (hasError) {
    return (
      <Flex
        as="main"
        align="center"
        justify="center"
        height={`100%`}
        direction="column"
      >
        <VStack gap={6}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue("red.600", "red.300")}
          >
            Не удалось загрузить данные
          </Text>
          <Button
            backgroundColor="teal"
            colorScheme="teal"
            color="white"
            size="lg"
            onClick={() => window.location.reload()}
          >
            <MdRefresh />
            Перезагрузить страницу
          </Button>
        </VStack>
      </Flex>
    );
  }

  return (
    <Box as="main" h="100%" overflow="hidden">
      <Flex h="full">
        {/* Липкая левая панель - скрыта на мобильных */}
        <Box
          w="260px"
          h="full"
          position="sticky"
          top={0}
          flexShrink={0}
          borderRightWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          bg={useColorModeValue("gray.50", "gray.900")}
          p={4}
          overflowY="auto"
          display={{ base: "none", md: "block" }}
        >
          <ProfileInfo />
        </Box>

        {/* Drawer для мобильных устройств */}
        <SidebarDrawer />

        {/* Прокручиваемая правая часть */}
        <Box flex={1} h="full" overflowY="auto" p={4} pl={{ base: 12, md: 4 }}>
          <AppointmentsList />
        </Box>
      </Flex>
    </Box>
  );
};

export default DoctorPage;
