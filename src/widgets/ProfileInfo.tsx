import { Box, Flex, Image, Text, Skeleton } from "@chakra-ui/react";
import ProfileSVG from "@/shared/assets/Profile Square.svg";
import { USER_ROLES } from "@/entities/profile/model/types";
import { useAppSelector } from "@/shared/model/hooks";

const ProfileInfo = () => {
  const { data: profile, loading } = useAppSelector((state) => state.profile);

  return (
    <Flex direction="column" align="center">
      <Box>
        {loading ? (
          <Skeleton height="150px" width={"150px"} mt={4} />
        ) : (
          <Image src={ProfileSVG} width="100%" alt="profile image" p={8} />
        )}
      </Box>

      <Flex direction="column" align="center" gap={3} mt={2} w="80%">
        {loading ? (
          <>
            <Skeleton height="20px" width="60%" borderRadius="md" />
            <Skeleton height="16px" width="40%" borderRadius="md" />
          </>
        ) : (
          <>
            <Text fontWeight="bold" textAlign={"center"}>
              {profile?.full_name}
            </Text>
            <Text color="gray.500">
              {profile?.role ? (USER_ROLES[profile.role] as string) : "—"}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ProfileInfo;
