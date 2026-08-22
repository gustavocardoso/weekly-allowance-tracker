import type { ReactNode } from 'react';

import Container from '@/components/Container';
import StorageModeIndicator from '@/components/StorageModeIndicator';
import { classNames } from '@/utils/classNames';

export interface HeaderNavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  navigation?: HeaderNavItem[];
  actions?: ReactNode;
}

export function Header({ title, subtitle, navigation = [], actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/90 backdrop-blur">
      <Container className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-4xl" aria-hidden="true">
              🌈
            </span>
            <div>
              <h1 className="text-xl font-black text-slate-900 sm:text-2xl">{title}</h1>
              {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          {/* Storage Mode Indicator */}
          <StorageModeIndicator />
          
          {navigation.length ? (
            <nav aria-label="Primary navigation">
              <ul className="flex flex-wrap gap-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={item.isActive ? 'page' : undefined}
                      className={classNames(
                        'inline-flex min-h-12 items-center rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                        item.isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-slate-600 hover:bg-primary-50 hover:text-primary-700',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {actions}
        </div>
      </Container>
    </header>
  );
}

export default Header;
