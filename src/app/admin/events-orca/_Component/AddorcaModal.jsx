"use client";

import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UUpload from "@/components/Form/UUpload";

export default function AddorcaModal({ open, setOpen }) {
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
        <h3 className="text-xl font-semibold text-[#4A3F35]">Add Orca</h3>

        <div
          onClick={() => setOpen(false)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white"
        >
          <RiCloseLargeLine size={16} />
        </div>
      </div>
      <div className="p-5">
        <FormWrapper>
          <UInput name="name" label="Orca Name" placeholder="Enter orca name" />
          <UUpload name="image" label="Orca Icon" max={1} />
          {/* Footer Buttons */}
          <div className="flex justify-between gap-4 px-1 pb-8">
            <button
              onClick={() => setOpen(false)}
              className="w-full rounded-full border border-b-4 border-black py-3 font-medium text-[#4A3F35] shadow-md transition hover:bg-gray-200"
            >
              Cancel
            </button>

            <button className="w-full rounded-full border border-b-4 border-black bg-[#D8CBB5] py-3 font-medium text-[#2b251f] shadow-md transition hover:opacity-90">
              submit
            </button>
          </div>
        </FormWrapper>
      </div>
    </Modal>
  );
}
