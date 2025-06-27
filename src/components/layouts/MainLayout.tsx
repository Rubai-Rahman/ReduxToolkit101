import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="h-fll">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
