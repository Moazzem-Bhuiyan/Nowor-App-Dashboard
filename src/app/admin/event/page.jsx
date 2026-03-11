import React from "react";
import EventContainer from "./_Component/EventContainer";

export const metadata = {
  title: "Event - Admin",
  description: "Event page for Admin",
};

export default function page() {
  return (
    <div>
      <EventContainer />
    </div>
  );
}
