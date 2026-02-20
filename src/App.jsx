import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";
import SimpleLayout from "./layouts/SimpleLayout";

import All from "./pages/menuPages/All";
import Food from "./pages/menuPages/Food";
import CoolDrinks from "./pages/menuPages/CoolDrinks";
import Beer from "./pages/menuPages/Beer";
import Whiskhy from "./pages/menuPages/Whisky";
import Wine from "./pages/menuPages/Wine";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PrivateRoute from "./pages/Admin/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITH Header & Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<All />} />
          <Route path="food" element={<Food />} />
          <Route path="cooldrinks" element={<CoolDrinks />} />
          <Route path="beer" element={<Beer />} />
          <Route path="whisky" element={<Whiskhy />} />
          <Route path="wine" element={<Wine />} />
        </Route>

        {/* Pages WITHOUT Header & Navbar */}
        <Route element={<SimpleLayout />}>
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
