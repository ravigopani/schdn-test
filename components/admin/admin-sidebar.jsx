"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  MegaphoneIcon,
  UsersIcon,
  SettingsIcon,
  MapPinIcon,
  ChevronRightIcon,
  ShieldIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Ads",
    href: "/admin/ads",
    icon: MegaphoneIcon,
  },
  {
    title: "Manage users",
    icon: UsersIcon,
    items: [
      { title: "Admins", href: "/admin/admins" },
      { title: "Users", href: "/admin/users" },
    ],
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    items: [{ title: "Categories", href: "/admin/categories" }],
  },
  {
    title: "Address Data",
    icon: MapPinIcon,
    items: [
      { title: "State", href: "/admin/state" },
      { title: "City", href: "/admin/city" },
      { title: "Postcode", href: "/admin/postcode" },
      { title: "Region", href: "/admin/region" },
    ],
  },
];

function CollapsibleNavItem({ item, isItemActive }) {
  const hasActiveChild = item.items.some((sub) => isItemActive(sub.href));
  const [userOpen, setUserOpen] = useState(false);
  const open = userOpen || hasActiveChild;

  return (
    <SidebarMenuItem>
      <Collapsible open={open} onOpenChange={setUserOpen} className="group/collapsible">
        <CollapsibleTrigger
          render={
            <SidebarMenuButton tooltip={item.title}>
              <item.icon />
              <span>{item.title}</span>
              <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          }
        />
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((sub) => (
              <SidebarMenuSubItem key={sub.href}>
                <SidebarMenuSubButton
                  isActive={isItemActive(sub.href)}
                  render={<Link href={sub.href} />}>
                  <span>{sub.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

export function AdminSidebar(props) {
  const pathname = usePathname();

  const isItemActive = (href) =>
    href === "/admin"
      ? pathname === "/admin"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/admin" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <ShieldIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Admin Panel</span>
                <span className="text-xs text-muted-foreground">Management</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                if (!item.items) {
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={isItemActive(item.href)}
                        tooltip={item.title}
                        render={<Link href={item.href} />}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <CollapsibleNavItem
                    key={item.title}
                    item={item}
                    isItemActive={isItemActive}
                  />
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/" />}>
              <span className="text-xs text-muted-foreground">← Back to site</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
