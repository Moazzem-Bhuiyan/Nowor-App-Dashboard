"use client";
import { useGetuserActivityQuery } from "@/redux/api/dashboardApi";
import { DatePicker } from "antd";
import moment from "moment";
import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-full bg-black px-3 py-2 text-sm font-medium text-white">
        {Math.round(payload[0].value)} users
      </div>
    );
  }
  return null;
};

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function UserStatistics() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Fetch user activity
  const { data: userActivityData, isLoading } = useGetuserActivityQuery({
    currentYear,
  });

  // Transform API data into Recharts format
  const chartData = useMemo(() => {
    const graph = userActivityData?.data?.graph || [];
    console.log("🚀 ~ UserStatistics ~ graph:", graph)
    
    return monthNames.map((month, index) => {
      const monthKey = Object.keys(graph[index] || {})[0];
      const value = monthKey ? (graph[index])[monthKey] : 0;
   

      return {
        month,
        user: value || 0,
      };
    });
  }, [userActivityData]);

  const maxUsers = useMemo(() => {
    return Math.max(...chartData.map(d => d.user), 10);
  }, [chartData]);

  return (
    <div className="max-w-8xl mx-auto w-full rounded-lg bg-[#E7D9C2] p-6 shadow-lg">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Users statistic</h2>
        <div>
          <DatePicker
            value={moment(currentYear.toString(), "YYYY")}
            onChange={(date) => {
              if (date) {
                setCurrentYear(date.year());
              }
            }}
            picker="year"
            placeholder="Select Year"
            style={{ width: 120 }}
          />
        </div>
      </div>

      <div className="h-96 w-full">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Loading statistics...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 6"
                stroke="#0B607E"
                horizontal={false}
                vertical={true}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14, fill: "#000000" }}
                dy={10}
              />
              <YAxis
                domain={[0, Math.ceil(maxUsers * 1.1)]} // Dynamic scale
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14, fill: "#000000" }}
                dx={-10}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "transparent" }}
                position={{ y: -10 }}
              />
              <Line
                type="monotone"
                dataKey="user"
                stroke="#000000"
                strokeWidth={3}
                dot={{ fill: "black", strokeWidth: 0, r: 8 }}
                activeDot={{ r: 6, fill: "#ffffff", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}