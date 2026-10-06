import type { Store } from '@/lib/types';

export const mockStores: Store[] = [
  {
    id: 'store-1',
    name: 'Shopify',
    status: 'Connected',
    connected: true,
    channelType: 'Ecommerce',
    lastSync: '2026-10-06T09:45:00.000Z',
    region: 'Canada',
  },
  {
    id: 'store-2',
    name: 'Walmart',
    status: 'Connected',
    connected: true,
    channelType: 'Marketplace',
    lastSync: '2026-10-06T08:15:00.000Z',
    region: 'North America',
  },
  {
    id: 'store-3',
    name: 'Amazon',
    status: 'Connected',
    connected: true,
    channelType: 'Marketplace',
    lastSync: '2026-10-06T07:40:00.000Z',
    region: 'North America',
  },
  {
    id: 'store-4',
    name: 'eBay',
    status: 'Not Connected',
    connected: false,
    channelType: 'Marketplace',
    lastSync: '2026-10-03T12:00:00.000Z',
    region: 'Global',
  },
];
