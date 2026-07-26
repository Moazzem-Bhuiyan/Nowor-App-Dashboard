'use client';
import { Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UUpload from "@/components/Form/UUpload";
import { useAddInterestMutation } from "@/redux/api/interestApi";
import toast from "react-hot-toast";

export default function AddInterestModal({ open, setOpen }) {
  const [addInterest, { isLoading }] = useAddInterestMutation();

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Interest Name
      formData.append("interestName", data.interestName);

      // Interest Icon (File)
      if (data.interestIcon && data.interestIcon.length > 0) {
        const file = data.interestIcon[0].originFileObj || data.interestIcon[0];
        if (file) {
          formData.append("interestIcon", file);
        }
      }

      // Important: Send as FormData
      const response = await addInterest(formData).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Interest added successfully!");
        setOpen(false);
      }
    } catch (error) {
      console.error("Add Interest Error:", error);
      toast.error(error?.data?.message || "Failed to add interest. Please try again.");
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
        <h3 className="text-xl font-semibold text-[#4A3F35]">Add New Interest</h3>
        <div
          onClick={() => setOpen(false)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          <RiCloseLargeLine size={18} />
        </div>
      </div>

      <div className="p-8">
        <FormWrapper onSubmit={handleSubmit}>
          <UInput
            name="interestName"
            type="text"
            label="Interest Name"
            placeholder="e.g. Food & Drinks"
            required
            className="!h-11 !rounded-full border border-black px-4 py-3 text-[#4A3F35]"
          />

          <UUpload 
            name="interestIcon" 
            label="Interest Icon" 
            max={1}
            accept="image/*"
            listType="picture-card"
          />

          <div className="flex justify-between gap-4 pt-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full rounded-full border border-b-4 border-black py-3.5 font-medium text-[#4A3F35] hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full border border-b-4 border-black bg-[#D8CBB5] py-3.5 font-medium text-[#2b251f] hover:brightness-105 transition disabled:opacity-70"
            >
              {isLoading ? "Creating..." : "Create Interest"}
            </button>
          </div>
        </FormWrapper>
      </div>
    </Modal>
  );
}