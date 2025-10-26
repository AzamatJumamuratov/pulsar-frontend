import {
  Table,
  Text,
  Box,
  IconButton,
  Skeleton,
  SkeletonText,
  Flex,
  Button,
} from "@chakra-ui/react";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdFileDownloadDone } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import ShowMoreDialog from "./Reception/ShowMoreDialog";
import AddPatientDialog from "./Reception/AddPatientDialog";
import { useAppSelector } from "@/shared/model/hooks";
import { useEffect, useState } from "react";
import type { PatientData } from "@/entities/patient/model/types";

export default function PatientsTable() {
  const { data: profile } = useAppSelector((s) => s.profile);
  const { data: patients, loading } = useAppSelector((s) => s.patients);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedPatients, setPaginatedPatients] = useState<PatientData[]>([]);
  const pageSize = 10;

  const totalPages = Math.ceil(patients.length / pageSize);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedPatients(patients.slice(startIndex, endIndex));
  }, [patients, currentPage]);

  if (loading || !profile) {
    return (
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <SkeletonText noOfLines={1} height="20px" width="150px" />
          {profile?.role === "reception" && (
            <Skeleton height="36px" width="160px" />
          )}
        </Box>

        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          {[...Array(5)].map((_, i) => (
            <Flex
              key={i}
              justify="space-between"
              align="center"
              borderBottomWidth="1px"
              p={3}
              _last={{ borderBottom: "none" }}
            >
              <Skeleton height="20px" width="30px" />
              <Skeleton height="20px" width="180px" />
              <Skeleton height="20px" width="140px" />
              <Skeleton height="20px" width="100px" />
              <Skeleton height="28px" width="80px" borderRadius="md" />
            </Flex>
          ))}
        </Box>
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
        {profile.role === "reception" && <AddPatientDialog />}
      </Box>

      <Table.Root size="md" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Фамилия и Имя</Table.ColumnHeader>
            <Table.ColumnHeader>Телефон Номер</Table.ColumnHeader>
            <Table.ColumnHeader>Паспорт</Table.ColumnHeader>
            <Table.ColumnHeader>Действия</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {paginatedPatients.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.full_name}</Table.Cell>
              <Table.Cell>{item.phone}</Table.Cell>
              <Table.Cell>{item.passport}</Table.Cell>
              <Table.Cell
                display="flex"
                gap={4}
                justifyContent="center"
                alignItems="center"
              >
                <ShowMoreDialog patientData={item} />
                {profile.role == "reception" ? (
                  <>
                    <IconButton backgroundColor={"teal"} color={"white"}>
                      <FaRegEdit />
                    </IconButton>
                    <IconButton backgroundColor={"teal"} color={"white"}>
                      <MdDeleteOutline />
                    </IconButton>
                  </>
                ) : (
                  <IconButton backgroundColor={"teal"} color={"white"}>
                    <MdFileDownloadDone />
                  </IconButton>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={5}>
              <Flex justify="space-between" align="center" mt={3}>
                <Text>Всего Людей: {patients.length}</Text>
                <Flex align="center" gap={2}>
                  <Button
                    size="sm"
                    backgroundColor={"teal"}
                    color={"white"}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    <FaArrowLeft />
                    Назад
                  </Button>
                  <Text>
                    Страница {currentPage} из {totalPages}
                  </Text>
                  <Button
                    size="sm"
                    backgroundColor={"teal"}
                    color={"white"}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
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
