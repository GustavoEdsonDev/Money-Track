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
  Search,
  Menu,
  X,
} from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname()
  const [currentPageLabel, setCurrentPageLabel] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  // Get current page label
  useEffect(() => {
    const currentItem = menuItems.find(item => 
      item.exact ? pathname === item.href : pathname.startsWith(item.href)
    );
    setCurrentPageLabel(currentItem?.label || 'Dashboard');
  }, [pathname]);

  return (
    <div className="flex h-screen bg-background flex-col sm:flex-row" suppressHydrationWarning>
      {/* Overlay - Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed sm:static inset-y-0 left-0 w-64 bg-card flex flex-col border-r transform transition-transform duration-300 z-40 sm:z-0 order-2 sm:order-1 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="size-5 sm:size-6 text-primary" />
            <h1 className="text-lg sm:text-xl font-bold">MoneyTrack</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="sm:hidden p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="p-2 sm:p-4 space-y-1 sm:space-y-2 flex-1 overflow-auto">
          {menuItems.map(({ href, label, icon: Icon }) => (
            <Link 
              key={href} 
              href={href}
              onClick={() => setSidebarOpen(false)}
            >
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-xs sm:text-sm"
              >
                <Icon className="size-4 shrink-0" />
                <span>{label}</span>
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-2 sm:p-4 border-t">
          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="size-8 sm:size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="font-semibold text-xs sm:text-sm">{user?.user_metadata?.full_name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 hidden sm:block">
              <p className="font-semibold text-xs sm:text-sm truncate">{user?.user_metadata?.full_name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <Link 
              href="/dashboard/settings" 
              className="block"
              onClick={() => setSidebarOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start gap-2 text-xs sm:text-sm" size="sm">
                <Settings className="size-4 shrink-0" />
                <span>Settings</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-red-600 text-xs sm:text-sm" 
              size="sm" 
              onClick={() => {
                setSidebarOpen(false);
                handleSignOut();
              }}
              disabled={loading}
            >
              <LogOut className="size-4 shrink-0" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden order-1 sm:order-2">
        {/* Top Bar */}
        <header className="h-12 sm:h-16 border-b bg-card px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between shrink-0 gap-3 sm:gap-4">
          <div className="flex-1 flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sm:hidden p-1 hover:bg-muted rounded transition-colors"
            >
              <Menu className="size-5" />
            </button>
            <h2 className="text-sm sm:text-base font-semibold md:hidden">
              {currentPageLabel}
            </h2>
            <div className="flex-1 max-w-md relative hidden md:flex">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-transparent focus:border-primary focus:outline-none text-xs sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs sm:text-sm font-semibold cursor-pointer hover:bg-muted/80 transition-colors">
             {user?.user_metadata?.full_name?.charAt(0).toUpperCase()}
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
