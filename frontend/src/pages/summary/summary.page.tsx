import { FILES_URL } from "@/api/configs/constants";
import { useSummary } from "@/api/hooks/summary.hook";
import { Prose } from "@/components/ui/prose";
import { Box, HStack, Link, Text } from "@chakra-ui/react";
import { RiFileDownloadLine } from "react-icons/ri";
import { useParams } from "react-router";

export function SummaryPage() {
  const { summaryId } = useParams();

  const { summary, error } = useSummary(summaryId);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box display="flex" flexDir="column" gap="4">
      {summary && (
        <Box bg="gray.800" p="2" mb="2" borderRadius="md">
          <HStack>
            <Link
              href={`${FILES_URL}/${summary.file}`}
              fontWeight="bold"
              target="_blank"
            >
              <RiFileDownloadLine size="1.5rem" />
            </Link>
            <Text as="h3">{summary.title}</Text>
          </HStack>

          <Prose w="full">
            <div dangerouslySetInnerHTML={{ __html: summary.text }} />
          </Prose>
        </Box>
      )}
    </Box>
  );
}
