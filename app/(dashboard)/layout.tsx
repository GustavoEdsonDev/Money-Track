"use client"
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
  Bell,
  Search,
} from 'lucide-react';
import { ReactNode } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from "next/navigation";
import { useTransactions } from '@/hooks/use-transactions';

interface MenuItem {
  href: string;
  label: string;
  icon: any;
  exact?: boolean;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {


  const {signOut, loading, user} = useAuth()
  const router = useRouter()
  const handleSignOut = async () => {
    await signOut();
    router.push("/login")
  }
  const menuItems: MenuItem[] = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/dashboard/transactions',
      label: 'Transactions',
      icon: ArrowLeftRight,
    },
    {
      href: '/dashboard/categories',
      label: 'Categories',
      icon: Tag,
    },
    {
      href: '/dashboard/accounts',
      label: 'Accounts',
      icon: Wallet,
    },
    {
      href: '/dashboard/budgets',
      label: 'Budgets',
      icon: Target,
    },
  ];

  return (
    <div className="flex h-screen bg-background" suppressHydrationWarning>
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <Wallet className="size-6 text-primary" />
            <h1 className="text-xl font-bold">MoneyTrack</h1>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
              >
                <Icon className="size-4" />
                {label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Net Worth - Bottom Card */}
        <div className="p-4 border-t">
          <div className="p-4 bg-muted rounded-lg border mb-4">
            <p className="text-xs text-muted-foreground mb-1">Net Worth</p>
            <p className="text-xl font-bold text-green-600">$14,250.75</p>
            <p className="text-xs text-green-600 mt-1">↑ 3.2% vs last month</p>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-muted flex items-center justify-center">
              <span className="font-semibold">{user?.user_metadata.full_name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{user?.user_metadata.full_name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
              <Settings className="size-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-red-600" size="sm" onClick={handleSignOut} disabled={loading}>
              <LogOut className="size-4"  />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1 max-w-md relative hidden md:flex">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions, categories..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-transparent focus:border-primary focus:outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold cursor-pointer">
              G
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-muted/50">
          {children}
        </main>
      </div>
    </div>
  );
}
