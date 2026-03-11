"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  Star,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/logos/Logo.png";
import Image from "next/image";
import { GiDolphin } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
export default function Sidebar({ collapsed }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/account-details", icon: Users, label: "User" },
    { href: "/admin/interest", icon: Star, label: "Interest" },
    { href: "/admin/event", icon: Calendar, label: "Events" },
    { href: "/admin/events-orca", icon: GiDolphin, label: "Events Orca" },
    {
      href: "/admin/manage-subscription",
      icon: IoDiamond,
      label: "Subscription",
    },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-72"
      } flex flex-col bg-[#E7D9C2] transition-all duration-300`}
    >
      <div className="fixed w-72">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 p-4">
          <div className="flex items-center justify-center">
            <Image src={logo} alt="Logo" className="object-contain" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4 px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`xtransition-colors flex items-center gap-4 rounded-lg px-4 py-3 ${
                  active
                    ? "border border-b-4 border-black !bg-[#F5F1E6] text-black"
                    : "text-black hover:bg-[#F5F1E6]"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : ""}
              >
                <Icon size={20} />
                {!collapsed && (
                  <span className="comic-font text-lg font-medium">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-black p-3">
          <button
            onClick={() => router.push("/login")}
            className={`flex !h-14 w-full items-center gap-3 rounded-lg border border-b-4 border-black !bg-[#F5F1E6] px-4 py-2.5 text-sm font-medium text-black hover:bg-amber-200 ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "Log Out" : ""}
          >
            <LogOut size={18} />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
