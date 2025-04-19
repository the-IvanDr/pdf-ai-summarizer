import { Outlet } from "react-router";
import { LastSummariesSidebar } from "@/components/LastSummariesSidebar/LastSummariesSidebar";
import { Box, HStack } from "@chakra-ui/react";

export function MainLayout() {
  return (
    <HStack h="dvh" alignItems="flex-start">
      <LastSummariesSidebar />

      <Box as="main" w="full" p="4">
        <Outlet />
      </Box>
    </HStack>
  );
}
