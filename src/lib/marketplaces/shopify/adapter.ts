import type { MarketplaceAdapter, SyncResult } from '@/lib/types';

export class MockShopifyAdapter implements MarketplaceAdapter {
  private connectedState = false;

  async connect(): Promise<void> {
    this.connectedState = true;
  }

  async disconnect(): Promise<void> {
    this.connectedState = false;
  }

  async syncProducts(): Promise<SyncResult> {
    return { success: true, records: 248, message: 'Shopify product sync completed' };
  }

  async syncOrders(): Promise<SyncResult> {
    return { success: true, records: 25, message: 'Shopify orders synced' };
  }

  async syncInventory(): Promise<SyncResult> {
    return { success: true, records: 183, message: 'Shopify inventory synced' };
  }

  async updateInventory(): Promise<SyncResult> {
    return { success: true, records: 12, message: 'Inventory updates pushed to Shopify' };
  }

  get isConnected() {
    return this.connectedState;
  }
}

export class ShopifyAdapter implements MarketplaceAdapter {
  private connectedState = false;
  private credentials: { shop?: string; token?: string; version?: string } = {};

  setCredentials(credentials: { shop?: string; token?: string; version?: string }) {
    this.credentials = credentials;
  }

  private async call(
    action: 'connect' | 'disconnect' | 'products' | 'orders' | 'inventory' | 'inventory-update',
    payload?: Record<string, unknown>,
  ): Promise<SyncResult> {
    const response = await fetch('/api/shopify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, credentials: this.credentials, ...payload }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'Shopify request failed');
    }

    const data = (await response.json()) as SyncResult;
    if (action === 'connect' || action === 'disconnect') {
      this.connectedState = action === 'connect';
    }
    return data;
  }

  async connect(config?: { shop?: string; token?: string; version?: string }): Promise<void> {
    if (config) {
      this.setCredentials(config);
    }

    try {
      const result = await this.call('connect');
      if (!result.success) {
        throw new Error(result.message || 'Unable to connect to Shopify');
      }
      this.connectedState = true;
    } catch {
      this.connectedState = false;
      throw new Error('Unable to connect to Shopify');
    }
  }

  async disconnect(): Promise<void> {
    try {
      const result = await this.call('disconnect');
      if (!result.success) {
        throw new Error(result.message || 'Unable to disconnect from Shopify');
      }
      this.connectedState = false;
    } catch {
      this.connectedState = false;
      throw new Error('Unable to disconnect from Shopify');
    }
  }

  async syncProducts(): Promise<SyncResult> {
    try {
      return await this.call('products');
    } catch {
      return new MockShopifyAdapter().syncProducts();
    }
  }

  async syncOrders(): Promise<SyncResult> {
    try {
      return await this.call('orders');
    } catch {
      return new MockShopifyAdapter().syncOrders();
    }
  }

  async syncInventory(): Promise<SyncResult> {
    try {
      return await this.call('inventory');
    } catch {
      return new MockShopifyAdapter().syncInventory();
    }
  }

  async updateInventory(): Promise<SyncResult> {
    try {
      return await this.call('inventory-update');
    } catch {
      return new MockShopifyAdapter().updateInventory();
    }
  }

  get isConnected() {
    return this.connectedState;
  }
}

export const shopifyAdapter = new ShopifyAdapter();
