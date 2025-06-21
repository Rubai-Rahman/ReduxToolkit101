import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto pt-[60px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
