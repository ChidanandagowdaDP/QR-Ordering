import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="p-3">
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
