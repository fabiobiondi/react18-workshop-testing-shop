export interface User {
  id: number;
  name: string;
  role: "admin" | "editor";
  description: string;
}
