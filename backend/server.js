import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));

const FormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  age: z
    .union([z.string(), z.number()])
    .optional()
    .transform(v => (v === undefined || v === "" ? undefined : Number(v)))
    .refine(v => v === undefined || (Number.isFinite(v) && v >= 13 && v <= 120), {
      message: "Age should be between 13 and 120"
    }),
  message: z.string().max(500, "Max 500 characters").optional(),
  terms: z.boolean().refine(v => v === true, "You must accept the terms")
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/submit", (req, res) => {
  const parsed = FormSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({ ok: false, errors });
  }

  // Simulate saving…
  const { fullName, email } = parsed.data;
  // You can insert DB logic here.

  return res.json({
    ok: true,
    message: `Thanks, ${fullName}! We received your submission for ${email}.`
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
