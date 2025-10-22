import { Box, Flex } from "@chakra-ui/react";
import ProfileInfo from "./ProfileInfo";
import { Wrapper } from "@/shared/Wrapper";
import DataTable from "./DataTable";

const HomePage = () => {
  return (
    <Box as={"main"}>
      <Wrapper>
        <Flex paddingTop={4}>
          <Box width={256}>
            <ProfileInfo />
          </Box>
          <Box flex={1}>
            <DataTable />
          </Box>
        </Flex>
      </Wrapper>
    </Box>
  );
};

export default HomePage;
