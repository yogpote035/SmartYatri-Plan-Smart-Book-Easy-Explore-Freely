import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxState/Authentication/AuthSlice";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaTicketAlt,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="SmartYatri Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-blue-600">SmartYatri</span>
        </div>

        <div className="flex items-center gap-6">
          <div
            className={`hidden md:flex gap-x-6 transition-all duration-300 ${
              sidebarOpen ? "md:translate-x-[-176px]" : "md:translate-x-0"
            }`}
          >
            <a href="/bookings" className="hover:text-blue-600 font-medium">
              Bookings
            </a>
            <a href="/itinerary" className="hover:text-blue-600 font-medium">
              Itinerary
            </a>
            <a href="/diary" className="hover:text-blue-600 font-medium">
              Diary
            </a>
          </div>

          {!sidebarOpen && (
            <button onClick={toggleSidebar} className="text-xl text-blue-600">
              <FaBars />
            </button>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-44 bg-white shadow-lg z-50 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-red-600"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="px-6 pt-6 space-y-4">
          <div className="block md:hidden space-y-3">
            <a href="/bookings" className="block hover:text-blue-600">📘 Bookings</a>
            <a href="/itinerary" className="block hover:text-blue-600">📍 Itinerary</a>
            <a href="/diary" className="block hover:text-blue-600">📸 Diary</a>
            <hr />
          </div>

          {user ? (
            <>
              <a href="/profile" className="flex items-center gap-2 hover:text-blue-600">
                <FaUser /> View Profile
              </a>
              <a href="/ticket-history" className="flex items-center gap-2 hover:text-blue-600">
                <FaTicketAlt /> Ticket History
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-left hover:text-red-600"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="flex items-center gap-2 hover:text-blue-600">
                <FaSignInAlt /> Login
              </a>
              <a href="/signup" className="flex items-center gap-2 hover:text-blue-600">
                <FaUserPlus /> Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
