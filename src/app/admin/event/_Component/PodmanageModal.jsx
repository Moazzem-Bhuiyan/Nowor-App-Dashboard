"use client";

import { Modal, Button } from "antd";
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";
import userImage from "@/assets/images/user-avatar-lg.png";
import coffeeImage from "@/assets/event/orca.png";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";

export default function PodmanageModal({ open, setOpen, type }) {
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
      width={700}
    >
      <div>
        {/* Header */}
        <div className="relative flex items-center justify-between rounded-t-lg bg-[#D8CBB5] px-6 py-4">
          <h3 className="text-xl font-semibold text-[#4A3F35]">
            Coffee & Co-working Session
          </h3>
          <div
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white"
          >
            <RiCloseLargeLine size={16} />
          </div>
        </div>

        <div className="p-3">
          {/* Image */}
          <div className="relative h-48 w-full">
            <Image
              src={coffeeImage}
              alt="Coffee Session"
              fill
              className="rounded-lg object-contain"
            />
            <div className="roun absolute right-2 top-2 rounded-full bg-white px-3 py-1 text-xs font-medium shadow">
              Coffee & Social
            </div>
          </div>

          {/* Host Info */}
          <div className="mt-2 flex items-center gap-3 rounded-md border border-b border-gray-200 bg-white px-6 py-4">
            <Image
              src={userImage}
              alt="Host"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-gray-600">Hosted by</p>
              <p className="font-semibold text-gray-800">Moazzem Bhuiyan</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-2 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="font-semibold">Date:</span>
              <span>Friday, February 6, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="font-semibold">Time:</span>
              <span>02:00 PM - 06:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="font-semibold">Orcas:</span>
              <span>10/12</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-300">
                <div className="h-2 w-[83%] bg-green-500" /> {/* 10/12 ~ 83% */}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="font-semibold">Location:</span>
              <span>Central Park, North Woods</span>
            </div>
          </div>

          {/* Field Notes */}
          <div className="border-b border-gray-200 px-6 py-4">
            <p className="text-sm text-gray-700">
              Join us for a relaxed co-working session at one of the best coffee
              shops in the city! Perfect for remote workers, freelancers, or
              anyone looking to be productive in a social environment. Bring
              your laptop, grab a coffee, and let &nbsp; s get some work done
              together!
            </p>
            <p className="mt-2 text-xs text-gray-500">
              We &nbsp; ll have a dedicated table area. Feel free to chat during
              breaks or focus on your work - whatever works best for you! Great
              opportunity to meet other professionals and make new connections.
            </p>
          </div>

          {/* Join Orcas */}
          <div className="space-y-3 px-6 py-4">
            <p className="font-semibold text-gray-700">Join Orcas</p>
            <div className="space-y-2">
              {["Marvin McKinney", "Jane Cooper", "Cody Fisher"].map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded bg-white px-4 py-2 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={userImage}
                      alt={name}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <div className="text-sm text-gray-800">{name}</div>
                  </div>
                  {type === "event-manage" && (
                    <CustomConfirm
                      title="Remove"
                      description="Are you sure you want to remove this user?"
                    >
                      {" "}
                      <Button size="small" danger>
                        Remove
                      </Button>
                    </CustomConfirm>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
