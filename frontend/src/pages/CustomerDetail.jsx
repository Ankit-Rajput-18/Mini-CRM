import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "sonner";
import {
  apiGetCustomer,
  apiUpdateCustomer,
  apiCreateLead,
  apiGetLeads,
  apiUpdateLead,
  apiDeleteLead,
} from "../api/api";

export default function CustomerDetail() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [customer, setCustomer] = useState(null);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [editCustomerMode, setEditCustomerMode] = useState(false);

  const [leads, setLeads] = useState([]);
  const [leadForm, setLeadForm] = useState({
    title: "",
    description: "",
    status: "New",
    value: 0,
  });
  const [editingLeadId, setEditingLeadId] = useState(null);

  async function load() {
    if (!token) return;
    const res = await apiGetCustomer(token, id);
    if (res.customer) {
      setCustomer(res.customer);
      setCustomerForm({
        name: res.customer.name,
        email: res.customer.email,
        phone: res.customer.phone,
        company: res.customer.company,
      });
    } else {
      toast.error(res.message || "❌ Cannot load customer");
    }

    const leadsData = await apiGetLeads(token, id);
    setLeads(leadsData || []);
  }
useEffect(() => {
  load();
}, [load, token, id]);

  // ✅ Customer update
  async function handleCustomerUpdate(e) {
    e.preventDefault();
    const res = await apiUpdateCustomer(token, id, customerForm);
    if (res._id) {
      toast.success("✅ Customer details updated successfully");
      setCustomer(res);
      setEditCustomerMode(false);
    } else {
      toast.error(res.message || "❌ Update failed");
    }
  }

  // ✅ Lead create/update
  async function handleLeadSubmit(e) {
    e.preventDefault();
    if (editingLeadId) {
      const res = await apiUpdateLead(token, id, editingLeadId, leadForm);
      if (res._id) {
        toast.success("✏️ Lead updated successfully");
        setLeads((prev) => prev.map((l) => (l._id === res._id ? res : l)));
        setEditingLeadId(null);
        setLeadForm({ title: "", description: "", status: "New", value: 0 });
      } else {
        toast.error(res.message || "❌ Lead update failed");
      }
    } else {
      const res = await apiCreateLead(token, id, leadForm);
      if (res._id) {
        toast.success("🎉 Lead added successfully");
        setLeads((prev) => [res, ...prev]);
        setLeadForm({ title: "", description: "", status: "New", value: 0 });
      } else {
        toast.error(res.message || "❌ Failed to create lead");
      }
    }
  }

  function startEditLead(lead) {
    setEditingLeadId(lead._id);
    setLeadForm({
      title: lead.title,
      description: lead.description,
      status: lead.status,
      value: lead.value,
    });
  }

  // ✅ Lead delete
  async function handleLeadDelete(leadId) {
    if (!window.confirm("Delete this lead?")) return;
    try {
      const res = await apiDeleteLead(token, id, leadId);
      if (res.success || res.message?.includes("deleted")) {
        toast.success("🗑️ Lead deleted successfully");
        setLeads((prev) => prev.filter((l) => l._id !== leadId));
      } else {
        toast.error(res.message || "❌ Failed to delete lead");
      }
    } catch (err) {
      toast.error("❌ Something went wrong while deleting lead");
    }
  }

  if (!customer) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-10 max-w-5xl mx-auto">
      {/* Customer Info */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Customer Details</h3>
        {!editCustomerMode ? (
          <div>
            <div className="text-2xl font-semibold">{customer.name}</div>
            <div className="text-sm opacity-90 mt-1">
              {customer.email} • {customer.phone} • {customer.company}
            </div>
            <button
              onClick={() => setEditCustomerMode(true)}
              className="mt-4 px-5 py-2 bg-white text-indigo-700 font-medium rounded-lg hover:bg-gray-100 transition"
            >
              Edit Details
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleCustomerUpdate}
            className="grid gap-3 bg-white p-4 rounded-lg text-gray-800"
          >
            <input
              className="border rounded-lg px-3 py-2"
              value={customerForm.name}
              onChange={(e) =>
                setCustomerForm({ ...customerForm, name: e.target.value })
              }
              required
            />
            <input
              className="border rounded-lg px-3 py-2"
              value={customerForm.email}
              onChange={(e) =>
                setCustomerForm({ ...customerForm, email: e.target.value })
              }
            />
            <input
              className="border rounded-lg px-3 py-2"
              value={customerForm.phone}
              onChange={(e) =>
                setCustomerForm({ ...customerForm, phone: e.target.value })
              }
            />
            <input
              className="border rounded-lg px-3 py-2"
              value={customerForm.company}
              onChange={(e) =>
                setCustomerForm({ ...customerForm, company: e.target.value })
              }
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditCustomerMode(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Leads */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Manage Leads
        </h3>
        {/* Lead Form */}
        <form
          onSubmit={handleLeadSubmit}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <input
            placeholder="Title"
            className="border rounded-lg px-3 py-2"
            value={leadForm.title}
            onChange={(e) =>
              setLeadForm({ ...leadForm, title: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Value"
            className="border rounded-lg px-3 py-2"
            value={leadForm.value}
            onChange={(e) =>
              setLeadForm({ ...leadForm, value: Number(e.target.value) })
            }
          />
          <select
            className="border rounded-lg px-3 py-2"
            value={leadForm.status}
            onChange={(e) =>
              setLeadForm({ ...leadForm, status: e.target.value })
            }
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
            <option>Lost</option>
          </select>
          <textarea
            placeholder="Description"
            className="border rounded-lg px-3 py-2 md:col-span-2 lg:col-span-4"
            value={leadForm.description}
            onChange={(e) =>
              setLeadForm({ ...leadForm, description: e.target.value })
            }
          />
          <div className="flex gap-3 md:col-span-2 lg:col-span-4">
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
            >
              {editingLeadId ? "Update Lead" : "Add Lead"}
            </button>
            {editingLeadId && (
              <button
                type="button"
                onClick={() => {
                  setEditingLeadId(null);
                  setLeadForm({
                    title: "",
                    description: "",
                    status: "New",
                    value: 0,
                  });
                }}
                className="px-5 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Leads List */}
        {leads.length === 0 ? (
          <div className="text-gray-500 mt-6">No leads available</div>
        ) : (
          <div className="mt-8 space-y-4">
            {leads.map((l) => (
              <div
                key={l._id}
                className="p-4 border rounded-lg flex justify-between items-start hover:shadow-md transition"
              >
                <div>
                  <div className="font-semibold text-lg text-gray-800">
                    {l.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        l.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : l.status === "Contacted"
                          ? "bg-yellow-100 text-yellow-700"
                          : l.status === "Converted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {l.status}
                    </span>{" "}
                    • ₹{l.value} • {new Date(l.createdAt).toLocaleString()}
                  </div>
                  <div className="text-gray-700 mt-2">{l.description}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditLead(l)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleLeadDelete(l._id)}
                    className="px-3 py-1 text-sm bg-black text-white rounded-lg hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
