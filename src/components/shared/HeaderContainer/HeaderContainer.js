"use client";

import { Button } from "antd";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout } from "antd";
import { AlignJustify } from "lucide-react";
import { useGetAdminQuery } from "@/redux/api/admin";
const { Header } = Layout;
import noUser from "@/assets/images/nouser.png";

export default function HeaderContainer({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const navbarTitle = pathname.split("/admin")[1];
  // get admin profile info
  const { data: profileData, refetch } = useGetAdminQuery();
  return (
    <Header
      style={{
        backgroundColor: "#E7D9C2",
        height: "80px",
        paddingInline: 0,
        paddingRight: "40px",
        zIndex: 100,
      }}
    >
      <div className="flex-center-between !z-1000 fixed h-20 !w-[85%] items-center justify-center bg-[#E7D9C2] pr-10">
        {/* Collapse Icon */}
        <div className="flex items-center gap-x-2">
          <Button
            type="text"
            icon={<AlignJustify strokeWidth={3} size={25} />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <h1 className="-mt-3 font-dmSans text-xl font-semibold capitalize">
            {navbarTitle.length > 1
              ? navbarTitle.replaceAll("/", " ").replaceAll("-", " ")
              : "dashboard"}
          </h1>
        </div>

        {/* Right --- notification, user profile */}
        <div className="flex items-center gap-x-6">
          {/* <button>
          <Search color="#1C1B1F" size={22} strokeWidth={2.5} />
        </button> */}

          <Link href="/admin/notification" className="relative !leading-none">
            {/* Notification dot indicator */}
            <div className="absolute -right-1 -top-1.5 size-3 rounded-full bg-[#000000]" />

            <Bell fill="#1C1B1F" stroke="#1C1B1F" size={22} />
          </Link>

          {/* User */}
          <Link
            href={"/admin/profile"}
            className="group flex items-center gap-x-2 text-black hover:text-primary-blue"
          >
            <Image
              src={profileData?.data?.avatar || noUser}
              alt="Admin avatar"
              width={52}
              height={52}
              className="rounded-full aspect-square border-2 border-black p-0.5 transition group-hover:border"
            />
            <h4 className="text-lg font-semibold">
              {" "}
              {profileData?.data?.name}{" "}
            </h4>
          </Link>
        </div>
      </div>
    </Header>
  );
}
