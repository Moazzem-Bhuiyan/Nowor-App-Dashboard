"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UTextArea from "@/components/Form/UTextArea";
import { Button, Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema } from "@/schema/subscriptionSchema";
import USelect from "@/components/Form/USelect";
import { RiCloseLargeLine } from "react-icons/ri";

export default function EditSubscriptionPlanModal({ open, setOpen }) {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      closeIcon={false}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      styles={{
        content: {
          padding: 0,
          borderRadius: 20,
          overflow: "hidden",
          background: "#F4EFE6",
        },
      }}
    >
      <div className="">
        {/* Header */}
        <div className="relative flex items-center justify-between bg-[#D8CBB5] px-6 py-4">
          <h3 className="text-xl font-semibold text-[#4A3F35]">
            Edit Subscription
          </h3>

          <div
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white"
          >
            <RiCloseLargeLine size={16} />
          </div>
        </div>
        <div className="p-5">
          <FormWrapper
            onSubmit={onSubmit}
            resolver={zodResolver(createSubscriptionSchema)}
          >
            <UInput
              name="name"
              label=" Subscription Name"
              placeholder="Enter subscription plan name"
            />
            <UInput
              type="number"
              name="price"
              label="Price"
              placeholder="Enter price"
            />

            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="w-full !border !border-b-4 !border-black !bg-[#F5F1E6] !text-black hover:!bg-[#F5F1E6] hover:!text-black"
            >
              Save
            </Button>
          </FormWrapper>
        </div>
      </div>
    </Modal>
  );
}
