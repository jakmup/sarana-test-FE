import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../api/article";
import { useAuth } from "./useAuth";

export const useArticles = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(token!),
    enabled: !!token, // Only fetch if token exists
  });
};
