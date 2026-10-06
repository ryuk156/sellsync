'use client';

import { useMemo, useState } from 'react';
import type { Order } from '@/lib/types';

export function OrderManager({ initialOrders }: { initialOrders: Order[] }) {
  const [orders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [marketplaceFilter, setMarketplaceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.marketplace.toLowerCase().includes(search.toLowerCase());
      const matchesMarketplace = marketplaceFilter === 'All' || order.marketplace === marketplaceFilter;
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesMarketplace && matchesStatus;
    });
  }, [marketplaceFilter, orders, search, statusFilter]);

  return (
    <div className="page-stack">
      <div className="panel controls-panel">
        <div className="toolbar-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search orders or customer"
            className="search-input"
          />

          <select value={marketplaceFilter} onChange={(event) => setMarketplaceFilter(event.target.value)} className="select-control">
            <option value="All">All marketplaces</option>
            <option value="Shopify">Shopify</option>
            <option value="Walmart">Walmart</option>
            <option value="Amazon">Amazon</option>
            <option value="eBay">eBay</option>
          </select>

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="select-control">
            <option value="All">All statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Fulfilled">Fulfilled</option>
            <option value="Partially fulfilled">Partially fulfilled</option>
          </select>
        </div>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Marketplace</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Fulfillment</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.marketplace}</td>
                  <td>{order.customerName}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${order.status === 'Paid' ? 'success' : order.status === 'Cancelled' ? 'danger' : order.status === 'Pending' ? 'warning' : 'neutral'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.fulfillment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
