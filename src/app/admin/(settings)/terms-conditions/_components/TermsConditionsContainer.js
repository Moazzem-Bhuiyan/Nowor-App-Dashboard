"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { useGetTermsQuery, useUpdateTermsMutation } from "@/redux/api/legalApi";
import { Button } from "antd";
import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TermsConditionsContainer() {
  const router = useRouter();
  const { data, isLoading } = useGetTermsQuery();
  const [updateTerms, { isLoading: updateTermsLoading }] = useUpdateTermsMutation();
   const value = data?.data?.content || ""

  const handleSubmit = async (data) => {
    try {
      const res = await updateTerms(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Terms and conditions updated successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <section>
      <div className="">
        <h3 className="mb-6 flex items-center gap-5 text-2xl font-semibold">
          {" "}
          <span onClick={() => router.back()}>
            <ArrowLeft />{" "}
          </span>
          Terms and Conditions
        </h3>
      </div>
      <FormWrapper onSubmit={handleSubmit}>
        <UTextEditor
          value={value}
          name="content"
          placeholder="Note: Enter details about your terms and conditions here."
        />

        <Button
          type="primary"
          loading={updateTermsLoading}
          htmlType="submit"
          size="large"
          className="w-full rounded-xl !border !border-b-4 !border-black !bg-[#F5F1E6] !text-black"
          icon={<Edit size={18} />}
        >
          Save Changes
        </Button>
      </FormWrapper>
    </section>
  );
}
