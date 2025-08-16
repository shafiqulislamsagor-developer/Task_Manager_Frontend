export interface UserProfile {
  data: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    createdAt: string;
    updatedAt: string;
  };
}
