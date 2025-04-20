import { useSummaries } from "@/api/hooks/summaries.hook";
import { Box, For, HStack, IconButton, Text } from "@chakra-ui/react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useNavigate } from "react-router";

export function LastSummariesSidebar() {
  const { summaries } = useSummaries(10);

  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate("/");
  };

  const navigateToSummaryPage = (id: number) => {
    navigate(`/summary/${id}`);
  };

  return (
    <Box bg="gray.900" w="28rem" h="full" p="4">
      <HStack mb="4" justifyContent="space-between">
        <Text as="h3" fontWeight="semibold">
          Last summaries
        </Text>

        <IconButton variant="outline" onClick={navigateToHomePage}>
          <MdOutlineCreateNewFolder />
        </IconButton>
      </HStack>

      {summaries?.length === 0 ? (
        <Text fontStyle="italic">No summaries</Text>
      ) : (
        <For each={summaries}>
          {(item) => (
            <Box
              key={item.id}
              bg="gray.800"
              p="2"
              mb="2"
              borderRadius="md"
              _hover={{ bg: "gray.700" }}
              cursor="pointer"
              onClick={() => navigateToSummaryPage(item.id)}
            >
              {item.title}
            </Box>
          )}
        </For>
      )}
    </Box>
  );
}
