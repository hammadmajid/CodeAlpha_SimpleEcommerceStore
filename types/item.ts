export interface OrderItem {
  productId: string | null;
  quantity: number | null;
  amount: number | null;
  description?: string | null;
}

export interface Order {
  id: string;
  status: string | null;
  userId?: string | null;
  items?: OrderItem[];
  total?: number | null;
  currency?: string | null;
  createdAt?: Date | string | null;
}
