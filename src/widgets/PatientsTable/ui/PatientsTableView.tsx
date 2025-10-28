"use client";

import { Table, Text, Box, Flex, Button } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import AddPatientDialog from "./actions/AddPatientDialog/AddPatientDialogContainer";
import ShowMoreDialog from "./actions/ShowMoreDialog";
import type { PatientData } from "@/entities/patient/model/types";
import type { Profile } from "@/entities/profile/model/types";
import EditPatientDialogContainer from "./actions/EditPatientDialog/EditPatientDialogContainer";
import DeletePatientDialog from "./actions/DeletePatientDialog/DeletePatientDialog";

interface PatientTableViewProps {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  patients: PatientData[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGotoPage: (page: number) => void;
}

export default function PatientTableView({
  error,
  patients,
  totalCount,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PatientTableViewProps) {
  const borderClr = useColorModeValue("gray.200", "gray.700");

  // Ошибка может рендериться выше в контейнере, но добавлю обработку и тут
  if (error) {
    return (
      <Box color="red.500" textAlign="center" py={8}>
        {error}
      </Box>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Text fontWeight="bold" fontSize="lg">
          Список Пациентов
        </Text>
        <AddPatientDialog />
      </Box>

      <Table.Root size="md" variant="outline" borderColor={borderClr}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Фамилия и Имя</Table.ColumnHeader>
            <Table.ColumnHeader>Телефон</Table.ColumnHeader>
            <Table.ColumnHeader>Паспорт</Table.ColumnHeader>
            <Table.ColumnHeader>Действия</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {patients.map((p) => (
            <Table.Row key={p.id}>
              <Table.Cell>{p.full_name}</Table.Cell>
              <Table.Cell>{p.phone}</Table.Cell>
              <Table.Cell>{p.passport}</Table.Cell>
              <Table.Cell
                display="flex"
                gap={3}
                justifyContent="center"
                alignItems="center"
              >
                <ShowMoreDialog patientData={p} />
                <EditPatientDialogContainer patient={p} />
                <DeletePatientDialog patient={p} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={5}>
              <Flex justify="space-between" align="center" mt={3}>
                <Text>Всего: {totalCount}</Text>

                <Flex align="center" gap={3}>
                  <Button
                    size="sm"
                    backgroundColor="teal"
                    color="white"
                    disabled={currentPage === 1}
                    onClick={onPrevPage}
                  >
                    <FaArrowLeft />
                    Назад
                  </Button>

                  <Text>
                    Страница {currentPage} из {totalPages}
                  </Text>

                  <Button
                    size="sm"
                    backgroundColor="teal"
                    color="white"
                    disabled={currentPage === totalPages}
                    onClick={onNextPage}
                  >
                    Вперёд
                    <FaArrowRight />
                  </Button>
                </Flex>
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Box>
  );
}
