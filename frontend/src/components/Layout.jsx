import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Download, Home, Users, BarChart3, Menu, X } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "sonner";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={16} /> },
    { path: "/dashboard", label: "Dashboard", icon: <BarChart3 size={16} /> },
    { path: "/customers", label: "Customers", icon: <Users size={16} /> },
  ];

  function handleLogout() {
    logout();
    toast.success("You have been logged out ✅");
    navigate("/login", { replace: true });
  }

  function handleDownload(type) {
    toast.success(`${type} data downloaded ✅`);
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="bg-white text-indigo-600 px-2 py-1 rounded-lg">CRM</span>
            <span className="hidden sm:inline">Mini CRM</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1 font-medium transition ${
                  location.pathname === item.path
                    ? "text-yellow-300"
                    : "hover:text-gray-200"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleDownload("Customers")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm"
            >
              <Download size={14} /> Customers
            </button>
            <button
              onClick={() => handleDownload("Leads")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              <Download size={14} /> Leads
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-indigo-700 text-white flex flex-col items-center py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 text-lg ${
                  location.pathname === item.path ? "text-yellow-300" : "hover:text-gray-300"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => handleDownload("Customers")}
              className="px-4 py-2 bg-green-600 rounded-lg w-40"
            >
              Download Customers
            </button>
            <button
              onClick={() => handleDownload("Leads")}
              className="px-4 py-2 bg-blue-600 rounded-lg w-40"
            >
              Download Leads
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded-lg w-40"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
