import { useState } from "react";
import {
  Input,
  Button,
  Flex,
  Box,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdSearch, MdClear } from "react-icons/md";
import ValidatedPhoneInput from "@/shared/ui/ValidatedPhoneInput";
import { useForm, FormProvider } from "react-hook-form";

interface PatientSearchProps {
  onSearch: (search: string, phone: string) => void;
  onClear: () => void;
}

export default function PatientSearch({
  onSearch,
  onClear,
}: PatientSearchProps) {
  const [search, setSearch] = useState("");
  const isButtonsBelow = useBreakpointValue({ base: true, lg: false });

  const form = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const handleSearch = () => {
    const formValues = form.getValues();
    const phoneValue = formValues.phone || "";
    // Убираем +998 из номера для поиска, оставляем только цифры
    const cleanPhone = phoneValue.replace(/^\+998/, "").replace(/\D/g, "");
    onSearch(search.trim(), cleanPhone);
  };

  const handleClear = () => {
    setSearch("");
    form.reset();
    onClear();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <FormProvider {...form}>
      <Box mb={4}>
        <Text fontWeight="bold" fontSize="lg" mb={3}>
          Поиск Пациентов
        </Text>
        <Flex
          gap={3}
          alignItems={"stretch"}
          direction={isButtonsBelow ? "column" : "row"}
        >
          <Flex gap={3} flex="1" direction="row">
            <Input
              placeholder="Поиск по ФИО"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              flex="1"
            />
            <Box flex="1">
              <ValidatedPhoneInput
                name="phone"
                placeholder="Поиск по телефону"
              />
            </Box>
          </Flex>
          {isButtonsBelow && (
            <Flex gap={2} justify="flex-start">
              <Button
                backgroundColor="teal"
                color={"white"}
                onClick={handleSearch}
              >
                <MdSearch />
                Искать
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <MdClear />
                Очистить
              </Button>
            </Flex>
          )}
          {!isButtonsBelow && (
            <>
              <Button
                backgroundColor="teal"
                color={"white"}
                onClick={handleSearch}
              >
                <MdSearch />
                Искать
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <MdClear />
                Очистить
              </Button>
            </>
          )}
        </Flex>
      </Box>
    </FormProvider>
  );
}
