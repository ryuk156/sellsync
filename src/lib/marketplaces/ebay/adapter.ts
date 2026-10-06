import type { MarketplaceAdapter, SyncResult } from '@/lib/types';

export class MockEbayAdapter implements MarketplaceAdapter {
  private connectedState = false;

  async connect(): Promise<void> {
    this.connectedState = true;
  }

  async disconnect(): Promise<void> {
    this.connectedState = false;
  }

  async syncProducts(): Promise<SyncResult> {
    return { success: false, records: 0, message: 'eBay connection not enabled yet' };
  }

  async syncOrders(): Promise<SyncResult> {
    return { success: false, records: 0, message: 'eBay orders are not enabled for mock sync' };
  }

  async syncInventory(): Promise<SyncResult> {
    return { success: false, records: 0, message: 'eBay inventory sync not configured' };
  }

  async updateInventory(): Promise<SyncResult> {
    return { success: false, records: 0, message: 'Inventory updates are unavailable until connection is enabled' };
  }

  get isConnected() {
    return this.connectedState;
  }
}

export const ebayAdapter = new MockEbayAdapter();
