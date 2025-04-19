import { PDFUpload } from "@/components/PDFUpload/PDFUpload";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";

export function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleFileAccept = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  const handleGenerateSummary = () => {
    console.log("Generate summary");
    setIsLoading(true);
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
        <PDFUpload onFileAccept={handleFileAccept} />

        {files.length > 0 && (
          <Box mt="2">
            <Button
              size="sm"
              onClick={handleGenerateSummary}
              loading={isLoading}
            >
              Generate Summary
            </Button>
          </Box>
        )}
      </Box>

      <Box bg="gray.800" p="2" mb="2" borderRadius="md">
        <h2>Summary:</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          magni dicta architecto, perferendis sed labore nam minima quia
          accusamus expedita qui? Expedita quibusdam ipsam voluptatum iusto
          veritatis delectus provident! Libero! Sit autem voluptas saepe ipsa
          molestiae tempora qui, dolorum natus unde voluptatum ratione.
          Molestiae sit laboriosam obcaecati illo quo officiis et ut. Beatae
          ipsum, ullam amet minus illum dolor cumque.
        </p>
      </Box>
    </Box>
  );
}
