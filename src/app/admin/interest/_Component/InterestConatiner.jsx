"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import categoryImg from "@/assets/event/coffee.png";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import AddinterestModal from "./AddinterestModal";
import EditinterestModal from "./EditinterestModal";

export default function InterestConatiner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const data = Array.from({ length: 12 }).map((_, inx) => ({
    key: inx + 1,
    name: "Coffee & Social",
    img: categoryImg,
  }));

  return (
    <div className="rounded-2xl bg-[#D9CBB3] p-6">
      {/* Top Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#4A3F35]">
          All Interest list
        </h2>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search interest"
            prefix={<SearchOutlined />}
            className="!h-11 !w-56 !rounded-full !border !border-b-4 !border-black !bg-[#EDE7DD] !px-4 !font-medium"
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={<PlusOutlined />}
            className="!h-11 !rounded-full border !border-b-4 !border-black !bg-[#EDE7DD] !px-4 !font-medium"
          >
            Add Interest
          </Button>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.key}
            className="rounded-xl bg-[#F3EEE4] p-5 shadow-sm transition hover:shadow-md"
          >
            {/* Top */}
            <div className="mb-6 flex items-center gap-3">
              <Image
                src={item.img}
                alt="icon"
                width={24}
                height={24}
                className="object-contain"
              />
              <h4 className="font-medium text-[#4A3F35]">{item.name}</h4>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between">
              <CustomConfirm
                title="Delete"
                content="Are you sure to delte this interest?"
                description="Are you sure to delte this interest?"
                // onConfirm={handleBlockUser}
              >
                {" "}
                <button className="text-sm font-medium text-red-500 hover:underline">
                  Delete
                </button>
              </CustomConfirm>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="rounded-full border border-b-4 border-black px-6 py-1 text-sm font-medium text-green-600 shadow-sm transition hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddinterestModal open={isModalOpen} setOpen={setIsModalOpen} />
      <EditinterestModal open={isEditModalOpen} setOpen={setIsEditModalOpen} />
    </div>
  );
}
