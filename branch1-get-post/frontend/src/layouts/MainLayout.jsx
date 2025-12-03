import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="App">
      {/* Navbar stays visible on all pages */}
      <Navbar />

      {/* Main content area where child routes render */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;