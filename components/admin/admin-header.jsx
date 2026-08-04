"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  PlusIcon,
  SearchIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
  ChevronDownIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ADMIN_LOGIN_PATH } from "@/lib/constants";
import { clearAdminToken } from "@/lib/auth-cookies";

const routeLabels = {
  admin: "Dashboard",
  analytics: "Analytics",
  ads: "Ads",
  users: "Users",
  admins: "Admins",
  products: "Products",
  categories: "Categories",
  settings: "Settings",
  profile: "Profile",
  address: "Address Data",
  region: "Region",
  city: "City",
  state: "State",
  postcode: "Postcode",
  add: "Add",
  edit: "Edit",
};

function getBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) {
    return [{ label: "Dashboard", href: "/admin", isCurrent: true }];
  }

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = routeLabels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      label,
      href,
      isCurrent: index === segments.length - 1,
    };
  });
}

export function AdminHeader() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
      />

      <Breadcrumb className="hidden sm:block">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="contents">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isCurrent ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={crumb.href} />}>
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden md:inline-flex">
          <SearchIcon />
          Search
        </Button>

        <Button size="sm">
          <PlusIcon />
          New
        </Button>

        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <BellIcon />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-full px-2"
              />
            }>
            <Avatar size="sm">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="hidden font-medium sm:inline">Admin</span>
            <ChevronDownIcon className="hidden size-4 opacity-60 sm:inline" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">
                    Admin User
                  </span>
                  <span className="text-xs text-muted-foreground">
                    admin@example.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem render={<Link href="/admin/profile" />}>
                <UserIcon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/admin/settings" />}>
                <SettingsIcon />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  clearAdminToken();
                  window.location.assign(ADMIN_LOGIN_PATH);
                }}>
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
