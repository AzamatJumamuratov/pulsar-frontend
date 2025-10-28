import { Box, Flex, VStack, Text, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdRefresh } from "react-icons/md";
import ProfileInfo from "@/widgets/ProfileInfo";
import AddAppointment from "@/widgets/AddAppointment";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { fetchProfile } from "@/entities/profile/model/profileSlice";
import { fetchPatients } from "@/entities/patient/model/patientsSlice";
import { useColorModeValue } from "@/components/ui/color-mode";
import { fetchDoctorsList } from "@/entities/doctorsList/model/doctorsSlice";

import { PatientsTableContainer } from "@/widgets/PatientsTable";

const ReceptionPage = () => {
  const dispatch = useAppDispatch();
  const { error: profileError } = useAppSelector((s) => s.profile);
  const { error: patientsError } = useAppSelector((s) => s.patients);
  const { error: doctorsListError } = useAppSelector((s) => s.doctorsList);

  const hasError = profileError || patientsError || doctorsListError;

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchPatients({ page: 1, limit: 10 }));
    dispatch(fetchDoctorsList());
  }, [dispatch]);

  if (hasError) {
    return (
      <Flex align="center" justify="center" height="100%" direction="column">
        <VStack gap={6}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue("red.600", "red.300")}
          >
            Не удалось загрузить данные
          </Text>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => window.location.reload()}
          >
            <MdRefresh />
            Перезагрузить
          </Button>
        </VStack>
      </Flex>
    );
  }

  return (
    <Flex
      height="100%"
      overflow="hidden"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      {/* Левая колонка (сайдбар) */}
      <Box
        w="250px"
        height="full"
        flexShrink={0}
        borderRightWidth="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        p={4}
        overflowY="auto"
      >
        <ProfileInfo />
      </Box>

      {/* Правая колонка (контент) */}
      <Box flex="1" overflowY="auto" p={4}>
        <PatientsTableContainer />
        <AddAppointment />
      </Box>
    </Flex>
  );
};

export default ReceptionPage;
