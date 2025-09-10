import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { apiGetCustomers, apiGetLeads } from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (!token) return;

    async function loadData() {
      const cRes = await apiGetCustomers(token, { page: 1, limit: 50 });
      if (cRes.data) setCustomers(cRes.data);

      const allLeads = [];
      for (let c of cRes.data) {
        const lRes = await apiGetLeads(token, c._id);
        if (Array.isArray(lRes)) allLeads.push(...lRes);
      }
      setLeads(allLeads);
    }

    loadData();
  }, [token]);

  const statusData = ["New", "Contacted", "Converted", "Lost"].map((status) => ({
    name: status,
    value: leads.filter((l) => l.status === status).length,
  }));

  const valueData = ["New", "Contacted", "Converted", "Lost"].map((status) => ({
    status,
    value: leads
      .filter((l) => l.status === status)
      .reduce((sum, l) => sum + l.value, 0),
  }));

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <div className="text-gray-600">Total Customers: <b>{customers.length}</b></div>
          <div className="text-gray-600">Total Leads: <b>{leads.length}</b></div>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Leads by Status (Pie)</h3>
          {leads.length === 0 ? (
            <div className="text-gray-500">No leads to display</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Leads Value */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Leads Value by Status (Bar)</h3>
        {leads.length === 0 ? (
          <div className="text-gray-500">No leads to display</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={valueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
