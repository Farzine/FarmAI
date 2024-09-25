import { Outlet } from "react-router-dom";
import { Img } from "react-image";


function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center relative w-1/2 px-12">
        <Img
          src="/cover.jpg" 
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          loader={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        />
        
        {/* Overlay text */}
        <div className="relative max-w-2xl space-y-6 text-center text-primary-foreground z-10">
          <h1 className="text-4xl font-extrabold tracking-tight font-serif mb-2">
            Welcome to Farm AI
          </h1>
          <span className="">Empowering Farmers with AI Driven Technology</span>
        </div>

        {/* Optional overlay color for additional effect */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
