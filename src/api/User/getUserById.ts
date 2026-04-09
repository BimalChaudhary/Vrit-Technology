import { User } from "@/src/types/user/user.types";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getUsersById = async (id: number): Promise<User> => {
  try {
    const response = await axios.get<User>(`${baseURL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch users user with id ${id}:`, error);
    throw error;
  }
};
