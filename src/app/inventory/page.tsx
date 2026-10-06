import { InventoryManager } from '@/components/inventory-manager';
import { inventoryRepository } from '@/lib/data/repositories/inventoryRepository';

export default async function InventoryPage() {
  const items = await inventoryRepository.getAll();

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Inventory</div>
          <h2>Stock control</h2>
        </div>
      </div>

      <InventoryManager initialItems={items} />
    </>
  );
}
