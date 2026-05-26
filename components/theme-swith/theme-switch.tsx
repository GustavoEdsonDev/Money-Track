"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Switch } from "@/components/ui/switch";

export function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
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
      <Sun className="size-4 text-muted-foreground" />

      <Switch
        checked={isDark}
        onCheckedChange={(checked) => {
          console.log("Tema alterado:", checked ? "dark" : "light");
          setTheme(checked ? "dark" : "light");
        }}
      />

      <Moon className="size-4 text-muted-foreground" />
    </div>
  );
}