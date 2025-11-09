// src/api.js  (Docker / same-origin)
export async function submitForm(payload) {
  const res = await fetch(`/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
