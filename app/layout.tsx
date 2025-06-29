import type { Metadata } from "next";
import "./globals.css";
import { AppConfig } from "@/config/app.config";
import { Urbanist } from 'next/font/google';
import Navbar from "@/components/Shared/Navbar";
import Sidebar from "@/components/Shared/Sidebar";

export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: AppConfig().app.slogan,
};

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add any weights you need
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={urbanist.className}>
      <body className="bg-white flex justify-center">
        <div className="h-screen w-screen bg-white max-w-[1440px]">
          <Navbar />
          <div className="w-full flex bg-white">
            <Sidebar />
            <div className="bg-[#F8FAFB] h-full w-full px-5 py-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
