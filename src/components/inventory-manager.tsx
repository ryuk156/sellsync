'use client';

import { useMemo, useState } from 'react';
import { inventoryRepository } from '@/lib/data/repositories/inventoryRepository';
import type { InventoryItem } from '@/lib/types';

export function InventoryManager({ initialItems }: { initialItems: InventoryItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [selectedSku, setSelectedSku] = useState(initialItems[0]?.sku ?? '');
  const [delta, setDelta] = useState(-2);
  const [reason, setReason] = useState('Sold externally');
  const [history, setHistory] = useState<{ sku: string; reason: string; delta: number; newQuantity: number; timestamp: string }[]>([]);

  const selected = useMemo(
    () => items.find((item) => item.sku === selectedSku) ?? items[0] ?? null,
    [items, selectedSku],
  );

  const handleAdjust = async () => {
    if (!selected) {
      return;
    }

    const nextQuantity = Math.max(0, selected.onHand + delta);
    const updated = await inventoryRepository.update(selected.id, nextQuantity);
    setItems((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    setHistory((current) => [
      {
        sku: selected.sku,
        reason,
        delta,
        newQuantity: updated.available,
        timestamp: new Date().toISOString(),
      },
      ...current,
    ].slice(0, 5));
  };

  return (
    <div className="page-stack">
      <div className="panel inventory-form-panel">
        <h2>Inventory adjustment</h2>

        <div className="inventory-grid">
          <label>
            <span>SKU</span>
            <select value={selectedSku} onChange={(event) => setSelectedSku(event.target.value)} className="select-control">
              {items.map((item) => (
                <option key={item.id} value={item.sku}>
                  {item.sku}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Adjustment</span>
            <input type="number" value={delta} onChange={(event) => setDelta(Number(event.target.value))} className="search-input" />
          </label>

          <label>
            <span>Reason</span>
            <input value={reason} onChange={(event) => setReason(event.target.value)} className="search-input" />
          </label>
        </div>

        {selected ? (
          <div className="inventory-summary">
            <div>
              <div className="stat-label">Current on hand</div>
              <div className="stat-value">{selected.onHand}</div>
            </div>
            <div>
              <div className="stat-label">Adjustment</div>
              <div className="stat-value">{delta}</div>
            </div>
            <div>
              <div className="stat-label">Projected available</div>
              <div className="stat-value">{Math.max(selected.onHand + delta - selected.reserved, 0)}</div>
            </div>
          </div>
        ) : null}

        <button type="button" className="primary-button" onClick={handleAdjust}>
          Save adjustment
        </button>
      </div>

      <div className="panel">
        <div className="section-header">
          <h2>Inventory level</h2>
          <span className="badge neutral">{items.length} SKUs</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>On hand</th>
                <th>Reserved</th>
                <th>Available</th>
                <th>Threshold</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.sku}</td>
                  <td>{item.onHand}</td>
                  <td>{item.reserved}</td>
                  <td>{item.available}</td>
                  <td>{item.reorderPoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="section-header">
          <h2>Inventory history</h2>
        </div>

        <div className="stack-list">
          {history.length === 0 ? (
            <div className="empty-state">No adjustments recorded yet.</div>
          ) : (
            history.map((entry, index) => (
              <div key={`${entry.sku}-${index}`} className="list-row">
                <div>
                  <div className="row-title">{entry.sku}</div>
                  <div className="row-meta">{entry.reason}</div>
                </div>
                <div className="row-amount">{entry.delta > 0 ? '+' : ''}{entry.delta} → {entry.newQuantity}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
