"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@meetzen/ui/src/components/tabs";
import { Monitor, Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <Tabs className="w-full" defaultValue="system">
      <TabsList className="grid w-full grid-cols-3 bg-muted/50">
        <TabsTrigger
          value="system"
          className="flex items-center gap-2 text-xs"
          onClick={() => setTheme("system")}
        >
          <Monitor className="w-4 h-4" />
          Sistema
        </TabsTrigger>
        <TabsTrigger
          value="light"
          className="flex items-center gap-2 text-xs"
          onClick={() => setTheme("light")}
        >
          <Sun className="w-4 h-4" />
          Claro
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          className="flex items-center gap-2 text-xs"
          onClick={() => setTheme("dark")}
        >
          <Moon className="w-4 h-4" />
          Oscuro
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
