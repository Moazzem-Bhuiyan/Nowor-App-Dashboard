"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { useGetlegalAboutQuery, useUpdatelegalAboutMutation } from "@/redux/api/legalApi";
import { Button } from "antd";
import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AboutUsContainer() {
  const router = useRouter();
  const { data, isLoading } = useGetlegalAboutQuery();
  const [updateAbout, { isLoading: updateAboutLoading }] = useUpdatelegalAboutMutation();
  const value = data?.data?.content || "";
  const handleSubmit = async (data) => {
    try {
      const res = await updateAbout(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || "About us updated successfully");
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
          About Us
        </h3>
      </div>

      <FormWrapper onSubmit={handleSubmit}>
        <UTextEditor
          value={value}
          name="content"
          placeholder="Note: Enter details about the website here. (e.g How and why did you come up with the idea? etc)"
        />

        <Button
          type="primary"
          size="large"
          loading={updateAboutLoading}
          htmlType="submit"
          className="w-full rounded-xl !border !border-b-4 !border-black !bg-[#F5F1E6] !text-black"
          icon={<Edit size={18} />}
        >
          Save Changes
        </Button>
      </FormWrapper>
    </section>
  );
}
