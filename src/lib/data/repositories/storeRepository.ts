import { mockStores } from '@/lib/data/mock/stores';
import type { MarketplaceName, Store, StoreRepository } from '@/lib/types';

const storageKey = 'sellsync-stores';

function readStores(): Store[] {
  if (typeof window === 'undefined') {
    return mockStores;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      window.localStorage.setItem(storageKey, JSON.stringify(mockStores));
      return mockStores;
    }

    return JSON.parse(raw) as Store[];
  } catch {
    return mockStores;
  }
}

function persistStores(stores: Store[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(stores));
}

export const storeRepository: StoreRepository = {
  async getAll(): Promise<Store[]> {
    return readStores();
  },

  async getByName(name: MarketplaceName): Promise<Store | null> {
    return readStores().find((store) => store.name === name) ?? null;
  },

  async updateStatus(name: MarketplaceName, status: 'Connected' | 'Not Connected'): Promise<Store> {
    const current = readStores();
    const index = current.findIndex((store) => store.name === name);

    if (index === -1) {
      throw new Error(`Store ${name} not found`);
    }

    const updated = {
      ...current[index],
      status,
      connected: status === 'Connected',
      lastSync: new Date().toISOString(),
    };

    const next = [...current];
    next[index] = updated;
    persistStores(next);
    return updated;
  },
};

// TODO: Replace this mock repository with a PostgreSQL/Supabase repository when the real database is configured.
