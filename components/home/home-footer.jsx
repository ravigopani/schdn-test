import {
  GlobeIcon,
  AtSignIcon,
  PlayIcon,
  MessageCircleIcon,
  SendIcon,
  RssIcon,
  AppleIcon,
} from "lucide-react";

const linkColumns = [
  {
    title: "POPULAR LOCATIONS",
    links: ["Kolkata", "Mumbai", "Chennai", "Pune"],
  },
  {
    title: "TRENDING LOCATIONS",
    links: ["Bhubaneshwar", "Hyderabad", "Chandigarh", "Nashik"],
  },
  {
    title: "ABOUT US",
    links: ["About OLX India", "Tech@OLX", "Careers"],
  },
  {
    title: "OLX",
    links: [
      "Blog",
      "Help",
      "Sitemap",
      "Legal & Privacy information",
      "Vulnerability Disclosure Program",
    ],
  },
];

const socials = [
  { label: "Facebook", Icon: GlobeIcon },
  { label: "Instagram", Icon: AtSignIcon },
  { label: "YouTube", Icon: PlayIcon },
  { label: "X", Icon: MessageCircleIcon },
  { label: "WhatsApp", Icon: SendIcon },
  { label: "LinkedIn", Icon: RssIcon },
];

const brands = ["olx", "carwale", "bikewale", "CarTrade", "MOBILITY OUTLOOK"];

export function HomeFooter() {
  return (
    <footer className="mt-8">
      <div className="border-t bg-[#f2f4f5]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 md:grid-cols-3 md:px-6 lg:grid-cols-5">
          {linkColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-xs font-bold tracking-wide text-[#002f34]">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-muted-foreground hover:text-[#002f34] hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-3 text-xs font-bold tracking-wide text-[#002f34]">
              FOLLOW US
            </h3>
            <div className="mb-4 flex flex-wrap gap-3">
              {socials.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-[#002f34] transition-colors hover:text-[#3a77ff]">
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="flex w-36 items-center gap-2 rounded-md bg-black px-3 py-1.5 text-white">
                <PlayIcon className="size-5 shrink-0 fill-white" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[8px]">GET IT ON</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </span>
              </a>
              <a
                href="#"
                className="flex w-36 items-center gap-2 rounded-md bg-black px-3 py-1.5 text-white">
                <AppleIcon className="size-5 shrink-0 fill-white" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[8px]">Download on the</span>
                  <span className="text-sm font-semibold">App Store</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1f3b6e] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-4 px-4 py-6 md:px-6">
          <span className="text-lg font-bold">
            CarTrade<span className="text-[#23e5db]">Tech</span>
            <span className="ml-1 align-super text-[10px] font-normal">
              GROUP
            </span>
          </span>
          <div className="hidden h-8 w-px bg-white/30 md:block" />
          {brands.map((brand) => (
            <span key={brand} className="text-sm font-semibold opacity-90">
              {brand}
            </span>
          ))}
          <span className="ml-auto text-xs opacity-80">
            All rights reserved © 2006-2026 OLX
          </span>
        </div>
      </div>
    </footer>
  );
}
