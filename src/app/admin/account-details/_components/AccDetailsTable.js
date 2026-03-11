"use client";
import { Input, Table, Tag } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Filter, Search } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { UserX } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { message } from "antd";
import ProfileModal from "@/components/SharedModals/ProfileModal";

export default function AccDetailsTable({ limit }) {
  const [searchText, setSearchText] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  // Dummy table Data (Updated with USER column based on image)
  const data = Array.from({ length: limit || 10 }).map((_, inx) => {
    return {
      key: inx + 1,
      name: "Moazzem Hossain",
      userImg: userImage,
      email: "justina@gmail.com",
      contact: "+1234567890",
      date: "11 oct 24, 11.10PM",
      status: "Active",
      strike: 0,
    };
  });
  // Block user handler
  const handleBlockUser = () => {
    message.success("User blocked successfully");
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "User Nickname",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.userImg}
            alt="User avatar"
            width={1200}
            height={1200}
            className="aspect-square h-auto w-10 rounded-full"
          />
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Strike",
      dataIndex: "strike",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <p
          className={
            value === "Active"
              ? "rounded-full border border-green-500 bg-gray-100 px-3 py-1 text-center text-green-500"
              : "text-red-500"
          }
        >
          {value}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => setProfileModalOpen(true)}>
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Block User">
            <CustomConfirm
              title="Block User"
              description="Are you sure to block this user?"
              onConfirm={handleBlockUser}
            >
              <button>
                <UserX color="#F16365" size={22} />
              </button>
            </CustomConfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <div className="mb-3 ml-auto w-1/3 gap-x-5">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !rounded-lg !border !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        style={{ overflowX: "auto", overflowY: "auto" }}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
      ></Table>

      <ProfileModal open={profileModalOpen} setOpen={setProfileModalOpen} />
    </ConfigProvider>
  );
}
