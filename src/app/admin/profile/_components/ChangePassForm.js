"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useChangeAdminPassMutation } from "@/redux/api/admin";
import { Button } from "antd";
import toast from "react-hot-toast";

export default function ChangePassForm() {
  // change pass api endpoint

  const [changePass, { isLoading }] = useChangeAdminPassMutation();

  const handleSubmit = async (data) => {
    try {
      const res = await changePass(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Password changed successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <section className="mt-5 px-10">
      {/* <h4></h4> */}
      <FormWrapper
        onSubmit={handleSubmit}
        // resolver={zodResolver(changePasswordSchema)}
      >
        <UInput
          name="currentPassword"
          label="Old Password"
          type="password"
          placeholder="***********"
        />
        <UInput
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="***********"
        />
        {/* <UInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="***********"
        /> */}

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
