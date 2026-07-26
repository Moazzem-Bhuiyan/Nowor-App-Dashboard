"use client";

import { Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useMemo } from "react";
import { useGetEarningActivityQuery } from "@/redux/api/dashboardApi";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const EarningSummary = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Fetch earnings data
  const { data: earningData, isLoading } = useGetEarningActivityQuery({
    currentYear: selectedYear,
  });

  // Transform API data
  const chartData = useMemo(() => {
    const graph = earningData?.data?.graph || [];

    return monthNames.map((month, index) => {
      const monthObj = graph[index] || {};
      const value = Object.values(monthObj)[0] || 0;

      return {
        month,
        user: value,
      };
    });
  }, [earningData]);

  const handleChange = (value) => {
    setSelectedYear(Number(value));
  };

  // Generate dynamic year options (last 5 years)
  const yearOptions = useMemo(() => {
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      years.push({ value: i.toString(), label: i.toString() });
    }
    return years;
  }, [currentYear]);

  return (
    <div className="max-w-8xl mx-auto w-full rounded-lg bg-[#E7D9C2] p-6 shadow-lg">
      <div className="mb-10 flex items-center justify-between gap-2 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-xl font-bold">Subscription Earning</h1>

        <Select
          value={selectedYear.toString()}
          style={{ width: 120 }}
          onChange={handleChange}
          options={yearOptions}
        />
      </div>

      <ResponsiveContainer width="100%" height={375}>
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Loading earnings data...
          </div>
        ) : (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barSize={20}
          >
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="#000000" stopOpacity={1} />
                <stop offset="100%" stopColor="#E7D9C2" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              scale="point"
              padding={{ left: 10, right: 10 }}
              tickMargin={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickMargin={20}
            />

            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`]}
              contentStyle={{
                color: "#0B607E",
                fontWeight: "500",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <CartesianGrid
              opacity={0.2}
              horizontal={true}
              vertical={false}
              stroke="#080E0E"
              strokeDasharray="3 3"
            />

            <Bar
              barSize={35}
              radius={5}
              dataKey="user"
              fill="url(#colorGradient)"
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default EarningSummary;