// MainLayout.tsx

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex  min-h-screen flex-col bg-background text-foreground ">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
