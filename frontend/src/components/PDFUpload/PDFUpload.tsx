import { Button, FileUpload } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

interface PDFUploadProps {
  onFileAccept: (files: File[]) => void;
}

export function PDFUpload({ onFileAccept }: PDFUploadProps) {
  return (
    <FileUpload.Root
      accept={["application/pdf"]}
      onFileAccept={({ files }) => onFileAccept(files)}
      display="flex"
      flexDirection="row"
      alignItems="stretch"
      gap="2"
    >
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="solid" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.Context>
        {({ acceptedFiles }) =>
          acceptedFiles.map((file) => (
            <FileUpload.Item
              key={file.name}
              file={file}
              p="2"
              m="0"
              w="fit-content"
            >
              <FileUpload.ItemPreview />
              <FileUpload.ItemName />
              <FileUpload.ItemDeleteTrigger />
            </FileUpload.Item>
          ))
        }
      </FileUpload.Context>
    </FileUpload.Root>
  );
}
