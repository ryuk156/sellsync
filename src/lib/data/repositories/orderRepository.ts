import { mockOrders } from '@/lib/data/mock/orders';
import type { Order, OrderRepository } from '@/lib/types';

const storageKey = 'sellsync-orders';

function readOrders(): Order[] {
  if (typeof window === 'undefined') {
    return mockOrders;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      window.localStorage.setItem(storageKey, JSON.stringify(mockOrders));
      return mockOrders;
    }

    return JSON.parse(raw) as Order[];
  } catch {
    return mockOrders;
  }
}

function persistOrders(orders: Order[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(orders));
}

export const orderRepository: OrderRepository = {
  async getAll(): Promise<Order[]> {
    return readOrders();
  },

  async getById(id: string): Promise<Order | null> {
    return readOrders().find((order) => order.id === id) ?? null;
  },
};

// TODO: Replace this mock repository with a PostgreSQL/Supabase repository when the real database is configured.

export const updateOrderList = (orders: Order[]) => {
  persistOrders(orders);
};
