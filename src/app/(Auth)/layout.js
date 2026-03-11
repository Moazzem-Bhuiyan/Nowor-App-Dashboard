import React from "react";
import backgroundImage from "@/assets/event/authsidebg.png";
import orca from "@/assets/logos/authlogo.png";
import map from "@/assets/event/map.png";
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-[calc(100vh-0px)] flex-col rounded-lg bg-[#F5F1E6] p-10 md:flex-row">
      {/* Left side - Background Image (full height, covers properly) */}
      <div
        className="relative hidden min-h-[calc(100vh-104px)] rounded-3xl bg-cover bg-center bg-no-repeat md:block md:w-3/5 lg:w-2/4"
        style={{ backgroundImage: `url(${backgroundImage?.src})` }}
      >
        {/* Whale + Nowor + connecting world elements - centered */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          {/* Nowor text (cute + big) */}
          <div className="w-full overflow-hidden">
            <h1 className="text-5xl font-extrabold text-black drop-shadow-2xl">
              Nowor
            </h1>
          </div>

          <div className="mb-8 text-[10rem] leading-none drop-shadow-2xl md:text-[14rem] lg:text-[18rem]">
            <Image
              src={orca}
              alt="Nowor"
              width={1000}
              height={1000}
              className="float-animation orca-animation w-64 md:w-80"
            />
          </div>

          <p className="max-w-lg text-xl font-light text-white/90 drop-shadow-lg md:text-2xl lg:text-3xl">
            <Image src={map} alt="Nowor" width={10000} height={10000} />
          </p>
        </div>
      </div>

      {/* Right side - Form area (light beige background) */}
      <div className="flex flex-1 items-center justify-center bg-[#F5F1E6] px-6 py-12 md:p-0">
        <div className="w-full max-w-md space-y-8 lg:max-w-lg">{children}</div>
      </div>
    </div>
  );
}
