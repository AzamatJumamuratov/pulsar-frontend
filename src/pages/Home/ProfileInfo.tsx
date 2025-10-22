import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ProfileSVG from "@/shared/assets/Profile Square.svg";

const ProfileInfo = () => {
  return (
    <Flex direction={"column"}>
      <Box>
        <Image
          src={ProfileSVG}
          width={"100%"}
          alt="profile image"
          padding={8}
        />
      </Box>
      <Flex direction={"column"} alignItems={"center"} gap={3}>
        <Text> name : James Bond</Text>
        <Text> date : 25.05.2005</Text>
      </Flex>
    </Flex>
  );
};

export default ProfileInfo;
