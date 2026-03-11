import { ConfigProvider } from "antd";
import orca from "@/assets/logos/authlogo.png";
import Image from "next/image";

export default function loading() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1b71a7",
        },
      }}
    >
      <div className="flex-center h-[75vh]">
        <Image
          src={orca}
          alt="Nowor"
          width={1000}
          height={1000}
          className="float-animation orca-animation w-64 md:w-80"
        />
      </div>
    </ConfigProvider>
  );
}
