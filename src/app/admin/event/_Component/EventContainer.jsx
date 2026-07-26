"use client";
import React, { useState } from "react";
import orcaIcon from "@/assets/event/orcaicon.png";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PodmanageModal from "./PodmanageModal";
import { useGetEventsQuery } from "@/redux/api/eventApi";

export default function EventContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: eventData, isLoading } = useGetEventsQuery({
    page,
    limit,
    searchTerm: searchText || undefined,
  });

  const events = eventData?.data || [];

  // Date format helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-2xl bg-[#D9CBB3] p-6">
      {/* Top Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#4A3F35]">All Event list</h2>
        <Input
          placeholder="Search event"
          prefix={<SearchOutlined />}
          className="!h-11 !w-60 !rounded-full !border !border-b-4 !border-black !bg-[#EDE7DD] !px-4 !font-medium"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(1);
          }}
          allowClear
        />
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Spin size="large" />
        </div>
      ) : events.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-lg text-[#4A3F35]">
          No events found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {events.map((item) => (
            <div
              key={item.id}
              className="w-68 rounded-xl bg-[#F3EEE4] p-5 shadow-sm transition hover:shadow-md"
            >
              {/* Top */}
              <div className="mb-6 items-center gap-3 space-y-2">
                {/* Event Type Thumbnail */}
                {item.eventType?.thumbnail ? (
                  <Image
                    src={item.eventType.thumbnail}
                    alt={item.eventType?.title || "event"}
                    width={400}
                    height={250}
                    className="h-40 w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center rounded-lg bg-[#D9CBB3] text-2xl font-bold text-[#4A3F35]">
                    {item.eventName?.charAt(0)?.toUpperCase() || "E"}
                  </div>
                )}

                <h4 className="text-lg font-bold text-[#4A3F35]">
                  {item.eventName || "N/A"}
                </h4>

                <p className="flex items-center gap-2 text-sm text-[#4A3F35]">
                  <Calendar size={18} />
                  {formatDate(item.startDate)}
                </p>

                <p className="flex items-center gap-2 text-sm text-[#4A3F35]">
                  <MapPin size={18} />
                  {item.lat && item.lng
                    ? `${item.lat.toFixed(4)}, ${item.lng.toFixed(4)}`
                    : "N/A"}
                </p>

                <p className="flex items-center gap-2 text-sm text-[#4A3F35]">
                  <Image
                    className="w-4 object-contain"
                    src={orcaIcon}
                    alt="participants"
                    width={16}
                    height={16}
                  />
                  {item.participantCount}/{item.maxParticipantsCount}
                </p>

                {/* Status Badge */}
                <p
                  className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
                    item.eventStatus === "UPCOMING"
                      ? "bg-blue-100 text-blue-700"
                      : item.eventStatus === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.eventStatus}
                </p>
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedEvent(item);
                    setIsModalOpen(true);
                    setType("event-manage");
                  }}
                  className="rounded-full border border-b-4 border-black bg-gray-100 px-4 py-1 text-sm font-medium text-black shadow-sm transition hover:bg-gray-200"
                >
                  Manage Pod
                </button>
                <button
                  onClick={() => {
                    setSelectedEvent(item);
                    setIsModalOpen(true);
                    setType("event-detail");
                  }}
                  className="flex-1 rounded-full border border-b-4 border-black px-4 py-1 text-sm font-medium text-black shadow-sm transition hover:bg-gray-100"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <PodmanageModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        type={type}
        event={selectedEvent}
      />
    </div>
  );
}