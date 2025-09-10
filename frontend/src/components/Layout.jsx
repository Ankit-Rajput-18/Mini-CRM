import React, { useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "sonner"; // ✅ toast import

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/customers", label: "Customers" },
  ];

  function handleLogout() {
    logout();
    toast.success("You have been logged out ✅"); // 🔥 nice toast
    navigate("/login", { replace: true });
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="bg-indigo-600 text-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Hamburger */}
          <button
            className="p-2 rounded-lg bg-indigo-500 hover:bg-indigo-400"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg md:text-xl font-semibold">Mini-CRM</h1>
        </div>
        <span className="text-sm text-indigo-100">
          {new Date().toLocaleDateString()}
        </span>
      </header>

      {/* Sidebar Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <span className="text-xl font-bold text-indigo-600">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition ${
                location.pathname.startsWith(item.path)
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-indigo-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
