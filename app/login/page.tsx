import LoginPage from "./components/loginPage/LoginPage";
import Image from "next/image";
import RegisterPage from "./components/registerpage/RegisterPage";
import RecoveryPage from "./components/recoveryPage/RecoveryPage";
import OTPPage from "./components/otp/OTPPage";
import CreateNewPasswordPage from "./components/createnewpasswordpage/CreateNewPasswordPage";


export default function Login() {
  return (
    <div >
      <div className="flex max-w-[1440px] w-full   mx-auto  ">
        <div className="w-full h- p-5 hidden md:block">
          <Image src={"/login/loginImage.jpg"} alt={"profile"} width={1900} height={1900} className="w-full h-full object-cover rounded-[20px]" />
        </div>

        <LoginPage />
        {/* <RegisterPage /> */}
        {/* <RecoveryPage /> */}
        {/* <OTPPage/> */}
        {/* <CreateNewPasswordPage/> */}
      </div>
    </div>
  );
}
