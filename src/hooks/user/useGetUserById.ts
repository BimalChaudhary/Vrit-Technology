import { useQuery } from "@tanstack/react-query";
import { getUsersById } from "@/src/api/User/getUserById";
import { User } from "@/src/types/user/user.types";

export const useGetUserById = (id?: number) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUsersById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
