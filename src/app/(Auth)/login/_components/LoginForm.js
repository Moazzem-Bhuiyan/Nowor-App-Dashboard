"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import logo from "@/assets/logos/Logo.png";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();

  const onLoginSubmit = (data) => {
    console.log(data);

    router.push("/admin/dashboard");
  };

  return (
    <div className="w-full rounded-md px-6 py-8 shadow-none">
      <section className="mb-8 flex flex-col items-center justify-center space-y-2">
        <Image src={logo} alt="logo" width={100} height={100} />
        <h4 className="text-3xl font-semibold text-black">Welcome to Nowor!</h4>
        <p className="text-center text-black">Sign in to your account</p>
      </section>

      <FormWrapper onSubmit={onLoginSubmit} resolver={zodResolver(loginSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10 !rounded-full"
          labelStyles={{ fontWeight: "500", color: "white" }}
        />

        <UInput
          name="password"
          label="Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10 !rounded-full"
          labelStyles={{ fontWeight: "500", color: "white" }}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !rounded-full !border !border-b-4 !border-black !bg-[#FFFFFF] !font-semibold !text-black"
        >
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="mt-2 block text-center font-medium text-black hover:text-primary-blue/85"
        >
          I forgot my password
        </Link>
      </FormWrapper>
    </div>
  );
}
