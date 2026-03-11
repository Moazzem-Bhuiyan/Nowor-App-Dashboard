"use client";

import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import SidebarContainer from "@/components/shared/SidebarContainer/SidebarContainer";
import { useMediaQuery } from "@react-hook/media-query";
import { Layout } from "antd";
import { useEffect, useState } from "react";

const { Content } = Layout;

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const screenSizeLessThan1300 = useMediaQuery(
    "only screen and (max-width: 1300px)",
  );

  useEffect(() => {
    if (screenSizeLessThan1300) {
      setSidebarCollapsed(true);
    }
  }, [screenSizeLessThan1300]);

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <SidebarContainer
      // setCollapsed={setSidebarCollapsed}
      // collapsed={sidebarCollapsed}
      />

      <Layout>
        <HeaderContainer
        // collapsed={sidebarCollapsed}
        // setCollapsed={setSidebarCollapsed}
        />

        <Content
          style={{
            padding: "30px 40px",
            background: "#F5F1E6",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
