"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SettingsPage = () => {
  const router = useRouter();

  const settingsLinks = [
    { title: "About Us", icon: "📄", path: "/admin/about-us" },
    {
      title: "Terms & Conditions",
      icon: "⚖️",
      path: "/admin/terms-conditions",
    },
    { title: "Privacy Policy", icon: "🔒", path: "/admin/privacy-policy" },
  ];

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-b from-[#D9CBB3] to-[#E7D9C2] p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
      </header>

      <div className="space-y-4">
        {settingsLinks.map((link, index) => (
          <div
            key={index}
            onClick={() => router.push(link.path)}
            className="flex transform cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow-md hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{link.icon}</span>
              <span className="font-medium text-gray-800">{link.title}</span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </div>
        ))}
      </div>

      {/* Optional: Logout Button */}
    </div>
  );
};

export default SettingsPage;
