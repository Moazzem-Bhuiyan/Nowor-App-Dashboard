"use client";

import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UUpload from "@/components/Form/UUpload";
import { useAddInterestMutation } from "@/redux/api/interestApi";
import toast from "react-hot-toast";

export default function AddinterestModal({ open, setOpen }) {
  // add interest api handler
  const [addInterest, { isLoading }] = useAddInterestMutation();
  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("interestName", data.interestName);
      if (data.interestIcon && data.interestIcon.length > 0) {
        formData.append("interestIcon", data.interestIcon[0].originFileObj);
      }
      const response = await addInterest(formData).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Interest added successfully");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to add interest");
    }
  };
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
        <h3 className="text-xl font-semibold text-[#4A3F35]">Add Interest</h3>

        <div
          onClick={() => setOpen(false)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white"
        >
          <RiCloseLargeLine size={16} />
        </div>
      </div>
      <div className="p-5">
        <FormWrapper onSubmit={handleSubmit}>
          <UInput
            name="interestName"
            type="text"
            label="Interest"
            placeholder="Enter interest"
            required={true}
            className="!h-11 !rounded-full border !border-black px-4 py-3 text-[#4A3F35] shadow-md"
          />
          <UUpload name="interestIcon" label="Interest Icon" max={1} />
          {/* Footer Buttons */}
          <div className="flex justify-between gap-4 px-1 pb-8">
            <button
              onClick={() => setOpen(false)}
              className="w-full rounded-full border border-b-4 border-black py-3 font-medium text-[#4A3F35] shadow-md transition hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full rounded-full border border-b-4 border-black bg-[#D8CBB5] py-3 font-medium text-[#2b251f] shadow-md transition hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "submit"}
            </button>
          </div>
        </FormWrapper>
      </div>
    </Modal>
  );
}
