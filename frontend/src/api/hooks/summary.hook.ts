import { SummaryModel } from "@/models/summary.model";
import useSWR, { mutate } from "swr";
import { fetcher } from "../configs/swr";

export const useSummary = (id?: number | string) => {
  const { data, error, isLoading, isValidating } = useSWR<SummaryModel>(
    id ? `summaries/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    summary: data,
    mutateSummary: mutate,
    isLoading,
    isValidating,
    error,
  };
};
