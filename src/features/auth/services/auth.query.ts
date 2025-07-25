import type { UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { Authenticated, getAuth } from "@/features/auth/services/auth.api";

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["getAuth"],
    queryFn: () => getAuth(),
  });

export const useAuthQuery = () => {
  return useSuspenseQuery(authQueryOptions());
};

export const useAuthedQuery = () => {
  const authQuery = useAuthQuery();

  if (authQuery.data.isAuthenticated === false) {
    throw new Error("Not authenticated");
  }

  return authQuery as UseSuspenseQueryResult<Authenticated>;
};
