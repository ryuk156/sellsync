export type MarketplaceName = 'Shopify' | 'Walmart' | 'Amazon' | 'eBay';
export type ProductStatus = 'Active' | 'Draft' | 'Low Stock';
export type OrderStatus = 'Paid' | 'Pending' | 'Cancelled' | 'Fulfilled' | 'Partially fulfilled';
export type FulfillmentStatus = 'Unfulfilled' | 'Partially fulfilled' | 'Fulfilled';
export type SyncStatus = 'SUCCEEDED' | 'FAILED' | 'RUNNING' | 'PENDING';

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  barcode: string;
  inventory: number;
  price: number;
  cost: number;
}

export interface Product {
  id: string;
  title: string;
  sku: string;
  barcode: string;
  price: number;
  cost: number;
  inventory: number;
  status: ProductStatus;
  brand: string;
  description: string;
  image: string;
  marketplaceConnections: Record<MarketplaceName, boolean>;
  variants: ProductVariant[];
  createdAt: string;
}

export interface CreateProductInput {
  title: string;
  sku: string;
  barcode: string;
  price: number;
  cost: number;
  inventory: number;
  status?: ProductStatus;
  brand: string;
  description: string;
  image: string;
  marketplaceConnections?: Partial<Record<MarketplaceName, boolean>>;
}

export interface UpdateProductInput {
  title?: string;
  sku?: string;
  barcode?: string;
  price?: number;
  cost?: number;
  inventory?: number;
  status?: ProductStatus;
  brand?: string;
  description?: string;
  image?: string;
  marketplaceConnections?: Partial<Record<MarketplaceName, boolean>>;
}

export interface InventoryItem {
  id: string;
  sku: string;
  productTitle: string;
  onHand: number;
  reserved: number;
  available: number;
  reorderPoint: number;
  location: string;
  lastUpdated: string;
}

export interface InventoryAlert {
  id: string;
  sku: string;
  title: string;
  available: number;
  threshold: number;
}

export interface OrderLine {
  id: string;
  productId: string;
  title: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  marketplace: MarketplaceName;
  customerName: string;
  customerEmail: string;
  items: OrderLine[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  fulfillment: FulfillmentStatus;
  tracking?: string;
  createdAt: string;
}

export interface Store {
  id: string;
  name: MarketplaceName | 'Shopify' | 'Walmart' | 'Amazon' | 'eBay';
  status: 'Connected' | 'Not Connected';
  connected: boolean;
  channelType: string;
  lastSync: string;
  region: string;
}

export interface SyncJob {
  id: string;
  marketplace: MarketplaceName;
  syncType: string;
  status: SyncStatus;
  startedAt: string;
  completedAt?: string;
  records: number;
  error?: string;
  durationSeconds: number;
}

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  create(product: CreateProductInput): Promise<Product>;
  update(id: string, data: UpdateProductInput): Promise<Product>;
  delete(id: string): Promise<void>;
}

export interface OrderRepository {
  getAll(): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
}

export interface InventoryRepository {
  getAll(): Promise<InventoryItem[]>;
  getBySku(sku: string): Promise<InventoryItem | null>;
  update(id: string, quantity: number): Promise<InventoryItem>;
}

export interface StoreRepository {
  getAll(): Promise<Store[]>;
  getByName(name: MarketplaceName): Promise<Store | null>;
  updateStatus(name: MarketplaceName, status: 'Connected' | 'Not Connected'): Promise<Store>;
}

export interface SyncRepository {
  getAll(): Promise<SyncJob[]>;
  retry(id: string): Promise<void>;
}

export interface SyncResult {
  success: boolean;
  records: number;
  message: string;
}

export interface MarketplaceAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  syncProducts(): Promise<SyncResult>;
  syncOrders(): Promise<SyncResult>;
  syncInventory(): Promise<SyncResult>;
  updateInventory(): Promise<SyncResult>;
}

export interface InventoryAdjustment {
  sku: string;
  reason: string;
  delta: number;
  previousQuantity: number;
  newQuantity: number;
  timestamp: string;
}
