
import Navbar from "@/components/Shared/Navbar";
import Sidebar from "@/components/Shared/Sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div className="h-screen w-screen bg-white max-w-[1440px] overflow-hidden">
          <Navbar />
          <div className="w-full flex bg-white">
            <Sidebar />
            <div className="bg-[#F8FAFB] h-full w-full px-5 py-6 mt-[90px] overflow-y-scroll" style={{ height: "calc(100vh - 90px)"}}>
              {children}
            </div>
          </div>
        </div>
     
  );
}
