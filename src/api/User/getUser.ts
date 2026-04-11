import { User } from "@/src/types/user/user.types";
import axios from "axios";
const baseURL = "https://jsonplaceholder.typicode.com";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${baseURL}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};
