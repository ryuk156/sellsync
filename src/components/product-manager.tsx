'use client';

import Image from 'next/image';
import { useState } from 'react';
import { productRepository } from '@/lib/data/repositories/productRepository';
import type { Product } from '@/lib/types';

export function ProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Product['status']>('All');
  const [sortBy, setSortBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'inventory-desc') return b.inventory - a.inventory;
    if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
    return a.title.localeCompare(b.title);
  });

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const pageItems = sortedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const updateInventory = async (id: string, nextInventory: number) => {
    const updated = await productRepository.update(id, { inventory: nextInventory });
    setProducts((current) => current.map((product) => (product.id === id ? updated : product)));
  };

  return (
    <div className="page-stack">
      <div className="panel controls-panel">
        <div className="toolbar-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products, SKU, or brand"
            className="search-input"
          />

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'All' | Product['status'])} className="select-control">
            <option value="All">All status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Low Stock">Low Stock</option>
          </select>

          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="select-control">
            <option value="title">Sort: Name</option>
            <option value="price-desc">Price: High to low</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="inventory-desc">Inventory: High to low</option>
            <option value="brand">Brand</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {pageItems.map((product) => (
          <article key={product.id} className="product-card">
            <Image
              src={product.image}
              alt={product.title}
              width={700}
              height={260}
              className="product-thumb"
              unoptimized
            />

            <div className="product-body">
              <div className="product-header-row">
                <div>
                  <div className="row-title">{product.title}</div>
                  <div className="row-meta">{product.sku}</div>
                </div>
                <span className={`badge ${product.status === 'Active' ? 'success' : product.status === 'Low Stock' ? 'warning' : 'neutral'}`}>
                  {product.status}
                </span>
              </div>

              <p className="product-description">{product.description}</p>

              <div className="meta-row">
                <span>Brand: {product.brand}</span>
                <span>Price: ${product.price.toFixed(2)}</span>
              </div>

              <div className="inventory-inline">
                <span>Inventory: {product.inventory}</span>
                <button type="button" className="tiny-button" onClick={() => updateInventory(product.id, Math.max(0, product.inventory - 2))}>
                  -2
                </button>
                <button type="button" className="tiny-button" onClick={() => updateInventory(product.id, Math.min(product.inventory + 2, 99))}>
                  +2
                </button>
              </div>

              <div className="marketplace-pills">
                {Object.entries(product.marketplaceConnections).map(([name, connected]) => (
                  <span key={name} className={`mini-badge ${connected ? 'success' : 'neutral'}`}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pagination-bar">
        <button type="button" className="ghost-button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>
          Previous
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button type="button" className="ghost-button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}>
          Next
        </button>
      </div>
    </div>
  );
}
