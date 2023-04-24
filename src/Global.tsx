export interface User {
  id: number;
  full_name: string;
  email: string;
  gender: "female" | "male";
  country: string;
  created_on: Date;
}

export const listUsersURL = "https://randomuser.me/api/?results=20";
