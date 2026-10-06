'use client';

import { useState } from 'react';
import { storeRepository } from '@/lib/data/repositories/storeRepository';
import { shopifyAdapter } from '@/lib/marketplaces/shopify/adapter';
import type { Store } from '@/lib/types';

const SHOPIFY_STORAGE_KEY = 'sellsync-shopify-credentials';

function readSavedCredentials() {
  if (typeof window === 'undefined') {
    return { shop: '', token: '', version: '2024-10' };
  }

  try {
    const raw = window.localStorage.getItem(SHOPIFY_STORAGE_KEY);
    if (!raw) {
      return { shop: '', token: '', version: '2024-10' };
    }

    const saved = JSON.parse(raw) as { shop?: string; token?: string; version?: string };
    return {
      shop: saved.shop ?? '',
      token: saved.token ?? '',
      version: saved.version ?? '2024-10',
    };
  } catch {
    return { shop: '', token: '', version: '2024-10' };
  }
}

export function IntegrationManager({ initialStores }: { initialStores: Store[] }) {
  const [stores, setStores] = useState(initialStores);
  const [shop, setShop] = useState(() => readSavedCredentials().shop);
  const [token, setToken] = useState(() => readSavedCredentials().token);
  const [version, setVersion] = useState(() => readSavedCredentials().version);
  const [error, setError] = useState<string | null>(null);
  const [connectionStep, setConnectionStep] = useState<'idle' | 'connecting' | 'authenticating' | 'connected' | 'syncing'>('idle');

  const handleConnectShopify = async () => {
    if (!shop.trim() || !token.trim()) {
      setError('Shop name and access token are required.');
      return;
    }

    setError(null);
    setConnectionStep('connecting');
    await new Promise((resolve) => setTimeout(resolve, 700));
    setConnectionStep('authenticating');
    await new Promise((resolve) => setTimeout(resolve, 700));
    setConnectionStep('connected');

    const credentials = { shop: shop.trim().replace(/^https?:\/\//, '').replace(/\.myshopify\.com$/, ''), token: token.trim(), version };
    window.localStorage.setItem(SHOPIFY_STORAGE_KEY, JSON.stringify(credentials));

    try {
      await shopifyAdapter.connect(credentials);
      const updated = await storeRepository.updateStatus('Shopify', 'Connected');
      setStores((current) => current.map((store) => (store.name === 'Shopify' ? updated : store)));
      await new Promise((resolve) => setTimeout(resolve, 600));
      setConnectionStep('syncing');
      await new Promise((resolve) => setTimeout(resolve, 600));
      setConnectionStep('idle');
    } catch (connectError) {
      setConnectionStep('idle');
      setError(connectError instanceof Error ? connectError.message : 'Shopify connection failed.');
    }
  };

  return (
    <div className="page-stack">
      <div className="panel">
        <div className="section-header">
          <h2>Marketplace connections</h2>
          <span className="badge neutral">{stores.filter((store) => store.connected).length} connected</span>
        </div>

        <div className="connection-list">
          {stores.map((store) => (
            <div key={store.id} className="connection-card">
              <div>
                <div className="row-title">{store.name}</div>
                <div className="row-meta">{store.channelType}</div>
              </div>
              <div className="row-meta">{store.status}</div>
              {store.name === 'Shopify' && store.status !== 'Connected' ? (
                <button type="button" className="primary-button" onClick={handleConnectShopify}>
                  Connect Shopify
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2>Shopify credentials</h2>
        <div className="inventory-grid">
          <label>
            <span>Shop domain</span>
            <input value={shop} onChange={(event) => setShop(event.target.value)} className="search-input" placeholder="your-shop" />
          </label>

          <label>
            <span>Access token</span>
            <input value={token} onChange={(event) => setToken(event.target.value)} className="search-input" placeholder="shpat_..." type="password" />
          </label>

          <label>
            <span>API version</span>
            <input value={version} onChange={(event) => setVersion(event.target.value)} className="search-input" placeholder="2024-10" />
          </label>
        </div>

        {error ? <div className="empty-state" style={{ color: 'var(--red)' }}>{error}</div> : null}
      </div>

      <div className="panel">
        <h2>Connection flow</h2>
        <div className="connection-status-row">
          {['connecting', 'authenticating', 'connected', 'syncing'].map((step) => (
            <div key={step} className={`status-step ${connectionStep === step ? 'active' : ''}`}>
              {step === 'connecting' && 'Connecting...'}
              {step === 'authenticating' && 'Authenticating...'}
              {step === 'connected' && 'Connected'}
              {step === 'syncing' && 'Initial sync started'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
