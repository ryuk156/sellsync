import type { InventoryAlert, InventoryItem } from '@/lib/types';

export const mockInventory: InventoryItem[] = [
  { id: 'inv-1', sku: 'DELL-7420-I5-16-512', productTitle: 'Dell Latitude 7420', onHand: 12, reserved: 2, available: 10, reorderPoint: 4, location: 'Toronto Warehouse', lastUpdated: '2026-10-06T08:20:00.000Z' },
  { id: 'inv-2', sku: 'LEN-T14-G2-16-512', productTitle: 'Lenovo ThinkPad T14 Gen 2', onHand: 4, reserved: 2, available: 2, reorderPoint: 3, location: 'Toronto Warehouse', lastUpdated: '2026-10-06T07:55:00.000Z' },
  { id: 'inv-3', sku: 'HP-840-G8-I7-16-512', productTitle: 'HP EliteBook 840 G8', onHand: 7, reserved: 1, available: 6, reorderPoint: 3, location: 'Montreal DC', lastUpdated: '2026-10-05T18:10:00.000Z' },
  { id: 'inv-4', sku: 'DELL-5420-I5-16-256', productTitle: 'Dell Latitude 5420', onHand: 2, reserved: 0, available: 2, reorderPoint: 3, location: 'Vancouver Hub', lastUpdated: '2026-10-05T22:40:00.000Z' },
  { id: 'inv-5', sku: 'IPAD-10-64', productTitle: 'Apple iPad 10th Gen', onHand: 15, reserved: 3, available: 12, reorderPoint: 5, location: 'Toronto Warehouse', lastUpdated: '2026-10-06T06:15:00.000Z' },
  { id: 'inv-6', sku: 'LEN-X1C-I7-16-512', productTitle: 'Lenovo ThinkPad X1 Carbon', onHand: 5, reserved: 1, available: 4, reorderPoint: 2, location: 'Calgary Region', lastUpdated: '2026-10-05T16:45:00.000Z' },
  { id: 'inv-7', sku: 'HP-450-G8-I5-16-512', productTitle: 'HP ProBook 450 G8', onHand: 9, reserved: 1, available: 8, reorderPoint: 4, location: 'Montreal DC', lastUpdated: '2026-10-06T06:05:00.000Z' },
  { id: 'inv-8', sku: 'ASUS-ZB14-I5-16-512', productTitle: 'Asus ZenBook 14', onHand: 11, reserved: 2, available: 9, reorderPoint: 4, location: 'Ottawa Distribution', lastUpdated: '2026-10-05T23:22:00.000Z' },
  { id: 'inv-9', sku: 'MSFT-SURFACE-13-16-512', productTitle: 'Microsoft Surface Laptop 5', onHand: 8, reserved: 2, available: 6, reorderPoint: 3, location: 'Toronto Warehouse', lastUpdated: '2026-10-06T01:55:00.000Z' },
  { id: 'inv-10', sku: 'IPAD-PRO-12-256', productTitle: 'Apple iPad Pro 12.9', onHand: 3, reserved: 1, available: 2, reorderPoint: 2, location: 'Vancouver Hub', lastUpdated: '2026-10-05T20:40:00.000Z' },
  { id: 'inv-11', sku: 'LEN-YOGA7I-I7-16-512', productTitle: 'Lenovo Yoga 7i', onHand: 3, reserved: 1, available: 2, reorderPoint: 2, location: 'Ottawa Distribution', lastUpdated: '2026-10-04T12:30:00.000Z' },
  { id: 'inv-12', sku: 'GOOGLE-PXLBOOK-GO-8-128', productTitle: 'Google Pixelbook Go', onHand: 7, reserved: 1, available: 6, reorderPoint: 3, location: 'Calgary Region', lastUpdated: '2026-10-06T02:05:00.000Z' },
];

export const mockInventoryAlerts: InventoryAlert[] = [
  { id: 'alert-1', sku: 'LEN-T14-G2-16-512', title: 'Lenovo ThinkPad T14 Gen 2', available: 2, threshold: 3 },
  { id: 'alert-2', sku: 'DELL-5420-I5-16-256', title: 'Dell Latitude 5420', available: 2, threshold: 3 },
  { id: 'alert-3', sku: 'IPAD-PRO-12-256', title: 'Apple iPad Pro 12.9', available: 2, threshold: 2 },
  { id: 'alert-4', sku: 'LEN-YOGA7I-I7-16-512', title: 'Lenovo Yoga 7i', available: 2, threshold: 2 },
  { id: 'alert-5', sku: 'DELL-XPS13-I7-16-512', title: 'Dell XPS 13', available: 1, threshold: 2 },
];
