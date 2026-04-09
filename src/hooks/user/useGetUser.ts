import { getUsers } from "@/src/api/User/getUser";
import { User } from "@/src/types/user/user.types";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
