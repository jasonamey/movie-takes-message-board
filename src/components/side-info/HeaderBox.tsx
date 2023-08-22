import Image from "next/image";
import React from "react";
import useMobileMenu from "@/hooks/useMobileMenu";

export const HeaderBox = () => {
  const { onOpen, isOpen, onClose } = useMobileMenu();

  return (
    <div className="z-50 flex w-full flex-row items-center bg-mobile-header bg-cover bg-center bg-no-repeat p-5  sm:w-1/3 sm:rounded-md sm:bg-tablet-header sm:pb-3 sm:pt-20 md:w-full ">
      <div className="flex flex-auto flex-col">
        <h1 className="text-2xl font-bold tracking-wide text-white-100">
          Movie Takes!
        </h1>
        <h2 className="text-white-300 opacity-60">The Opinions Having Space</h2>
      </div>
      {isOpen ? (
        <Image
          src="/assets/shared/mobile/icon-close.svg"
          height={5}
          width={5}
          alt="close info boxes on mobile"
          className="block h-5 w-5 cursor-pointer sm:hidden"
          onClick={onClose}
        />
      ) : (
        <Image
          src="/assets/shared/mobile/icon-hamburger.svg"
          height={5}
          width={5}
          alt="open info boxes on mobile"
          className="block h-5 w-5 cursor-pointer sm:hidden"
          onClick={onOpen}
        />
      )}
    </div>
  );
};
