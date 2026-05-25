'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tag,
  Wallet,
  Target,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';

interface MenuItem {
  href: string;
  labelKey: string; // Changed from label to labelKey
  icon: any;
  exact?: boolean;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const { signOut, loading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [currentPageLabel, setCurrentPageLabel] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const menuItems: MenuItem[] = [
    {
      href: '/dashboard',
      labelKey: 'nav.dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/dashboard/transactions',
      labelKey: 'nav.transactions',
      icon: ArrowLeftRight,
    },
    {
      href: '/dashboard/budgets',
      labelKey: 'nav.budgets',
      icon: Target,
    },
    {
      href: '/dashboard/categories',
      labelKey: 'nav.categories',
      icon: Tag,
    },
    {
      href: '/dashboard/accounts',
      labelKey: 'nav.accounts',
      icon: Wallet,
    },
    {
      href: '/dashboard/settings',
      labelKey: 'nav.settings',
      icon: Settings,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-64'
        } transition-all duration-300 bg-card border-r flex flex-col`}
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            MoneyTrack
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive =
              item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <LanguageSwitcher />
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleSignOut}
            disabled={loading}
          >
            <LogOut className="h-4 w-4" />
            {t('common.logout')}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-16 border-b bg-card flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <div className="flex-1" />
          <span className="text-sm text-muted-foreground">
            {user?.email}
          </span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
