import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./footer";

function FarmAILayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
        <div className="fixed top-0 left-0 right-0 z-50">
        <ShoppingHeader />
      </div>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
        <Footer />
    </div>
  );
}

export default FarmAILayout;
