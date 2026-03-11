"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import { Button } from "antd";
import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsConditionsContainer() {
  const router = useRouter();
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
      <FormWrapper>
        <UTextEditor
          name="privacyPolicy"
          placeholder="Note: Enter details about your terms and conditions here."
        />

        <Button
          type="primary"
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
