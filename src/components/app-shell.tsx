import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/products', label: 'Products' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/orders', label: 'Orders' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/sync', label: 'Synchronization' },
  { href: '/settings', label: 'Settings' },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">S</div>
          <div>
            <div className="brand-name">SellGrid</div>
            <div className="brand-subtitle">Commerce OS</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-item">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="sidebar-card-label">Workspace</div>
          <div className="sidebar-card-value">Canada Operations</div>
        </div>
      </aside>

      <div className="main-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">Multichannel commerce</div>
            <h1>Operations dashboard</h1>
          </div>

          <div className="topbar-right">
            <button type="button" className="ghost-button">Export</button>
            <div className="profile-pill">
              <div className="avatar">YP</div>
              <div>
                <div className="profile-name">Yash Patel</div>
                <div className="profile-role">Admin</div>
              </div>
            </div>
          </div>
        </header>

        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}
