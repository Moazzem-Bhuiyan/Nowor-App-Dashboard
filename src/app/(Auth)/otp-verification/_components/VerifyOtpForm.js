"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UOtpInput from "@/components/Form/UOtpInput";
import { otpSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logos/Logo.png";
import { useRouter } from "next/navigation";

export default function VerifyOtpForm() {
  const router = useRouter();
  const onSubmit = (data) => {
    console.log(data);
    router.push("/set-new-password");
  };

  return (
    <div className="w-full rounded-md px-6 py-8">
      <Link
        href="/login"
        className="flex-center-start mb-4 gap-x-2 font-medium text-black hover:text-primary-blue/85"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 flex flex-col items-center justify-center space-y-2">
        <Image src={logo} alt="logo" width={100} height={100} />
        <h4 className="text-3xl font-semibold text-black">Verify OTP</h4>
        <p className="text-center text-black">
          Enter the otp that we&apos;ve sent to your email
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(otpSchema)}>
        <UOtpInput name="otp" />

        <Button
          type="primary"
          size="large"
          className="!h-10 w-full !rounded-full !border !border-b-4 !border-black !bg-[#FFFFFF] !font-semibold !text-black"
          htmlType="submit"
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
