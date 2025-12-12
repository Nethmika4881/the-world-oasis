"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activefilter = searchParams?.get("capacity") || "all";

  const handleClick = (type) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("capacity", type);
    router.replace(`${pathname}?${params.toString()}`);
    console.log(params.toString());
  };

  return (
    <div className="flex border border-primary-800  justify-end gap-5">
      <Button type="all" activefilter={activefilter} handleClick={handleClick}>
        All
      </Button>
      <Button
        type="small"
        activefilter={activefilter}
        handleClick={handleClick}
      >
        1&mdash;3 guests
      </Button>
      <Button
        type="medium"
        activefilter={activefilter}
        handleClick={handleClick}
      >
        3&mdash;8 guests
      </Button>
      <Button
        type="large"
        activefilter={activefilter}
        handleClick={handleClick}
      >
        More than 8
      </Button>
    </div>
  );
}

const Button = function ({ type, activefilter, children, handleClick }) {
  return (
    <button
      className={`${
        type === activefilter ? "bg-accent-400" : ""
      }  cursor-pointer px-5 hover:bg-primary-700 py-2 text-white`}
      onClick={() => handleClick(type)}
    >
      {children}
    </button>
  );
};
export default Filter;
