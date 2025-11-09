const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function submitForm(payload) {
  const res = await fetch(`${API_BASE}/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
