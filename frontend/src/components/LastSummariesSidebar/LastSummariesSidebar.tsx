import { useNavigate } from "react-router";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { Box, For, HStack, IconButton, Text } from "@chakra-ui/react";
import { useSummaries } from "@/api/hooks/summaries.hook";
import { useSummaryMutations } from "@/api/hooks/summary-mutation.hook";

import "./LastSummariesSidebar.css";

export const TAKE = 5;

export function LastSummariesSidebar() {
  const { summaries } = useSummaries(TAKE);

  const { deleteSummary } = useSummaryMutations();

  const navigate = useNavigate();

  const handleDeleteSummary = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSummary(id);
  };

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
            <HStack
              key={item.id}
              className="parent"
              bg="gray.800"
              p="2"
              mb="2"
              borderRadius="md"
              justifyContent="space-between"
              _hover={{ bg: "gray.700" }}
              cursor="pointer"
              onClick={() => navigateToSummaryPage(item.id)}
            >
              {item.title}
              <IconButton
                onClick={(e) => handleDeleteSummary(item.id, e)}
                className="hidden-child"
                variant="ghost"
              >
                <TiDelete />
              </IconButton>
            </HStack>
          )}
        </For>
      )}
    </Box>
  );
}
