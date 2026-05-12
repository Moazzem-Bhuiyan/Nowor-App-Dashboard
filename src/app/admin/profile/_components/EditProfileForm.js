"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useUpdateAdminInfoMutation } from "@/redux/api/admin";
import { Button } from "antd";
import toast from "react-hot-toast";

export default function EditProfileForm({ data }) {
  // edit profile form submit handler
  const [updateData, { isLoading }] = useUpdateAdminInfoMutation();
  const handleSubmit = async (data) => {
    try {
      const res = await updateData(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <section className="mt-5 px-10">
      {/* <h4></h4> */}
      <FormWrapper
        onSubmit={handleSubmit}
        defaultValues={{
          name: data?.data?.name || "",
          email: data?.data?.email || "",
        }}
      >
        <UInput name="name" label="Name" type="text" />
        <UInput name="email" label="Email" type="email" disabled />

        <Button
          htmlType="submit"
          className="w-full rounded-xl !border !border-b-4 !border-black !bg-[#F5F1E6] !text-black"
          size="large"
          type="primary"
          loading={isLoading}
        >
          Save
        </Button>
      </FormWrapper>
    </section>
  );
}
