const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';
export async function api(path, options = {}) {
  const token = localStorage.getItem('novapay_token');
  const res = await fetch(`${API_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'NovaPay request failed');
  return data;
}
export const login = (email, password) => api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const register = (payload) => api('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
export const dashboard = () => api('/dashboard');
export const transfer = (payload) => api('/transfers', { method: 'POST', body: JSON.stringify(payload) });
