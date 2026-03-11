"use client";
import RecentUserTable from "./RecentUserTable";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import EarningSummary from "./Earnings";
import RecentOrderTable from "./RecentOrderTable";
import UserStatistics from "./UserStatics";
import AccDetailsTable from "../../account-details/_components/AccDetailsTable";

// Dummy Data
const userStats = [
  {
    key: "users",
    title: "Total Users",
    count: 518,
  },
  {
    key: "premium_users",
    title: "Total Premium Users",
    count: 108,
  },
  {
    key: "event",
    title: "Total Event",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="58"
        height="58"
        fill="none"
        viewBox="0 0 58 58"
      >
        <mask
          id="mask0_86_2723"
          width="58"
          height="58"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path fill="#D9D9D9" d="M0 0h58v58H0z"></path>
        </mask>
        <g mask="url(#mask0_86_2723)">
          <path
            fill="#fff"
            d="M30.208 28.88a13.7 13.7 0 0 0 2.689-4.411q.936-2.478.936-5.136t-.936-5.135a13.7 13.7 0 0 0-2.689-4.41q3.625.483 6.042 3.201 2.417 2.72 2.417 6.344 0 3.626-2.417 6.344-2.416 2.72-6.042 3.202M43.5 48.332v-7.25a9.25 9.25 0 0 0-.967-4.138 12.4 12.4 0 0 0-2.537-3.474 26.4 26.4 0 0 1 5.71 2.81q2.627 1.72 2.627 4.802v7.25zm4.833-16.916v-4.834H43.5V21.75h4.833v-4.833h4.834v4.833H58v4.833h-4.833v4.834zm-29-2.417q-3.987 0-6.827-2.84t-2.84-6.827 2.84-6.827 6.827-2.84 6.827 2.84T29 19.333t-2.84 6.827T19.333 29M0 48.333v-6.766q0-2.055 1.057-3.776a7.05 7.05 0 0 1 2.81-2.628 36 36 0 0 1 7.612-2.81 33.3 33.3 0 0 1 7.854-.936q3.988 0 7.855.936a36 36 0 0 1 7.612 2.81 7.05 7.05 0 0 1 2.81 2.628 7.1 7.1 0 0 1 1.057 3.776v6.766z"
          ></path>
        </g>
      </svg>
    ),
    count: 118,
  },
  // {
  //   key: "service-providers",
  //   title: "Total Service Providers",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="58"
  //       height="58"
  //       fill="none"
  //       viewBox="0 0 58 58"
  //     >
  //       <mask
  //         id="mask0_92_3017"
  //         width="58"
  //         height="58"
  //         x="0"
  //         y="0"
  //         maskUnits="userSpaceOnUse"
  //         style={{ maskType: "alpha" }}
  //       >
  //         <path fill="#D9D9D9" d="M0 0h58v58H0z"></path>
  //       </mask>
  //       <g mask="url(#mask0_92_3017)">
  //         <path
  //           fill="#fff"
  //           d="M9.667 48.333V29h9.666v19.333zm14.5 0V9.667h9.666v38.666zm14.5 0V21.75h9.666v26.583z"
  //         ></path>
  //       </g>
  //     </svg>
  //   ),
  //   count: 218,
  // },
  {
    key: "earning",
    title: "Total Earning",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="58"
        height="58"
        fill="none"
        viewBox="0 0 58 58"
      >
        <mask
          id="mask0_92_3013"
          width="58"
          height="58"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path fill="#D9D9D9" d="M0 0h58v58H0z"></path>
        </mask>
        <g mask="url(#mask0_92_3013)">
          <path
            fill="#fff"
            d="M26.825 45.917h4.23v-3.021q3.02-.544 5.195-2.356 2.175-1.813 2.175-5.377a8.05 8.05 0 0 0-1.45-4.652q-1.45-2.115-5.8-3.686-3.625-1.208-5.015-2.114-1.39-.907-1.39-2.478 0-1.57 1.119-2.477 1.117-.906 3.232-.906 1.934 0 3.02.936a5.3 5.3 0 0 1 1.572 2.326l3.866-1.57q-.664-2.115-2.447-3.686t-3.957-1.752v-3.02h-4.23v3.02q-3.02.665-4.712 2.659t-1.691 4.47q0 2.84 1.661 4.592t5.226 3.02q3.807 1.39 5.287 2.478t1.48 2.84q0 1.993-1.42 2.93-1.42.936-3.414.936a5.48 5.48 0 0 1-3.534-1.238q-1.54-1.24-2.265-3.716l-3.988 1.57q.846 2.901 2.628 4.683t4.622 2.447zM29 53.167q-5.015 0-9.425-1.903t-7.673-5.166-5.166-7.673T4.833 29t1.903-9.425 5.166-7.673 7.673-5.165T29 4.833t9.425 1.904q4.41 1.902 7.673 5.165t5.166 7.673T53.167 29t-1.904 9.425q-1.902 4.41-5.165 7.673t-7.673 5.166T29 53.167"
          ></path>
        </g>
      </svg>
    ),
    count: 1500,
  },
];

export default function DashboardContainer() {
  return (
    <div className="space-y-20">
      {/* User Stats Section */}
      <section className="grid grid-cols-2 gap-5 md:grid-cols-3 2xl:grid-cols-3">
        {userStats?.map((stat) => (
          <div
            key={stat.key}
            className="gap-x-4 rounded-2xl bg-[#E7D9C2] p-5 text-black shadow-sm"
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-dmSans text-lg font-medium">{stat.title}</p>
                <h5 className="mt-0.5 text-3xl font-semibold text-black">
                  {stat.key !== "earning" ? (
                    <CustomCountUp end={stat.count} />
                  ) : (
                    <span>
                      $<CustomCountUp end={stat.count} />
                    </span>
                  )}
                </h5>
              </div>
            </div>

            {/* <div className="flex items-center gap-5">
              <h1 className=" text-[#4BB54B] text-xl font-bold flex items-center gap-2 bg-[#4BB54B1A] p-1 mt-2 rounded-lg">
                <span><PiArrowsOutSimple /></span>
                <span>4%</span>
              </h1>
              <h1 className=" text-xl">From the last month</h1>
            </div> */}
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="flex-center-between flex-col gap-10 xl:flex-row">
        <UserStatistics />
        <EarningSummary />
      </section>

      {/* Recent Users Table */}
      <section>
        <h1 className="text-xl font-semibold">Recent Users</h1>
        <p className="mb-5 text-sm text-gray-500">
          Here are the latest users who joined the platform.
        </p>
        <AccDetailsTable limit={5} />
      </section>
    </div>
  );
}
