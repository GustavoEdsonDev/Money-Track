"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { ThemeSwitch } from "@/components/theme-swith/theme-switch";

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
} from "lucide-react";

interface MenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const menuItems: MenuItem[] = [
  {
    href: "/dashboard",
    label: "Início",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/transactions",
    label: "Transações",
    icon: ArrowLeftRight,
  },
  {
    href: "/dashboard/categories",
    label: "Categorias",
    icon: Tag,
  },
  {
    href: "/dashboard/accounts",
    label: "Contas",
    icon: Wallet,
  },
  {
    href: "/dashboard/budgets",
    label: "Orçamentos",
    icon: Target,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { signOut, loading, user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(!false);
  const [isDark, SetIsDark] = useState(true);

  const userName = user?.user_metadata?.full_name ?? "Usuário";
  const userEmail = user?.email ?? "";
  const userInitial = userName.charAt(0).toUpperCase();

  const currentItem = menuItems.find((item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)
  );

  const currentPageLabel =
    pathname === "/dashboard/settings"
      ? "Configurações"
      : currentItem?.label ?? "Início";

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div
      className="flex h-screen flex-col bg-background text-foreground sm:flex-row"
      suppressHydrationWarning
    >

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu lateral"
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      <aside
        className={`fixed inset-y-0 left-0 z-40 order-2 flex w-64 flex-col border-r bg-card transition-transform duration-300 sm:static sm:z-0 sm:order-1 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
 
        <div className="flex items-center justify-between border-b p-4 sm:p-6">
          <Link
            href="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2"
          >
            <Wallet className="size-5 text-primary sm:size-6" />
            <span className="text-lg font-bold sm:text-xl">MoneyTrack</span>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded p-1 transition-colors hover:bg-muted sm:hidden"
            aria-label="Fechar menu"
          >
            <X className="size-5" />
          </button>
        </div>

 
        <div className="flex items-center justify-between border-b px-4 py-3" >
          <ThemeSwitch />

          
        </div>


        <nav className="flex-1 space-y-1 overflow-auto p-2 sm:space-y-2 sm:p-4">
          {menuItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href);

            return (
              <Button
                key={href}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 text-xs sm:text-sm"
              >
                <Link href={href} onClick={() => setSidebarOpen(false)}>
                  <Icon className="size-4 shrink-0" />
                  <span>{label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>


        <div className="border-t p-2 sm:p-4">
          {/* User Profile */}
          <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted sm:size-10">
              <span className="text-xs font-semibold sm:text-sm">
                {userInitial}
              </span>
            </div>

            <div className="hidden flex-1 sm:block">
              <p className="truncate text-xs font-semibold sm:text-sm">
                {userName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Button
              asChild
              variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 text-xs sm:text-sm"
              size="sm"
            >
              <Link
                href="/dashboard/settings"
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="size-4 shrink-0" />
                <span>Configurações</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 sm:text-sm dark:hover:bg-red-950/30"
              size="sm"
              onClick={() => {
                setSidebarOpen(false);
                handleSignOut();
              }}
              disabled={loading}
            >
              <LogOut className="size-4 shrink-0" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </aside>


      <div className="order-1 flex flex-1 flex-col overflow-hidden sm:order-2">
        {/* Top Bar */}
        <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b bg-card px-3 py-2 sm:h-16 sm:px-6 sm:py-4">
          
          <div className="flex flex-1 items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded p-1 transition-colors hover:bg-muted sm:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </button>

            <h2 className="text-sm font-semibold md:hidden">
              {currentPageLabel}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-muted text-xs font-semibold transition-colors hover:bg-muted/80 sm:text-sm">
              {userInitial}
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