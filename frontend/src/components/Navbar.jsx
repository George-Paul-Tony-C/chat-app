// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { HiMenu } from "react-icons/hi"; // Import the menu icon

const Navbar = ({ toggleSidebar }) => { // Receive toggleSidebar as a prop
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-base-100/80 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Menu Button */}
        <div className="flex items-center gap-4">
          {/* Menu Button for Mobile */}
          <button
            onClick={toggleSidebar}
            className="text-2xl text-gray-700 focus:outline-none md:hidden"
            aria-label="Toggle Sidebar"
          >
            <HiMenu />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-300"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center transition-transform transform hover:scale-110">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Chatty</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <Link
            to={"/settings"}
            className="btn btn-sm gap-2 transition-colors duration-300 hover:bg-base-200"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to={"/profile"} className="btn btn-sm gap-2 transition-colors duration-300 hover:bg-base-200">
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                className="flex gap-2 items-center btn btn-sm transition-colors duration-300 hover:bg-base-200"
                onClick={logout}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
