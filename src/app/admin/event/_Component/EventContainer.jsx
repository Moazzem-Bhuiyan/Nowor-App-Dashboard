"use client";
import React, { useState } from "react";
import orcaImage from "@/assets/event/orca.png";
import orcaIcon from "@/assets/event/orcaicon.png";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PodmanageModal from "./PodmanageModal";

export default function EventContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");
  const data = Array.from({ length: 12 }).map((_, inx) => ({
    key: inx + 1,
    name: "Coffee & Social",
    date: "11 oct 24, 11:10 PM",
    location: "Los Angeles, CA",
    categories: "Sports",
    orcaCount: "7",
    orcaLimit: "12",
    img: orcaImage,
  }));
  return (
    <div className="rounded-2xl bg-[#D9CBB3] p-6">
      {/* Top Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#4A3F35]">All Event list</h2>
        <Input
          placeholder="Search event"
          prefix={<SearchOutlined />}
          className="!h-11 !w-60 !rounded-full !border !border-b-4 !border-black !bg-[#EDE7DD] !px-4 !font-medium"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {data.map((item) => (
          <div
            key={item.key}
            className="w-68 rounded-xl bg-[#F3EEE4] p-5 shadow-sm transition hover:shadow-md"
          >
            {/* Top */}
            <div className="mb-6 items-center gap-3 space-y-2">
              <Image
                src={item.img}
                alt="icon"
                width={2400}
                height={2400}
                className="w-full object-cover"
              />
              <h4 className="text-lg font-bold text-[#4A3F35]">{item.name}</h4>

              <p className="flex gap-5 text-sm text-[#4A3F35]">
                {" "}
                <Calendar size={20} /> {item.date}
              </p>
              <p className="flex gap-5 text-sm text-[#4A3F35]">
                <MapPin size={20} /> {item.location}
              </p>
              <p className="flex gap-5 text-sm text-[#4A3F35]">
                <Image
                  className="w-4 !object-contain"
                  src={orcaIcon}
                  alt="icon"
                  width={2400}
                  height={2400}
                />{" "}
                {item.orcaCount}/{item.orcaLimit}
              </p>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setType("event-manage");
                }}
                className="rounded-full border border-b-4 border-black bg-gray-100 px-6 py-1 text-sm font-medium text-black shadow-sm transition hover:bg-gray-200"
              >
                Manage Pod
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setType("event-detail");
                }}
                className="text-blackshadow-sm flex-1 rounded-full border border-b-4 border-black px-6 py-1 text-sm font-medium transition hover:bg-gray-100"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <PodmanageModal open={isModalOpen} setOpen={setIsModalOpen} type={type} />
    </div>
  );
}
