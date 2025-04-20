import { useSummaryMutations } from "@/api/hooks/summary-mutation.hook";
import { PDFUpload } from "@/components/PDFUpload/PDFUpload";
import { Prose } from "@/components/ui/prose";
import { SummaryModel } from "@/models/summary.model";
import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

export function Home() {
  const { createSummary } = useSummaryMutations();
  const [summary, setSummary] = useState<SummaryModel>();
  const [file, setFile] = useState<File>();

  const [isLoading, setIsLoading] = useState(false);

  const handleFileAccept = (file: File) => {
    setFile(file);
  };

  const handleGenerateSummary = async () => {
    if (!file) {
      return;
    }

    setIsLoading(true);
    const createdSummary = await createSummary(file);
    setIsLoading(false);

    setSummary(createdSummary);
  };

  return (
    <Box display="flex" flexDir="column" gap="4">
      <Box
        p="2"
        outlineWidth="1px"
        outlineColor="whiteAlpha.500"
        outlineStyle="solid"
        borderRadius="8px"
      >
        <PDFUpload onFileAccept={(files) => handleFileAccept(files[0])} />

        {file && (
          <Box mt="2">
            <Button
              size="sm"
              onClick={handleGenerateSummary}
              loading={isLoading}
            >
              {summary ? "Regenerate Summary" : "Generate Summary"}
            </Button>
          </Box>
        )}
      </Box>

      {summary && (
        <Box bg="gray.800" p="2" mb="2" borderRadius="md">
          <Text as="h3">{summary.title}</Text>

          <Prose w="full">
            <div dangerouslySetInnerHTML={{ __html: summary.text }} />
          </Prose>
        </Box>
      )}
    </Box>
  );
}
