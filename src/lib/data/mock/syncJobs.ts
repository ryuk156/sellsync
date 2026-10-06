import type { SyncJob } from '@/lib/types';

export const mockSyncJobs: SyncJob[] = [
  { id: 'sync-1', marketplace: 'Shopify', syncType: 'Products', status: 'SUCCEEDED', startedAt: '2026-10-06T08:00:00.000Z', completedAt: '2026-10-06T08:00:04.200Z', records: 248, durationSeconds: 4.2 },
  { id: 'sync-2', marketplace: 'Shopify', syncType: 'Inventory', status: 'SUCCEEDED', startedAt: '2026-10-06T08:05:00.000Z', completedAt: '2026-10-06T08:05:02.900Z', records: 183, durationSeconds: 2.9 },
  { id: 'sync-3', marketplace: 'Shopify', syncType: 'Orders', status: 'SUCCEEDED', startedAt: '2026-10-06T08:10:00.000Z', completedAt: '2026-10-06T08:10:03.500Z', records: 25, durationSeconds: 3.5 },
  { id: 'sync-4', marketplace: 'Walmart', syncType: 'Inventory', status: 'FAILED', startedAt: '2026-10-06T07:30:00.000Z', completedAt: '2026-10-06T07:30:07.100Z', records: 0, durationSeconds: 7.1, error: 'Temporary API error' },
  { id: 'sync-5', marketplace: 'Amazon', syncType: 'Products', status: 'SUCCEEDED', startedAt: '2026-10-05T23:55:00.000Z', completedAt: '2026-10-05T23:55:05.600Z', records: 121, durationSeconds: 5.6 },
  { id: 'sync-6', marketplace: 'Amazon', syncType: 'Orders', status: 'SUCCEEDED', startedAt: '2026-10-05T23:30:00.000Z', completedAt: '2026-10-05T23:30:04.700Z', records: 14, durationSeconds: 4.7 },
  { id: 'sync-7', marketplace: 'Walmart', syncType: 'Products', status: 'SUCCEEDED', startedAt: '2026-10-05T22:10:00.000Z', completedAt: '2026-10-05T22:10:06.300Z', records: 89, durationSeconds: 6.3 },
  { id: 'sync-8', marketplace: 'Shopify', syncType: 'Returns', status: 'FAILED', startedAt: '2026-10-05T21:45:00.000Z', completedAt: '2026-10-05T21:45:08.200Z', records: 0, durationSeconds: 8.2, error: 'Rate limit exceeded' },
  { id: 'sync-9', marketplace: 'eBay', syncType: 'Products', status: 'PENDING', startedAt: '2026-10-06T08:20:00.000Z', records: 0, durationSeconds: 0 },
  { id: 'sync-10', marketplace: 'Shopify', syncType: 'Pricing', status: 'RUNNING', startedAt: '2026-10-06T08:24:00.000Z', records: 20, durationSeconds: 1.9 },
];
