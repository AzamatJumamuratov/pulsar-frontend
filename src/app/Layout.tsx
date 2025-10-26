import Header from "@/widgets/Header";
import { Outlet } from "react-router";
import { Box, Grid } from "@chakra-ui/react";

const Layout = () => {
  return (
    <Grid gridTemplateRows="auto 1fr" h="100vh" overflow="hidden">
      <Header />
      <Box as="main" overflow="hidden">
        <Outlet />
      </Box>
    </Grid>
  );
};

export default Layout;
