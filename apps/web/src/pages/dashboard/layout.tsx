import Sidebar from "@/components/Layout/Dashboard/Sidebar";
import OnlyUser from "@/middlewares/OnlyUser";
import { IconButton } from "@devsozluk/ui";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <OnlyUser>
      <NextSeo title="Profil Ayarları" />
      <div className="px-28 mt-16">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Ayarlar</h2>
          <IconButton onClick={handleClose}>
            <RiCloseCircleFill size={24} />
          </IconButton>
        </div>
        <div className="flex mt-10 gap-x-20">
          <Sidebar />
          {children}
        </div>
      </div>
    </OnlyUser>
  );
}
