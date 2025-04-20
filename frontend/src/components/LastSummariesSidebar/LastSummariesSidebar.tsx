import { useSummaries } from "@/api/hooks/summaries.hook";
import { Box, For, Text } from "@chakra-ui/react";

export function LastSummariesSidebar() {
  const { summaries } = useSummaries(10);

  return (
    <Box bg="gray.900" w="28rem" h="full" p="4">
      <Text as="h3" fontWeight="semibold" mb="4">
        Last summaries
      </Text>

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
            >
              {item.title}
            </Box>
          )}
        </For>
      )}
    </Box>
  );
}
