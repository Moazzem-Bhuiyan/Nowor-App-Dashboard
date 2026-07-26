"use client";
import { Input, Table, ConfigProvider, message, Tooltip } from "antd";
import { Search, Eye, UserX } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import userImage from "@/assets/images/user-avatar-lg.png";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import {
  useGetAllusersQuery,
  useBlockUnblockUserMutation,
} from "@/redux/api/userApi";
import toast from "react-hot-toast";

export default function AccDetailsTable({ limit: defaultLimit = 10 }) {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // API call with pagination + search
  const { data: usersData, isLoading } = useGetAllusersQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const [blockUser] = useBlockUnblockUserMutation();

  // Transform API data
  const data =
    usersData?.data?.map((user, index) => ({
      key: user.id,
      id: user.id,
      name: user.name || "N/A",
      email: user.email || "N/A",
      userImg: user.avatar ,
      contact: "N/A", 
      date: user.createdAt
        ? new Date(user.createdAt).toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A",
      status: user.accountStatus === "ACTIVE" ? "Active" : "Blocked",
      strike: 0, 
      accountStatus: user.accountStatus,
    })) || [];

  // Block / Unblock handler
  const handleBlockUnblock = async (user) => {
    try {
      const newStatus =
        user.accountStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";

      await blockUser({
        id: user.id,
        body: {
          accountStatus: newStatus,
        },
      }).unwrap();

      toast.success(
        `User ${newStatus === "BLOCKED" ? "blocked" : "unblocked"} successfully`
      );
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      render: (_, __, index) => `#${(page - 1) * limit + index + 1}`,
    },
  {
  title: "User Nickname",
  dataIndex: "name",
  render: (value, record) => (
    <div className="flex-center-start gap-x-2">
      {record.userImg && typeof record.userImg === "string" && record.userImg.startsWith("http") ? (
        
        <Image
          src={record.userImg}
          alt={value}
          width={40}
          height={40}
          className="aspect-square h-10 w-10 rounded-full object-cover"
        />
      ) : (
        
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B70A6] text-lg font-semibold text-white">
          {value?.charAt(0)?.toUpperCase() || "U"}
        </div>
      )}
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
              : "rounded-full border border-red-500 bg-gray-100 px-3 py-1 text-center text-red-500"
          }
        >
          {value}
        </p>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setSelectedUser(record);
                setProfileModalOpen(true);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip
            title={
              record.accountStatus === "ACTIVE" ? "Block User" : "Unblock User"
            }
          >
            <CustomConfirm
              title={
                record.accountStatus === "ACTIVE"
                  ? "Block User"
                  : "Unblock User"
              }
              description={`Are you sure to ${
                record.accountStatus === "ACTIVE" ? "block" : "unblock"
              } this user?`}
              onConfirm={() => handleBlockUnblock(record)}
            >
              <button>
                <UserX
                  color={
                    record.accountStatus === "ACTIVE" ? "#F16365" : "#22c55e"
                  }
                  size={22}
                />
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
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(1); // search করলে page 1 এ চলে যাবে
          }}
          allowClear
        />
      </div>

      <Table
        style={{ overflowX: "auto", overflowY: "auto" }}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        pagination={{
          current: page,
          pageSize: limit,
          total: usersData?.meta?.totalCount || 0,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} users`,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setLimit(newPageSize);
          },
        }}
      />

      <ProfileModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        user={selectedUser}
      />
    </ConfigProvider>
  );
}