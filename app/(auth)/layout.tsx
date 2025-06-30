import Image from "next/image";


export default function Authlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F8FAFB]   w-full   overflow-y-scroll h-screen"  >
      <div className="flex max-w-[1440px] w-full   mx-auto  ">
        <div className="w-full h- p-5 hidden md:block">
          <Image src={"/login/loginImage.jpg"} alt={"profile"} width={1900} height={1900} className="w-full h-full object-cover rounded-[20px]" />
        </div>

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
