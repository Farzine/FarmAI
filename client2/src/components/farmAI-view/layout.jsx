import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./footer";

function FarmAILayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
        <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
        <Footer />
    </div>
  );
}

export default FarmAILayout;
