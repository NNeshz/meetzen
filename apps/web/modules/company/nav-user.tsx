"use client";

import Link from "next/link";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@meetzen/ui/src/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@meetzen/ui/src/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@meetzen/ui/src/components/sidebar";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@meetzen/ui/src/components/tabs";
import { Monitor, Moon, Sun } from "lucide-react";
import { authClient } from "@meetzen/auth/client";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session, isPending } = authClient.useSession();
  const { setTheme } = useTheme();

  if (isPending) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="bg-background data-[state=open]:bg-background data-[state=open]:text-sidebar-accent-foreground animate-pulse"
          />
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session?.user.image}
                  alt={session?.user.name}
                />
                <AvatarFallback className="rounded-lg">
                  {session?.user.name
                    .split(" ")
                    .map((name) => name.charAt(0).toUpperCase())
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session?.user.name}
                </span>
                <span className="truncate text-xs">{session?.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user.image}
                    alt={session?.user.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {session?.user.name
                      .split(" ")
                      .map((name) => name.charAt(0).toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session?.user.name}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="p-0">
                <Tabs className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-0">
                    <TabsTrigger
                      value="system"
                      className="flex items-center gap-2 text-xs px-1"
                      onClick={() => setTheme("system")}
                    >
                      <Monitor className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="light"
                      className="flex items-center gap-2 text-xs px-1"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="dark"
                      className="flex items-center gap-2 text-xs px-1"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="w-4 h-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BadgeCheck />
                Cuenta
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Facturación
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notificaciones
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <Link href="/auth">Cerrar sesión</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
