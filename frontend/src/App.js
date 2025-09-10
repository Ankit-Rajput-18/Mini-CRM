import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CustomersList from "./pages/CustomersList";
import CustomerDetail from "./pages/CustomerDetail";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'react-phone-input-2/lib/style.css';
import { Toaster } from "sonner";

import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes (with Layout wrapper) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout onLogout={() => {}} />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<CustomersList />} />
            <Route path="customers/:id" element={<CustomerDetail />} />
          </Route>
        </Routes>
         <Toaster position="top-center" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}
