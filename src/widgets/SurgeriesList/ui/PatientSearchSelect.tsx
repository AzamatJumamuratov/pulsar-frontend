import { useState, useEffect } from "react";
import { Box, VStack, Text, Input, List, Spinner } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { searchPatients } from "@/entities/patient/api/patientsApi";
import type { PatientData } from "@/entities/patient/model/types";

interface PatientSearchSelectProps {
  onSelect: (patient: PatientData | null) => void;
  selectedPatient?: PatientData | null;
}

export function PatientSearchSelect({
  onSelect,
  selectedPatient,
}: PatientSearchSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownBg = useColorModeValue("white", "gray.800");
  const dropdownBorderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const selectedTextColor = useColorModeValue("green.600", "green.400");

  useEffect(() => {
    const search = async () => {
      if (searchTerm.length < 2) {
        setPatients([]);
        return;
      }

      setLoading(true);
      try {
        const result = await searchPatients(searchTerm, undefined, 0, 10);
        setPatients(result.patients);
        setIsOpen(true);
      } catch (error) {
        console.error("Error searching patients:", error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSelect = (patient: PatientData) => {
    onSelect(patient);
    setSearchTerm(`${patient.full_name} (${patient.phone})`);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    if (patients.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    if (
      selectedPatient &&
      value !== `${selectedPatient.full_name} (${selectedPatient.phone})`
    ) {
      // Clear selection if user is typing something different
      onSelect(null);
      setIsOpen(false);
    }
  };

  return (
    <Box position="relative">
      <VStack align="stretch">
        <Text fontWeight="medium">Поиск пациента</Text>
        <Input
          placeholder="Введите имя пациента"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
        />
        {selectedPatient && (
          <Text fontSize="sm" color={selectedTextColor}>
            Выбран: {selectedPatient.full_name}
          </Text>
        )}
      </VStack>

      {isOpen && !selectedPatient && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          bg={dropdownBg}
          border="1px solid"
          borderColor={dropdownBorderColor}
          borderRadius="md"
          shadow="md"
          zIndex={1000}
          maxH="200px"
          overflowY="auto"
        >
          {loading ? (
            <Box p={4} textAlign="center">
              <Spinner size="sm" />
            </Box>
          ) : patients.length > 0 ? (
            <List.Root>
              {patients.map((patient) => (
                <List.Item
                  key={patient.id}
                  p={3}
                  cursor="pointer"
                  _hover={{ bg: hoverBg }}
                  onClick={() => handleSelect(patient)}
                >
                  <VStack align="start" gap={1}>
                    <Text fontWeight="medium">{patient.full_name}</Text>
                    <Text fontSize="sm" color={textColor}>
                      Телефон: {patient.phone}
                    </Text>
                  </VStack>
                </List.Item>
              ))}
            </List.Root>
          ) : searchTerm.length >= 2 ? (
            <Box p={4} textAlign="center" color={textColor}>
              Пациенты не найдены
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  );
}
