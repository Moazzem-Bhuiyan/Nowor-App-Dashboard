"use client";
import React, { useState } from "react";
import orcaImage from "@/assets/event/orca.png";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import Image from "next/image";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import AddorcaModal from "./AddorcaModal";

export default function Orcacontainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const data = Array.from({ length: 6 }).map((_, inx) => ({
    key: inx + 1,
    img: orcaImage,
  }));
  return (
    <div className="rounded-2xl bg-[#D9CBB3] p-6">
      {/* Top Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#4A3F35]">All Orca list</h2>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={<PlusOutlined />}
            className="!h-11 !rounded-full border !border-b-4 !border-black !bg-[#EDE7DD] !px-4 !font-medium"
          >
            Add Orca
          </Button>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.key}
            className="!w-74 rounded-xl bg-[#F3EEE4] p-5 shadow-sm transition hover:shadow-md"
          >
            {/* Top */}
            <div className="relative mb-6 flex items-center gap-3">
              <Image
                src={item.img}
                alt="icon"
                className="w-full object-cover"
              />
              <div className="roun absolute right-2 top-2 rounded-full border border-[#4A3F35] !bg-[#EDE7DD] px-3 py-1 text-xs font-medium shadow">
                Coffee & Social
              </div>
            </div>

            {/* Bottom */}
            <div className="">
              <CustomConfirm
                title="Delete"
                content="Are you sure to delte this orca?"
                description="Are you sure to delte this orca?"
                // onConfirm={handleBlockUser}
              >
                {" "}
                <button className="h-9 !w-full rounded-lg !border !border-b-4 !border-black !bg-[#F5F1E6] text-sm font-medium text-red-500 shadow-sm transition hover:bg-gray-100">
                  Delete
                </button>
              </CustomConfirm>
            </div>
          </div>
        ))}
      </div>
      <AddorcaModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
}
