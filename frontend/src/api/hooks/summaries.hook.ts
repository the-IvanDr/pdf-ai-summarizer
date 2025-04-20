import { SummaryModel } from "@/models/summary.model";
import useSWR, { mutate } from "swr";
import { fetcher } from "../configs/swr";

export const useSummaries = (take?: number) => {
  const { data, error, isLoading, isValidating } = useSWR<SummaryModel[]>(
    take ? `summaries?take=${take}` : "summaries/",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
    }
  );

  return {
    summaries: data,
    mutateSummaries: mutate,
    isLoading,
    isValidating,
    error,
  };
};
