import Reservation from "@/app/_components/Reservation";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";
import Loader from "../loading";
import Cabin from "@/app/_components/Cabin";

// PLACEHOLDER DATA
// const cabin = {
//   id: 89,
//   name: "001",
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
//   image:
//     "https://wqsxtxaoogwgsvddefmb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
// };

// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}
// export const experimental_ppr = true;
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}
export default async function Page({ params }) {
  const { cabinId } = await params;
  console.log(params);
  const cabin = await getCabin(cabinId);
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin
        name={name}
        maxCapacity={maxCapacity}
        regularPrice={regularPrice}
        discount={discount}
        image={image}
        description={description}
      />
      <div>
        <h2 className="text-5xl mb-10 text-accent-400 font-semibold text-center">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Loader />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
