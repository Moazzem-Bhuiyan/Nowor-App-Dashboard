"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { useGetPrivacyQuery, useUpdatePrivacyMutation } from "@/redux/api/legalApi";
import { Button } from "antd";
import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PrivacyPolicyContainer() {
  const router = useRouter();
  // get privacy-policy
  const { data,isLoading } = useGetPrivacyQuery();
  // update privacy-policy
  const [updatePrivacy,{isLoading:updatePrivacyLoading}] = useUpdatePrivacyMutation();
  const value = data?.data?.content || ""

  const handleSubmit = async (data) => {
    try {
    const res =  await updatePrivacy(data).unwrap();
    if (res?.success) {
      toast.success(res?.message || "Privacy policy updated successfully");
    }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }
  return (
    <section>
      <div className="">
        <h3 className="mb-6 flex items-center gap-5 text-2xl font-semibold">
          {" "}
          <span onClick={() => router.back()}>
            <ArrowLeft />{" "}
          </span>
          Privacy Policy
        </h3>
      </div>
      <FormWrapper onSubmit={handleSubmit}>
        <UTextEditor
          name="content"
          placeholder="Note: Enter details about your privacy policy here."
          value={value}
        />

        <Button
          type="primary"
          loading={isLoading || updatePrivacyLoading}
          htmlType="submit"
          size="large"
          icon={<Edit size={18} />}
          className="w-full rounded-xl !border !border-b-4 !border-black !bg-[#F5F1E6] !text-black"
        >
          Save Changes
        </Button>
      </FormWrapper>
    </section>
  );
}
