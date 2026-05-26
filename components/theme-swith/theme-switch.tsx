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
    return (
      <div className="flex w-full items-center justify-between">
        <span className="text-sm text-muted-foreground ">Tema</span>
        <div className="h-6 w-11 rounded-full bg-muted" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {isDark ? "Mudar para o claro" : "Mudar para o escuro"}
      </p>

      <div className="flex items-center gap-2">
        <Sun className="size-4 text-muted-foreground" />

        <Switch
        
          checked={isDark}
          onCheckedChange={(checked) => {
            setTheme(checked ? "dark" : "light");
          }}
        />

        <Moon className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}