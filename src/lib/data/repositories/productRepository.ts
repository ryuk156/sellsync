import { mockProducts } from '@/lib/data/mock/products';
import type { CreateProductInput, Product, ProductRepository, UpdateProductInput } from '@/lib/types';

const storageKey = 'sellsync-products';

function readProducts(): Product[] {
  if (typeof window === 'undefined') {
    return mockProducts;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      window.localStorage.setItem(storageKey, JSON.stringify(mockProducts));
      return mockProducts;
    }

    return JSON.parse(raw) as Product[];
  } catch {
    return mockProducts;
  }
}

function persistProducts(products: Product[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(products));
}

export const productRepository: ProductRepository = {
  async getAll(): Promise<Product[]> {
    return readProducts();
  },

  async getById(id: string): Promise<Product | null> {
    return readProducts().find((product) => product.id === id) ?? null;
  },

  async create(product: CreateProductInput): Promise<Product> {
    const current = readProducts();
    const nextProduct: Product = {
      id: `prod-${Date.now()}`,
      title: product.title,
      sku: product.sku,
      barcode: product.barcode,
      price: product.price,
      cost: product.cost,
      inventory: product.inventory,
      status: product.status ?? 'Active',
      brand: product.brand,
      description: product.description,
      image: product.image,
      marketplaceConnections: {
        Shopify: product.marketplaceConnections?.Shopify ?? false,
        Walmart: product.marketplaceConnections?.Walmart ?? false,
        Amazon: product.marketplaceConnections?.Amazon ?? false,
        'eBay': product.marketplaceConnections?.['eBay'] ?? false,
      },
      variants: [
        {
          id: `var-${Date.now()}`,
          title: product.title,
          sku: product.sku,
          barcode: product.barcode,
          inventory: product.inventory,
          price: product.price,
          cost: product.cost,
        },
      ],
      createdAt: new Date().toISOString(),
    };

    const next = [...current, nextProduct];
    persistProducts(next);
    return nextProduct;
  },

  async update(id: string, data: UpdateProductInput): Promise<Product> {
    const current = readProducts();
    const index = current.findIndex((product) => product.id === id);

    if (index === -1) {
      throw new Error(`Product ${id} not found`);
    }

    const existing = current[index];
    const updated: Product = {
      ...existing,
      ...data,
      inventory: data.inventory ?? existing.inventory,
      marketplaceConnections: {
        Shopify: data.marketplaceConnections?.Shopify ?? existing.marketplaceConnections.Shopify,
        Walmart: data.marketplaceConnections?.Walmart ?? existing.marketplaceConnections.Walmart,
        Amazon: data.marketplaceConnections?.Amazon ?? existing.marketplaceConnections.Amazon,
        'eBay': data.marketplaceConnections?.['eBay'] ?? existing.marketplaceConnections['eBay'],
      },
      status: data.status ?? existing.status,
      variants: existing.variants.map((variant) =>
        variant.sku === existing.sku
          ? { ...variant, inventory: data.inventory ?? variant.inventory, price: data.price ?? variant.price, cost: data.cost ?? variant.cost }
          : variant,
      ),
    };

    const next = [...current];
    next[index] = updated;
    persistProducts(next);
    return updated;
  },

  async delete(id: string): Promise<void> {
    const next = readProducts().filter((product) => product.id !== id);
    persistProducts(next);
  },
};

// TODO: Replace this mock repository with a PostgreSQL/Supabase repository when the real database is configured.
