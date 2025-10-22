import { Container } from "@chakra-ui/react";

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Container maxW="1440px" px="40px" mx="auto">
      {children}
    </Container>
  );
}
