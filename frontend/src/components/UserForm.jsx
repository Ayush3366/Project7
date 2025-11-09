import { useState } from "react";
import { submitForm } from "../api";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  message: "",
  terms: false
};

export default function UserForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, successMsg: "" });

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setValues(v => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, successMsg: "" });
    setErrors({});

    const resp = await submitForm(values);
    if (!resp.ok) {
      setErrors(resp.errors || {});
      setStatus({ loading: false, successMsg: "" });
    } else {
      setStatus({ loading: false, successMsg: resp.message });
      setValues(initial);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row two">
        <div className="input">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName" name="fullName" placeholder="Ayush Chaudhary"
            value={values.fullName} onChange={handleChange}
          />
          {errors.fullName && <div className="error">{errors.fullName[0]}</div>}
        </div>

        <div className="input">
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" placeholder="you@example.com"
            value={values.email} onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email[0]}</div>}
        </div>
      </div>

      <div className="row two">
        <div className="input">
          <label htmlFor="phone">Phone (optional)</label>
          <input
            id="phone" name="phone" placeholder="+1 647…"
            value={values.phone} onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="age">Age (optional)</label>
          <input
            id="age" name="age" inputMode="numeric" placeholder="28"
            value={values.age} onChange={handleChange}
          />
          {errors.age && <div className="error">{errors.age[0]}</div>}
        </div>
      </div>

      <div className="input">
        <label htmlFor="message">Message (optional)</label>
        <textarea
          id="message" name="message" rows={4} placeholder="Tell us something…"
          value={values.message} onChange={handleChange}
        />
        <div className="helper">Max 500 characters.</div>
      </div>

      <div className="checkbox-row">
        <input
          id="terms" name="terms" type="checkbox"
          checked={values.terms} onChange={handleChange}
        />
        <label htmlFor="terms">I accept the terms</label>
      </div>
      {errors.terms && <div className="error">{errors.terms[0]}</div>}

      <button disabled={status.loading}>
        {status.loading ? "Submitting…" : "Submit"}
      </button>

      {status.successMsg && (
        <div className="success">{status.successMsg}</div>
      )}
    </form>
  );
}
