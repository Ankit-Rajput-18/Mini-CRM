import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../contexts/AuthContext";
import {
  apiGetCustomers,
  apiCreateCustomer,
  apiDeleteCustomer,
} from "../api/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Building2, Trash2, Eye } from "lucide-react";

// ✅ Yup schema validation
const schema = yup.object().shape({
  name: yup.string().required(" Name is required"),
  email: yup
    .string()
    .email(" Enter a valid email")
    .required(" Email is required"),
phone: yup
  .string()
  .matches(/^\+?\d{10,15}$/, " Enter a valid phone number")
  .required(" Phone number is required"),

  company: yup.string().required(" Company name is required"),
});

export default function CustomersList() {
  const { token } = useContext(AuthContext);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ data: [], meta: {} });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", phone: "", company: "" },
  });

  // ✅ Load Customers
  useEffect(() => {
    if (!token) return;
    loadData();
  }, [token, page, q]);

  async function loadData() {
    try {
      const res = await apiGetCustomers(token, { page, limit: 8, q });
      if (Array.isArray(res.customers)) {
        setData({ data: res.customers, meta: res.meta || {} });
      } else if (Array.isArray(res.data)) {
        setData({ data: res.data, meta: res.meta || {} });
      } else {
        setData({ data: [], meta: {} });
      }
    } catch (err) {
      toast.error(" Failed to load customers.");
      setData({ data: [], meta: {} });
    }
  }

  // ✅ Add Customer
  const handleCreate = async (formData) => {
    try {
      const res = await apiCreateCustomer(token, formData);
      if (res._id) {
        toast.success("🎉 Customer added successfully!");
        reset();
        setPage(1);
        loadData();
      } else {
        toast.error(res.message || " Failed to create customer");
      }
    } catch (err) {
      toast.error(" Something went wrong while adding customer");
    }
  };

  // ✅ Delete Customer
  async function handleDelete(id) {
    if (!window.confirm("Delete this customer?")) return;
    try {
      const res = await apiDeleteCustomer(token, id);
      if (res.success || res._id || res.message?.includes("deleted")) {
        toast.success("🗑️ Customer deleted successfully");
        loadData();
      } else {
        toast.error(res.message || " Failed to delete customer");
      }
    } catch (err) {
      toast.error(" Something went wrong while deleting customer");
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">👥 Customers</h2>
        <span className="text-sm text-gray-500">
          Manage your customer records easily
        </span>
      </div>

      {/* Add Customer Form */}
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <User className="text-indigo-600" size={22} /> Add New Customer
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Add a new customer by filling in the details below — it only takes a
            minute.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleCreate)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
              <User size={18} className="text-gray-400 mr-2" />
              <input
                {...register("name")}
                className="w-full p-2 outline-none bg-transparent"
                placeholder="Enter full name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                {...register("email")}
                className="w-full p-2 outline-none bg-transparent"
                placeholder="Enter email address"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
       <div className="flex flex-col">
  <label className="text-sm font-medium text-gray-600 mb-1">
    Phone
  </label>
  <div className="border rounded-lg px-2 py-1 bg-white">
    <Controller
      name="phone"
      control={control}
      render={({ field }) => (
        <PhoneInput
          {...field}
          country={"in"} // ✅ default India, but user dropdown se change kar sakta hai
          enableSearch={true} // ✅ search option for countries
          countryCodeEditable={false} // ✅ user +91 ya code edit na kare
          inputClass="!w-full !py-2 !pl-12 !rounded-lg !border"
        />
      )}
    />
  </div>
  {errors.phone && (
    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
  )}
</div>


          {/* Company */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Company
            </label>
            <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
              <Building2 size={18} className="text-gray-400 mr-2" />
              <input
                {...register("company")}
                className="w-full p-2 outline-none bg-transparent"
                placeholder="Enter company name"
              />
            </div>
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold shadow-md flex items-center gap-2"
            >
              <User size={18} /> Add Customer
            </button>
          </div>
        </form>
      </div>

      {/* Customers List */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Customer List</h3>
          <input
            className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="🔍 Search by name or email..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {data.data && data.data.length === 0 && (
          <div className="text-gray-500 text-center py-10">
            No customers found 🚫
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data &&
            data.data.map((c) => (
              <div
                key={c._id}
                className="bg-gradient-to-br from-white to-gray-50 border rounded-xl p-5 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {c.name}
                  </h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail size={14} /> {c.email || "—"}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Building2 size={14} /> {c.company || "—"}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Phone size={14} /> {c.phone || "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/customers/${c._id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                      <Eye size={16} /> View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-8">
          <Pagination meta={data.meta} onPageChange={(p) => setPage(p)} />
        </div>
      </div>
    </div>
  );
}
