import {
  CarIcon,
  BikeIcon,
  Building2Icon,
  RefrigeratorIcon,
  SmartphoneIcon,
  TruckIcon,
  BriefcaseIcon,
  SofaIcon,
  ShirtIcon,
  DogIcon,
  BookOpenIcon,
  WrenchIcon,
} from "lucide-react";

const categories = [
  { label: "Cars", Icon: CarIcon },
  { label: "Bikes", Icon: BikeIcon },
  { label: "Properties", Icon: Building2Icon },
  { label: "Electronics & Appliances", Icon: RefrigeratorIcon },
  { label: "Mobiles", Icon: SmartphoneIcon },
  { label: "Commercial Vehicles & Spares", Icon: TruckIcon },
  { label: "Jobs", Icon: BriefcaseIcon },
  { label: "Furniture", Icon: SofaIcon },
  { label: "Fashion", Icon: ShirtIcon },
  { label: "Pets", Icon: DogIcon },
  { label: "Books, Sports & Hobbies", Icon: BookOpenIcon },
  { label: "Services", Icon: WrenchIcon },
];

export function CategoryGrid() {
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
      {categories.map(({ label, Icon }) => (
        <a
          key={label}
          href="#"
          className="group flex flex-col items-center gap-2 text-center">
          <div className="flex size-20 items-center justify-center rounded-xl bg-[#f2f4f5] ring-1 ring-border transition-colors group-hover:bg-[#e6f0ff]">
            <Icon className="size-9 text-[#002f34]" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-medium text-[#002f34]">{label}</span>
        </a>
      ))}
    </section>
  );
}
