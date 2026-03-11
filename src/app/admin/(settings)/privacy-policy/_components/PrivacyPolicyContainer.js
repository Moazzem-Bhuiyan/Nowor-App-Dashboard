"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { Button } from "antd";
import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyContainer() {
  const router = useRouter();
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
      <FormWrapper>
        <UTextEditor
          name="privacyPolicy"
          placeholder="Note: Enter details about your privacy policy here."
        />

        <Button
          type="primary"
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
