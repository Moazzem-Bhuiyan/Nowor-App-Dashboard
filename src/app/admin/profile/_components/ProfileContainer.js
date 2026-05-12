"use client";

import Image from "next/image";
import adminImg from "@/assets/images/user-avatar-lg.png";
import { ImagePlus } from "lucide-react";

import { Tabs, ConfigProvider } from "antd";
import { useRef } from "react";
import toast from "react-hot-toast";

import ChangePassForm from "./ChangePassForm";
import EditProfileForm from "./EditProfileForm";

import {
  useGetAdminQuery,
  useUploadAdminImageMutation,
} from "@/redux/api/admin";

const { TabPane } = Tabs;

export default function ProfileContainer() {
  // get admin profile info
  const { data: profileData, refetch } = useGetAdminQuery();

  // upload profile picture handler
  const [uploadImage, { isLoading }] = useUploadAdminImageMutation();

  const fileInputRef = useRef(null);

  // upload image handler
  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("avatar", file);

      const res = await uploadImage(formData).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Profile image updated");
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to upload profile image");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1b71a7",
        },
      }}
    >
      <div className="mx-auto w-full px-5 lg:w-3/4 lg:px-0 2xl:w-1/2">
        {/* Profile pic */}
        <section className="flex-center gap-x-3">
          <div className="relative w-max">
            <Image
              src={profileData?.data?.avatar || adminImg}
              alt="Admin avatar"
              width={1200}
              height={1200}
              className="aspect-square h-auto w-[160px] rounded-full border-2 border-black object-cover p-1"
            />

            {/* hidden input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Edit button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
              className="flex-center absolute bottom-2 right-2 aspect-square rounded-full bg-[#2C50ED] p-2 text-white/95 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <ImagePlus size={20} />
            </button>
          </div>

          <div>
            <h3 className="text-3xl font-semibold">
              {profileData?.data?.name}
            </h3>

            <p className="mt-1 text-lg font-medium text-primary-blue">
              Administrator
            </p>
          </div>
        </section>

        {/* Profile Information Forms */}
        <section className="my-16">
          <Tabs defaultActiveKey="editProfile" centered>
            <TabPane tab="Edit Profile" key="editProfile">
              <EditProfileForm data={profileData} />
            </TabPane>

            <TabPane tab="Change Password" key="changePassword">
              <ChangePassForm />
            </TabPane>
          </Tabs>
        </section>
      </div>
    </ConfigProvider>
  );
}
