import type { MarketplaceAdapter, SyncResult } from '@/lib/types';

export class MockWalmartAdapter implements MarketplaceAdapter {
  private connectedState = false;

  async connect(): Promise<void> {
    this.connectedState = true;
  }

  async disconnect(): Promise<void> {
    this.connectedState = false;
  }

  async syncProducts(): Promise<SyncResult> {
    return { success: true, records: 89, message: 'Walmart product sync completed' };
  }

  async syncOrders(): Promise<SyncResult> {
    return { success: true, records: 11, message: 'Walmart orders synced' };
  }

  async syncInventory(): Promise<SyncResult> {
    return { success: false, records: 0, message: 'Temporary API timeout while syncing inventory' };
  }

  async updateInventory(): Promise<SyncResult> {
    return { success: true, records: 6, message: 'Inventory updates pushed to Walmart' };
  }

  get isConnected() {
    return this.connectedState;
  }
}

export const walmartAdapter = new MockWalmartAdapter();
