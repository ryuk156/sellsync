import type { MarketplaceAdapter, SyncResult } from '@/lib/types';

export class MockAmazonAdapter implements MarketplaceAdapter {
  private connectedState = false;

  async connect(): Promise<void> {
    this.connectedState = true;
  }

  async disconnect(): Promise<void> {
    this.connectedState = false;
  }

  async syncProducts(): Promise<SyncResult> {
    return { success: true, records: 121, message: 'Amazon product sync completed' };
  }

  async syncOrders(): Promise<SyncResult> {
    return { success: true, records: 14, message: 'Amazon orders synced' };
  }

  async syncInventory(): Promise<SyncResult> {
    return { success: true, records: 90, message: 'Amazon inventory synced' };
  }

  async updateInventory(): Promise<SyncResult> {
    return { success: true, records: 8, message: 'Inventory updates pushed to Amazon' };
  }

  get isConnected() {
    return this.connectedState;
  }
}

export const amazonAdapter = new MockAmazonAdapter();
