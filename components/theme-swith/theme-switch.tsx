"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Switch } from "@/components/ui/switch";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-11 rounded-full bg-muted" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground lg:inline">
        {isDark ? "Mudar para o claro" : "Mudar para o escuro"}
      </span>

      <Sun className="size-4 text-muted-foreground" />

      <Switch
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
      />

      <Moon className="size-4 text-muted-foreground" />
    </div>
  );
}