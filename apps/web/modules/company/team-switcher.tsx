"use client";

import * as React from "react";
import Image from "next/image";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@meetzen/ui/src/components/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Image
            src="/assets/logo_icon.png"
            alt="Meetzen"
            width={32}
            height={32}
            className="object-contain"
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Meetzen</span>
            <span className="truncate text-xs">Empresa</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
