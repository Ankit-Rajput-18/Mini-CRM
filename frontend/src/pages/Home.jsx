import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BarChart2, Shield, Menu, X } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleDashboardClick() {
    navigate(token ? "/dashboard" : "/login");
  }
  function handleLogin() {
    navigate("/login");
  }
  function handleSignup() {
    navigate("/signup");
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 min-h-screen text-white flex flex-col">
      {/* 🌐 Navbar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-lg shadow-lg">
        <h1 className="text-2xl text-gray-800 font-bold">Mini-CRM</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <button onClick={handleDashboardClick} className="text-black hover:text-gray-200">
            Dashboard
          </button>
          <button onClick={handleLogin} className="text-black hover:text-gray-200">
            Login
          </button>
          <button onClick={handleSignup} className="text-black hover:text-gray-200">
            Signup
          </button>
          <Link
            to="/register"
            className="px-4 py-2 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white text-black flex flex-col items-center py-6 space-y-4 shadow-md md:hidden z-40">
          <button onClick={handleDashboardClick}>Dashboard</button>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
          <Link
            to="/register"
            className="px-4 py-2 bg-yellow-400 rounded-xl font-semibold hover:bg-yellow-300 transition"
          >
            Get Started
          </Link>
        </div>
      )}

      {/* 🎯 Hero Section */}
      <section className="flex flex-1 items-center justify-center text-center px-6 pt-24 md:pt-32">
        <div>
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Manage Your Customers & Leads <br />
            <span className="text-yellow-300">Smarter & Faster </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl mb-8 text-gray-200"
          >
            A simple yet powerful CRM to organize, track, and grow your business.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="space-x-4"
          >
            <Link
              to="/register"
              className="px-6 py-3 bg-yellow-400 text-black rounded-xl text-lg font-semibold hover:bg-yellow-300 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-white/20 border border-white rounded-xl text-lg font-semibold hover:bg-white/30 transition"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ⭐ Features */}
      <section className="py-20 bg-white text-gray-900 text-center">
        <h3 className="text-3xl font-bold mb-12">Why Choose Mini-CRM?</h3>
        <div className="grid md:grid-cols-3 gap-8 px-10">
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <Users className="mx-auto text-indigo-600 mb-4" size={40} />
            <h4 className="text-xl font-semibold">Customer Management</h4>
            <p className="mt-2 text-gray-600">Easily add, view, and manage all your customers in one place.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <BarChart2 className="mx-auto text-green-600 mb-4" size={40} />
            <h4 className="text-xl font-semibold">Track Leads</h4>
            <p className="mt-2 text-gray-600">Create and track leads with status and value insights.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <Shield className="mx-auto text-pink-600 mb-4" size={40} />
            <h4 className="text-xl font-semibold">Secure Authentication</h4>
            <p className="mt-2 text-gray-600">Role-based access and JWT authentication for safety.</p>
          </motion.div>
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="py-20 bg-gray-100 text-gray-900 text-center">
        <h3 className="text-3xl font-bold mb-12">What Our Users Say</h3>
        <div className="grid md:grid-cols-3 gap-8 px-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 italic">"MiniCRM saved us hours every week, super easy to use!"</p>
            <h4 className="mt-4 font-semibold">- John Doe, Startup CEO</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 italic">"The dashboard insights helped us boost conversions 🚀"</p>
            <h4 className="mt-4 font-semibold">- Sarah Lee, Marketing Head</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 italic">"Finally a CRM that's simple and doesn’t overwhelm me!"</p>
            <h4 className="mt-4 font-semibold">- Alex Kim, Freelancer</h4>
          </div>
        </div>
      </section>

      {/* 🔗 Footer */}
      <footer className="bg-indigo-700 text-center py-6 mt-auto">
        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} Mini-CRM. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="https://www.linkedin.com/in/ankit-rajput-706b47262/" className="hover:text-yellow-300">LinkedIn</a>
          <a href="https://github.com/Ankit-Rajput-18" className="hover:text-yellow-300">GitHub</a>
          <a href="https://www.instagram.com/ankit_rajput298/" className="hover:text-yellow-300">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
