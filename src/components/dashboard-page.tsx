import type { InventoryItem, Order, Store, SyncJob } from '@/lib/types';

export function DashboardPage({
  stats,
  inventory,
  orders,
  stores,
  syncJobs,
}: {
  stats: {
    sales: number;
    orders: number;
    products: number;
    lowStock: number;
    connectedChannels: number;
    syncHealth: number;
  };
  inventory: InventoryItem[];
  orders: Order[];
  stores: Store[];
  syncJobs: SyncJob[];
}) {
  const lowStockItems = inventory.filter((item) => item.available < item.reorderPoint).slice(0, 5);
  const recentOrders = orders.slice(0, 4);

  return (
    <div className="page-stack">
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Sales</div>
          <div className="stat-value">${stats.sales.toFixed(2)}</div>
          <div className="stat-foot">Today&apos;s sales</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-foot">Across all marketplaces</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Products</div>
          <div className="stat-value">{stats.products}</div>
          <div className="stat-foot">Catalog entries</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Low Stock</div>
          <div className="stat-value danger">{stats.lowStock}</div>
          <div className="stat-foot">Items needing attention</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Connected Channels</div>
          <div className="stat-value">{stats.connectedChannels}</div>
          <div className="stat-foot">Active store connections</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Sync Health</div>
          <div className="stat-value success">{stats.syncHealth}%</div>
          <div className="stat-foot">Based on recent syncs</div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="section-header">
            <h2>Recent orders</h2>
            <span className="badge neutral">{orders.length} total</span>
          </div>

          <div className="orders-list">
            {recentOrders.map((order) => (
              <div key={order.id} className="order-row">
                <div>
                  <div className="row-title">{order.orderNumber}</div>
                  <div className="row-meta">{order.customerName}</div>
                </div>
                <div>
                  <div className="row-title">{order.marketplace}</div>
                  <div className="row-meta">{order.status}</div>
                </div>
                <div className="row-amount">${order.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-header">
            <h2>Low stock</h2>
            <span className="badge warning">{lowStockItems.length}</span>
          </div>

          <div className="stack-list">
            {lowStockItems.map((item) => (
              <div key={item.id} className="list-row">
                <div>
                  <div className="row-title">{item.productTitle}</div>
                  <div className="row-meta">{item.sku}</div>
                </div>
                <div className="row-amount danger">{item.available} left</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="section-header">
            <h2>Marketplace status</h2>
          </div>

          <div className="stack-list">
            {stores.map((store) => (
              <div key={store.id} className="list-row">
                <div>
                  <div className="row-title">{store.name}</div>
                  <div className="row-meta">{store.channelType}</div>
                </div>
                <span className={`badge ${store.connected ? 'success' : 'neutral'}`}>
                  {store.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-header">
            <h2>Recent sync activity</h2>
          </div>

          <div className="stack-list">
            {syncJobs.slice(0, 4).map((job) => (
              <div key={job.id} className="list-row">
                <div>
                  <div className="row-title">{job.marketplace} • {job.syncType}</div>
                  <div className="row-meta">{job.records} records</div>
                </div>
                <span className={`badge ${job.status === 'SUCCEEDED' ? 'success' : job.status === 'FAILED' ? 'danger' : 'warning'}`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
