import { mockInventory } from '@/lib/data/mock/inventory';
import type { InventoryItem, InventoryRepository } from '@/lib/types';

const storageKey = 'sellsync-inventory';

function readInventory(): InventoryItem[] {
  if (typeof window === 'undefined') {
    return mockInventory;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      window.localStorage.setItem(storageKey, JSON.stringify(mockInventory));
      return mockInventory;
    }

    return JSON.parse(raw) as InventoryItem[];
  } catch {
    return mockInventory;
  }
}

function persistInventory(inventory: InventoryItem[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(inventory));
}

export const inventoryRepository: InventoryRepository = {
  async getAll(): Promise<InventoryItem[]> {
    return readInventory();
  },

  async getBySku(sku: string): Promise<InventoryItem | null> {
    return readInventory().find((item) => item.sku === sku) ?? null;
  },

  async update(id: string, quantity: number): Promise<InventoryItem> {
    const current = readInventory();
    const index = current.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Inventory item ${id} not found`);
    }

    const existing = current[index];
    const updated: InventoryItem = {
      ...existing,
      onHand: quantity,
      available: Math.max(quantity - existing.reserved, 0),
      lastUpdated: new Date().toISOString(),
    };

    const next = [...current];
    next[index] = updated;
    persistInventory(next);
    return updated;
  },
};

// TODO: Replace this mock repository with a PostgreSQL/Supabase repository when the real database is configured.
