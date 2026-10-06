import { DashboardPage } from '@/components/dashboard-page';
import { inventoryRepository } from '@/lib/data/repositories/inventoryRepository';
import { orderRepository } from '@/lib/data/repositories/orderRepository';
import { storeRepository } from '@/lib/data/repositories/storeRepository';
import { syncRepository } from '@/lib/data/repositories/syncRepository';
import { getDashboardData } from '@/lib/services/dashboard';

export default async function HomePage() {
  const [stats, inventory, orders, stores, syncJobs] = await Promise.all([
    getDashboardData(),
    inventoryRepository.getAll(),
    orderRepository.getAll(),
    storeRepository.getAll(),
    syncRepository.getAll(),
  ]);

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Overview</div>
          <h2>Revenue + fulfillment snapshot</h2>
        </div>
      </div>

      <DashboardPage
        stats={stats}
        inventory={inventory}
        orders={orders}
        stores={stores}
        syncJobs={syncJobs}
      />
    </>
  );
}
