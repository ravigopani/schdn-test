"use client";

import { useEffect, useState } from "react";
import {
  SearchIcon,
  MapPinIcon,
  ChevronDownIcon,
  HeartIcon,
  UserIcon,
  PlusIcon,
  MenuIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { LoginDialog } from "@/components/home/login-dialog";

const categories = [
  "Cars",
  "Motorcycles",
  "Mobile Phones",
  "For Sale: Houses & Apartments",
  "For Rent: Houses & Apartments",
  "Beds-Wardrobes",
  "TVs, Video - Audio",
];

export function HomeHeader() {
  const [today, setToday] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  return (
    <>
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="flex items-center gap-4 px-4 py-2.5 md:px-6">
        <a href="/home" className="shrink-0">
          <span className="text-3xl font-bold tracking-tight text-[#002f34]">
            olx
          </span>
        </a>

        <button className="hidden h-11 min-w-40 items-center gap-2 rounded-md border-2 border-[#002f34] px-3 text-sm font-medium text-[#002f34] md:flex">
          <MapPinIcon className="size-5" />
          <span className="flex-1 text-left">India</span>
          <ChevronDownIcon className="size-4" />
        </button>

        <div className="flex flex-1 items-center">
          <div className="relative flex w-full items-center">
            <SearchIcon className="pointer-events-none absolute left-3 size-5 text-[#002f34]" />
            <Input
              type="search"
              placeholder='Search "Mobiles"'
              className="h-11 rounded-md border-2 border-[#002f34] pr-14 pl-10 text-sm"
            />
            <button
              aria-label="Search"
              className="absolute right-0 flex h-11 w-12 items-center justify-center rounded-r-md bg-[#3a77ff] text-white transition-colors hover:bg-[#2f66e0]">
              <SearchIcon className="size-5" />
            </button>
          </div>
        </div>

        <button className="hidden items-center gap-1.5 text-sm font-semibold text-[#002f34] lg:flex">
          <HeartIcon className="size-6" />
          <span className="hidden xl:inline">Wishlist</span>
        </button>

        <button
          onClick={() => setLoginOpen(true)}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#002f34] underline-offset-2 hover:underline">
          <UserIcon className="size-6" />
          <span className="hidden sm:inline">Login</span>
        </button>

        <button className="relative shrink-0 rounded-full bg-white p-0.5">
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffce32] via-[#23e5db] to-[#002f34]" />
          <span className="relative flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#002f34]">
            <PlusIcon className="size-4" />
            SELL
          </span>
        </button>
      </div>

      <nav className="border-t">
        <div className="flex items-center gap-4 overflow-x-auto px-4 py-2 md:px-6">
          <button className="flex shrink-0 items-center gap-2 rounded-full bg-[#3a77ff] px-4 py-1.5 text-sm font-semibold text-white">
            <MenuIcon className="size-4" />
            ALL CATEGORIES
          </button>

          <ul className="flex items-center gap-4 whitespace-nowrap text-sm text-[#002f34]">
            {categories.map((cat) => (
              <li key={cat}>
                <a href="#" className="hover:text-[#3a77ff]">
                  {cat}
                </a>
              </li>
            ))}
          </ul>

          <span
            suppressHydrationWarning
            className="ml-auto hidden shrink-0 pl-4 text-sm text-muted-foreground md:block">
            {today}
          </span>
        </div>
      </nav>
    </header>

    <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
