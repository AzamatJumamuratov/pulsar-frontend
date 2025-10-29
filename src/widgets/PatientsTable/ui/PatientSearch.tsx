import { useState } from "react";
import { Input, Button, Flex, Box } from "@chakra-ui/react";
import { MdSearch, MdClear } from "react-icons/md";

interface PatientSearchProps {
  onSearch: (search: string, phone: string) => void;
  onClear: () => void;
}

export default function PatientSearch({
  onSearch,
  onClear,
}: PatientSearchProps) {
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");

  const handleSearch = () => {
    onSearch(search.trim(), phone.trim());
  };

  const handleClear = () => {
    setSearch("");
    setPhone("");
    onClear();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box mb={4}>
      <Flex gap={3} align="center">
        <Input
          placeholder="Поиск по ФИО"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          flex="1"
        />
        <Input
          placeholder="Поиск по телефону"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyPress={handleKeyPress}
          flex="1"
        />
        <Button backgroundColor="teal" color={"white"} onClick={handleSearch}>
          <MdSearch />
          Искать
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <MdClear />
          Очистить
        </Button>
      </Flex>
    </Box>
  );
}
