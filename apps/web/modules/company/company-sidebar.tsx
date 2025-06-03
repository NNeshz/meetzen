"use client"

import * as React from "react"
import {
  Calendar,
  Clock,
  HomeIcon,
  Settings2,
  Users2Icon,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@meetzen/ui/components/sidebar"
import { ThemeSwitcher } from "@meetzen/ui/src/providers/theme-switcher"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Inicio",
      url: "/company",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Citas",
      url: "/company/citas",
      icon: Calendar,
    },
    {
      title: "Empleados",
      url: "/company/empleados",
      icon: Users2Icon,
    },
    {
      title: "Citas antiguas",
      url: "/company/pasadas",
      icon: Clock,
    },
    {
      title: "Configuración",
      url: "/company/configuracion",
      icon: Settings2,
    },
  ],
}

export function CompanySidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-3">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcher />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
