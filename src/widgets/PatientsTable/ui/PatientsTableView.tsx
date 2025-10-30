"use client";

import {
  Table,
  Text,
  Box,
  Flex,
  Button,
  useBreakpointValue,
  Card,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BsPassport } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";
import { BsHouse } from "react-icons/bs";
import { PiGenderIntersex } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import { Navigation, Pagination } from "swiper/modules";
import AddPatientDialog from "./actions/AddPatientDialog/AddPatientDialogContainer";
import ShowMoreDialog from "./actions/ShowMoreDialog";
import type { PatientData } from "@/entities/patient/model/types";
import type { Profile } from "@/entities/profile/model/types";
import EditPatientDialogContainer from "./actions/EditPatientDialog/EditPatientDialogContainer";
import DeletePatientDialog from "./actions/DeletePatientDialog/DeletePatientDialog";
import CreateAppointmentForPatient from "./actions/CreateAppointmentForPatient";

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
  isSearching?: boolean;
}

export default function PatientTableView({
  error,
  patients,
  totalCount,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  isSearching = false,
}: PatientTableViewProps) {
  const borderClr = useColorModeValue("gray.200", "gray.700");
  const showPhone = useBreakpointValue({ base: false, md: true });
  const showPassport = useBreakpointValue({ base: false, lg: true });
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const cardColorMode = useColorModeValue("gray.600", "white");

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

      {isMobile ? (
        <Box position="relative" overflow="hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            // navigation={{
            //   nextEl: ".swiper-button-next",
            //   prevEl: ".swiper-button-prev",
            // }}
            pagination={{ clickable: true }}
            style={
              {
                // paddingLeft: "10px",
                // paddingRight: "10px",
              }
            }
          >
            {patients.map((p) => (
              <SwiperSlide key={p.id}>
                <Card.Root>
                  <Card.Header>
                    <Flex direction="column" gap={1}>
                      <Text fontWeight="bold" fontSize="lg">
                        {p.full_name}
                      </Text>
                      <Flex gap={2}>
                        <CiCalendarDate />
                        <Text fontSize="sm" color={cardColorMode}>
                          Дата рождения:{" "}
                          {new Date(p.birth_date).toLocaleDateString("ru-RU")}
                        </Text>
                      </Flex>

                      <Flex gap={2}>
                        <PiGenderIntersex />
                        <Text fontSize="sm" color={cardColorMode}>
                          Пол: {p.gender === "male" ? "Мужской" : "Женский"}
                        </Text>
                      </Flex>
                    </Flex>
                  </Card.Header>
                  <Card.Body>
                    <Flex direction="column" gap={2}>
                      {showPhone && (
                        <Text color={cardColorMode}>
                          <CiPhone /> Телефон: {p.phone}
                        </Text>
                      )}
                      {showPassport && (
                        <Flex gap={2}>
                          <BsPassport />{" "}
                          <Text color={cardColorMode}>
                            Паспорт: {p.passport}
                          </Text>{" "}
                        </Flex>
                      )}
                      <Flex gap={2}>
                        <BsHouse />
                        <Text fontSize="sm" color={cardColorMode}>
                          Адрес: {p.address}
                        </Text>
                      </Flex>

                      <Text fontSize="sm" color={cardColorMode}>
                        Создан:{" "}
                        {new Date(p.created_at).toLocaleDateString("ru-RU")}
                      </Text>
                    </Flex>
                  </Card.Body>
                  <Card.Footer>
                    <Flex gap={2} wrap="wrap">
                      <CreateAppointmentForPatient
                        patientId={p.id}
                        patientName={p.full_name}
                      />
                      <ShowMoreDialog patientData={p} />
                      <EditPatientDialogContainer patient={p} />
                      <DeletePatientDialog patient={p} />
                    </Flex>
                  </Card.Footer>
                </Card.Root>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <Button
            className="swiper-button-prev"
            position="absolute"
            left="1px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={10}
            size="xs"
            backgroundColor="teal"
            color="white"
            _hover={{ backgroundColor: "teal.600" }}
            width="30px"
            height="30px"
          >
            <FaAngleLeft size={1} />
          </Button>
          <Button
            className="swiper-button-next"
            position="absolute"
            right="0px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={10}
            size="xs"
            backgroundColor="teal"
            color="white"
            _hover={{ backgroundColor: "teal.600" }}
            width="30px"
            height="30px"
          >
            <FaAngleRight size={1} />
          </Button> */}

          {!isSearching && (
            <Flex justify="space-between" align="center" mt={4}>
              <Text>Всего: {totalCount}</Text>
              <Flex align="center" gap={3}>
                <Button
                  size="sm"
                  backgroundColor="teal"
                  color="white"
                  disabled={currentPage === 1}
                  onClick={onPrevPage}
                >
                  <FaAngleLeft />
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
                  <FaAngleRight />
                </Button>
              </Flex>
            </Flex>
          )}
          {isSearching && (
            <Flex justify="center" align="center" mt={4}>
              <Text>Найдено: {patients.length}</Text>
            </Flex>
          )}
        </Box>
      ) : (
        <Table.Root size="md" variant="outline" borderColor={borderClr}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Фамилия и Имя</Table.ColumnHeader>
              {showPhone && <Table.ColumnHeader>Телефон</Table.ColumnHeader>}
              {showPassport && <Table.ColumnHeader>Паспорт</Table.ColumnHeader>}
              <Table.ColumnHeader>Действия</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {patients.map((p) => (
              <Table.Row key={p.id}>
                <Table.Cell>{p.full_name}</Table.Cell>
                {showPhone && <Table.Cell>{p.phone}</Table.Cell>}
                {showPassport && <Table.Cell>{p.passport}</Table.Cell>}
                <Table.Cell
                  display="flex"
                  gap={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <CreateAppointmentForPatient
                    patientId={p.id}
                    patientName={p.full_name}
                  />
                  <ShowMoreDialog patientData={p} />
                  <EditPatientDialogContainer patient={p} />
                  <DeletePatientDialog patient={p} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          {!isSearching && (
            <Table.Footer>
              <Table.Row>
                <Table.Cell
                  colSpan={(showPhone ? 1 : 0) + (showPassport ? 1 : 0) + 3}
                >
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
                        <FaAngleLeft />
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
                        <FaAngleRight />
                      </Button>
                    </Flex>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          )}
          {isSearching && (
            <Table.Footer>
              <Table.Row>
                <Table.Cell
                  colSpan={(showPhone ? 1 : 0) + (showPassport ? 1 : 0) + 3}
                >
                  <Flex justify="center" align="center" mt={3}>
                    <Text>Найдено: {patients.length}</Text>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
          )}
        </Table.Root>
      )}
    </Box>
  );
}
