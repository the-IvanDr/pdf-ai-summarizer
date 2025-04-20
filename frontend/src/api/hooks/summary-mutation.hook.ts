import { mutate } from "swr";
import { api } from "../configs/axios";
import { TAKE } from "@/components/LastSummariesSidebar/LastSummariesSidebar";

export const useSummaryMutations = () => {
  const createSummary = async (file: File) => {
    if (!file) throw new Error("No file uploaded");
    if (file.type !== "application/pdf")
      throw new Error("Only PDF files are allowed");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("summaries/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Revalidate the summaries list
      mutate("summaries/");
      mutate(`summaries?take=${TAKE}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const deleteSummary = async (id: number) => {
    try {
      await api.delete(`/${id}`);

      // Revalidate both the specific summary and the list
      mutate("summaries/");
      mutate(`summaries/${id}`, null, false); // Optimistically update the cache
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return {
    createSummary,
    deleteSummary,
  };
};
