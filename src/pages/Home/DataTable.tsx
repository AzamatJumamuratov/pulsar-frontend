import { Table, Text, Box, IconButton } from "@chakra-ui/react";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import AddEntityModal from "./AddEntityDialog";
import { ShowMoreDialog } from "./ShowMoreDialog";
export default function DataTable() {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Text fontWeight="bold" fontSize="lg">
          Список блеблеблеблублублу
        </Text>
        <AddEntityModal />
      </Box>
      <Table.Root size="md" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Фамилия и Имя</Table.ColumnHeader>
            <Table.ColumnHeader>Телефон Номер</Table.ColumnHeader>
            <Table.ColumnHeader>Сумма</Table.ColumnHeader>
            <Table.ColumnHeader>Дополнительно</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Алина Ким</Table.Cell>
            <Table.Cell>+998123456789</Table.Cell>
            <Table.Cell>150 000</Table.Cell>
            <Table.Cell display={"flex"} gap={4} justifyContent={"center"}>
              <IconButton>
                <ShowMoreDialog />
              </IconButton>
              <IconButton>
                <FaRegEdit />
              </IconButton>
              <IconButton>
                <MdDeleteOutline />
              </IconButton>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>Сергей Петров</Table.Cell>
            <Table.Cell>+998987654321</Table.Cell>
            <Table.Cell>550 000</Table.Cell>
            <Table.Cell display={"flex"} gap={4} justifyContent={"center"}>
              <IconButton>
                <ShowMoreDialog />
              </IconButton>
              <IconButton>
                <FaRegEdit />
              </IconButton>
              <IconButton>
                <MdDeleteOutline />
              </IconButton>
            </Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={4}>Всего Людей: 2</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Box>
  );
}
