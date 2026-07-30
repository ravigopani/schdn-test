import {
  CarIcon,
  SmartphoneIcon,
  TruckIcon,
  SofaIcon,
  BikeIcon,
  RefrigeratorIcon,
} from "lucide-react";

import { CategoryGrid } from "@/components/home/category-grid";
import { ProductCard } from "@/components/home/product-card";

const recommendations = [
  {
    price: "₹ 12,50,000",
    meta: "2014 - 184,000 km",
    title: "Premium Sporty BMW 320d Luxury Line",
    location: "Vellnad, Elavanoor",
    date: "Jun 25",
    featured: true,
    gradient: "from-emerald-400 to-emerald-700",
    Icon: CarIcon,
  },
  {
    price: "₹ 69,00,000",
    meta: "2020 - 84,000 km",
    title: "Toyota VELLFIRE VIP - Executive Lounge",
    location: "Sadar Bazar, Gurgaon",
    date: "6 days ago",
    featured: true,
    elite: true,
    gradient: "from-slate-300 to-slate-600",
    Icon: TruckIcon,
  },
  {
    price: "₹ 7,500",
    title: "Vivo V 50 RAM 8 256 Three month old",
    location: "Samudrapur, Maharashtra",
    date: "Yesterday",
    gradient: "from-rose-400 to-rose-700",
    Icon: SmartphoneIcon,
  },
  {
    price: "₹ 8,500",
    title: "iPhone 13 with Bill box and charger",
    location: "Samudrapur, Maharashtra",
    date: "2 days ago",
    gradient: "from-indigo-400 to-indigo-700",
    Icon: SmartphoneIcon,
  },
  {
    price: "₹ 85,000",
    meta: "2019 - 45,000 km",
    title: "Royal Enfield Classic 350 - Single owner",
    location: "Andheri, Mumbai",
    date: "3 days ago",
    gradient: "from-amber-400 to-amber-700",
    Icon: BikeIcon,
  },
  {
    price: "₹ 22,000",
    title: "L-shaped Fabric Sofa Set (5 seater)",
    location: "Koramangala, Bengaluru",
    date: "4 days ago",
    gradient: "from-teal-400 to-teal-700",
    Icon: SofaIcon,
  },
  {
    price: "₹ 18,500",
    title: "Double Door Refrigerator 340L",
    location: "Salt Lake, Kolkata",
    date: "5 days ago",
    gradient: "from-cyan-400 to-cyan-700",
    Icon: RefrigeratorIcon,
  },
  {
    price: "₹ 4,50,000",
    meta: "2017 - 62,000 km",
    title: "Maruti Suzuki Swift VXi - Well maintained",
    location: "Baner, Pune",
    date: "1 week ago",
    featured: true,
    gradient: "from-fuchsia-400 to-fuchsia-700",
    Icon: CarIcon,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <CategoryGrid />

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold text-[#002f34]">
          Fresh recommendations
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="rounded-md border-2 border-[#002f34] px-8 py-2.5 text-sm font-bold text-[#002f34] transition-colors hover:bg-[#002f34] hover:text-white">
            Load more
          </button>
        </div>
      </section>
    </div>
  );
}
