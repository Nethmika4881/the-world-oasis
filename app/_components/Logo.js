"use client";

import Image from "next/image";

function Logo() {
  return (
    <a className="flex items-center gap-4 z-10">
      <Image
        height="60"
        quality={75}
        loading="eager"
        src="/logo.png"
        width="60"
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </a>
  );
}

export default Logo;
