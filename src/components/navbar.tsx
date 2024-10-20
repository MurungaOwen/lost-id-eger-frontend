import { useState } from "react";
import { Menu, LucideSidebarClose, Upload, HomeIcon, SendIcon, FilterIcon, UploadIcon } from "lucide-react";

interface NavbarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleSidebar }) => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    function handleMobileNav() {
        setMobileNavOpen(!mobileNavOpen);
        document.body.classList.toggle('overflow-hidden', mobileNavOpen);
    }

    return (
        <>
            {/* Desktop Navigation */}
            {isOpen ? (
                <div className="bg-gray-50 w-44 text-green-600 fixed top-0 left-0 flex flex-col min-h-screen transition-transform duration-300">
                    <button className="ml-auto mr-2" onClick={toggleSidebar}>
                        <LucideSidebarClose />
                    </button>
                    <div className="flex flex-col p-2 m-2 justify-center align-middle mt-44 font-semibold">
                        <a href="" className="mt-5 hover:text-teal-900 flex space-x-4">
                            <HomeIcon />
                            <div>Home</div>
                        </a>
                        <a href="" className="mt-5 hover:text-teal-900 flex space-x-4">
                            <UploadIcon />
                            <div>Upload ID</div>
                        </a>
                        <a href="" className="mt-5 hover:text-teal-900 flex space-x-4">
                            <SendIcon />
                            <div>Contact us</div>
                        </a>
                        <a href="" className="mt-5 hover:text-teal-900 flex space-x-4">
                            <FilterIcon />
                            <div>Filter</div>
                        </a>
                    </div>
                    <div className="ml-1 mt-auto mb-2 font-mono text-xs text-gray-500">
                        <p>Egerton Lost IDs</p>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 w-14 text-green-600 fixed top-0 left-0 flex flex-col min-h-screen transition-transform duration-300">
                    <button className="ml-auto mr-2" onClick={toggleSidebar}>
                        <Menu />
                    </button>
                    <div className="flex flex-col p-2 m-2 justify-center align-middle mt-44 font-semibold">
                        <a href="" className="mt-5 hover:text-teal-900">
                            <HomeIcon />
                        </a>
                        <a href="" className="mt-5 hover:text-teal-900">
                            <Upload />
                        </a>
                        <a href="" className="mt-5 hover:text-teal-900">
                            <SendIcon />
                        </a>
                        <a href="" className="mt-5 hover:text-teal-900">
                            <FilterIcon />
                        </a>
                    </div>
                    <div className="ml-1 mt-auto mb-2 font-mono text-xs">
                        <p>Hood</p>
                    </div>
                </div>
            )}

            {/* Mobile Navigation */}
            {!mobileNavOpen ? (
                <div className="rounded-full w-fit block sm:hidden bg-gray-50 text-green-600 sticky top-1 left-2">
                    <button className="p-2 m-1" onClick={handleMobileNav}>
                        <Menu />
                    </button>
                </div>
            ) : (
                <div className="fixed block sm:hidden top-0 left-0 w-full h-full bg-gray-50 text-green-600 z-50">
                    <button className="p-2 m-2" onClick={handleMobileNav}>
                        <LucideSidebarClose />
                    </button>
                    <div className="flex flex-col p-2 mx-2 justify-center mt-44 font-semibold">
                        <a href="" className="mt-5 hover:text-teal-900 flex space-x-4">
                            <HomeIcon />
                            <div>Home</div>
                        </a>
                        <a href="" className="mt-5 hover:text-teal-900 flex space-x-4">
                            <UploadIcon />
                            <div>Upload ID</div>
                        </a>
                        <a href="" className="mt-5 hover:text-teal-900 flex space-x-4">
                            <SendIcon />
                            <div>Contact us</div>
                        </a>
                        <a href="" className="mt-5 hover:text-teal-900 flex space-x-4">
                            <FilterIcon />
                            <div>Filter</div>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};