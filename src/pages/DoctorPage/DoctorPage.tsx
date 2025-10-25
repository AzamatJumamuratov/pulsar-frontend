import { Box, Flex, Text, Button, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Wrapper } from "@/shared/Wrapper";
import ProfileInfo from "@/widgets/ProfileInfo";
import PatientsTable from "@/widgets/PatientsTable/PatientsTable";
import { MdRefresh } from "react-icons/md";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { fetchProfile } from "@/entities/profile/model/profileSlice";
import { fetchPatients } from "@/entities/patient/model/patientsSlice";

const DoctorPage = () => {
  const dispatch = useAppDispatch();
  const { error: profileError } = useAppSelector((s) => s.profile);
  const { error: patientsError } = useAppSelector((s) => s.patients);

  const hasError = profileError || patientsError;

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchPatients());
  }, [dispatch]);

  if (hasError) {
    return (
      <Flex
        as="main"
        align="center"
        justify="center"
        height="100vh"
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
            backgroundColor={"teal"}
            colorScheme="red"
            color={"white"}
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
    <Box as="main">
      <Wrapper>
        <Flex paddingTop={4}>
          <Box width={256}>
            <ProfileInfo />
          </Box>
          <Box flex={1}>
            <PatientsTable />
          </Box>
        </Flex>
      </Wrapper>
    </Box>
  );
};

export default DoctorPage;
