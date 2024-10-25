import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { Navbar } from './components/navbar';
import App from './App';
import { UploadImage } from './pages/upload';
import { Menu, LucideSidebarClose } from 'lucide-react';
import { ContactForm } from './pages/contact';
import { Toaster } from 'react-hot-toast';

const Main: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleSidebar = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar for Desktop */}
      <Navbar isOpen={navOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${navOpen ? 'sm:ml-44' : 'sm:ml-14'}`}>
        <Toaster />
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/upload" element={<UploadImage />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>

      {/* Mobile Navigation Icon (Sticky Menu Icon) */}
      <div className="fixed top-1 left-2 z-50 block sm:hidden">
        <button
          onClick={toggleSidebar}
          className="bg-gray-50 text-green-600 p-2 rounded-full shadow-lg"
        >
          {!navOpen ? (
            <Menu className="h-6 w-6" />
          ) : (
            <LucideSidebarClose className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StrictMode>
);
