import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Navbar } from './components/navbar.tsx';

const Main: React.FC = () => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleSidebar = () => {
        setNavOpen(!navOpen);
    };

    return (
        <div className='flex'>
            <Navbar isOpen={navOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-all duration-300 ${navOpen ? 'ml-44' : 'ml-14'}`}>
                <App />
            </div>
        </div>
    );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
