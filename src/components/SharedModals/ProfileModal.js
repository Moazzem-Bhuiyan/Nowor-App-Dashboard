"use client";

import { Modal } from "antd";
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Star } from "lucide-react";

export default function ProfileModal({ open, setOpen }) {
  return (
    <Modal
      open={open}
      footer={null}
      centered
      closeIcon={false}
      onCancel={() => setOpen(false)}
      styles={{
        content: {
          padding: 0,
          borderRadius: 20,
          overflow: "hidden",
          background: "#F4EFE6",
        },
      }}
    >
      {/* Header */}
      <div className="relative flex items-center justify-between bg-[#D8CBB5] px-6 py-4">
        <h3 className="text-xl font-semibold text-[#4A3F35]">User Review</h3>

        <div
          onClick={() => setOpen(false)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white"
        >
          <RiCloseLargeLine size={16} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center px-10 py-6">
        <Image
          src={userImage}
          alt="profile"
          width={150}
          height={150}
          className="rounded-full border-4 border-gray-400 object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="space-y-5 px-10 pb-8 text-[#4A3F35]">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Full Name :</span>
          <span>Shahid Hasan Shimul</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Email Address :</span>
          <span>shahidhasn@gmail.com</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Contact :</span>
          <span>+880 12564-5464</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Strike :</span>
          <span>0</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Review :</span>
          <span className="flex items-center gap-1">
            4<Star size={18} fill="yellow" />
          </span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Location :</span>
          <span>Mohakhali, Dhaka</span>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between gap-4 px-10 pb-8">
        <button
          onClick={() => setOpen(false)}
          className="w-full rounded-full border border-b-4 border-black py-3 font-medium text-[#4A3F35] shadow-md transition hover:bg-gray-200"
        >
          Cancel
        </button>

        <button className="w-full rounded-full border border-b-4 border-black bg-[#D8CBB5] py-3 font-medium text-[#4A3F35] shadow-md transition hover:opacity-90">
          Block
        </button>
      </div>
    </Modal>
  );
}
