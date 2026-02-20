import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import TopBar from "../components/Header/TopBar";

const SimpleLayout = () => {
  return (
    <div className="p-3">
      <TopBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SimpleLayout;
