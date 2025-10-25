import { HStack, Image, Text } from "@chakra-ui/react";
import LogoSVG from "@/shared/assets/logo.svg";

const Logo = () => {
  return (
    <HStack gap={4}>
      <Image src={LogoSVG} alt="Clinic Logo" boxSize="40px" />
      <Text fontSize="xl" fontWeight="bold" color="teal.600">
        Pulsar
      </Text>
    </HStack>
  );
};

export default Logo;
