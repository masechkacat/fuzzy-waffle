export type Todo = {
  id: number;
  title: string;
  urgency: "low" | "medium" | "high";
  completed: boolean;
};
