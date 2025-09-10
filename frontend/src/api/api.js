const API_URL = "http://localhost:5000/api";

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

/* ==================== Auth ==================== */
export async function apiRegister(name, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

export async function apiLogin(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

/* ==================== Customers ==================== */
export async function apiGetCustomers(token, { page=1, limit=10, q='' } = {}) {
  const params = new URLSearchParams({ page, limit, q });
  const res = await fetch(`${API_URL}/customers?${params.toString()}`, {
    headers: authHeaders(token)
  });

  if (!res.ok) {
    return { error: true, status: res.status, message: res.statusText };
  }

  return res.json();
}


export async function apiCreateCustomer(token, payload) {
  const res = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', ...authHeaders(token) },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function apiGetCustomer(token, id) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    headers: authHeaders(token)
  });
  return res.json();
}

export async function apiUpdateCustomer(token, id, payload) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type':'application/json', ...authHeaders(token) },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function apiDeleteCustomer(token, id) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token)
  });
  return res.json();
}

/* ==================== Leads ==================== */
export async function apiCreateLead(token, customerId, data) {
  const res = await fetch(`${API_URL}/leads/${customerId}/leads`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', ...authHeaders(token) },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function apiGetLeads(token, customerId) {
  const res = await fetch(`${API_URL}/leads/${customerId}/leads`, {
    headers: authHeaders(token)
  });
  return res.json();
}

export async function apiUpdateLead(token, customerId, leadId, data) {
  const res = await fetch(`${API_URL}/leads/${customerId}/leads/${leadId}`, {
    method: 'PUT',
    headers: { 'Content-Type':'application/json', ...authHeaders(token) },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function apiDeleteLead(token, customerId, leadId) {
  const res = await fetch(`${API_URL}/leads/${customerId}/leads/${leadId}`, {
    method: 'DELETE',
    headers: authHeaders(token)
  });
  return res.json();
}
