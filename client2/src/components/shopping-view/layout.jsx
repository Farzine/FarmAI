import { Outlet } from "react-router-dom";
import ShoppingHeader from "../../components/farmAI-view/header";
import Footer from "../../components/farmAI-view/footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingLayout;
