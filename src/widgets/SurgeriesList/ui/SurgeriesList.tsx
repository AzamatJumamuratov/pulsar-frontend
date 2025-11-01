import { useColorModeValue } from "@/components/ui/color-mode";
import { useAppSelector, useAppDispatch } from "@/shared/model/hooks";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Button,
  Text,
} from "@chakra-ui/react";
import { SurgeryCard } from "./SurgeryCard";
import CreateSurgeryDialog from "./CreateSurgeryDialog";
import { deleteSurgery } from "@/entities/surgery/api/surgeriesApi";
import { toaster } from "@/components/ui/toaster";
import { fetchDefaultSurgeries } from "@/entities/surgery/model/surgerySlice";
import { useSurgeriesPagination } from "../model/useSurgeriesPagination";

const SurgeriesList = () => {
  const dispatch = useAppDispatch();
  const {
    surgeries,
    loading,
    error,
    currentPage,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
  } = useSurgeriesPagination();
  const { data: profile } = useAppSelector((s) => s.profile);
  const { totalCount } = useAppSelector((s) => s.surgeries);

  const textMuted = useColorModeValue("gray.600", "gray.400");
  const showSurgeonName = profile?.role === "reception";
  const showDeleteButton = profile?.role === "reception";

  const handleDeleteSurgery = async (surgeryId: number) => {
    try {
      await deleteSurgery(surgeryId);

      toaster.create({
        title: "Операция удалена",
        description: "Операция успешно удалена",
        type: "success",
      });

      dispatch(fetchDefaultSurgeries());
    } catch (error) {
      toaster.create({
        title: "Ошибка удаления операции",
        description: "Не удалось удалить операцию.",
        type: "error",
      });
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <Spinner size="lg" />
      </Box>
    );
  else if (error)
    return (
      <Box color="red.500" textAlign="center" py={8}>
        {error}
      </Box>
    );

  return (
    <Box mt={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">Список операций ({totalCount})</Heading>
        {profile?.role === "doctor" && <CreateSurgeryDialog />}
      </Flex>

      {surgeries.length == 0 ? (
        <Box textAlign="center" py={10} color={textMuted}>
          Операций пока нет.
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
            {surgeries.map((surgery) => (
              <SurgeryCard
                key={surgery.id}
                surgery={surgery}
                showSurgeonName={showSurgeonName}
                showDeleteButton={showDeleteButton}
                onDelete={handleDeleteSurgery}
              />
            ))}
          </SimpleGrid>
          <Flex justify="center" mt={6} gap={4} align="center">
            <Button
              backgroundColor={"teal"}
              color={"white"}
              onClick={prevPage}
              disabled={!hasPrev}
            >
              Назад
            </Button>
            <Text fontSize="sm" color="gray.600">
              Страница {currentPage} из {Math.ceil(totalCount / 10)}
            </Text>
            <Button
              backgroundColor={"teal"}
              color={"white"}
              onClick={nextPage}
              disabled={!hasNext}
            >
              Вперед
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default SurgeriesList;
