export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "cost" | "income";
};