import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

/**
 * Визуальный скелет таблицы пациентов
 * Используется во время загрузки данных или при отсутствии профиля
 */

export default function PatientsTableSkeleton() {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <SkeletonText noOfLines={1} height="20px" width="150px" />
        <Skeleton height="36px" width="160px" />
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
