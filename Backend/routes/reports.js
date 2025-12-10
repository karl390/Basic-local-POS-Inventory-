import express from "express";
import { connectDB } from "../db.js";
const router = express.Router();

router.get("/daily", async (_, res) => {
  const db = await connectDB();
  const today = new Date().toISOString().slice(0, 10);
  const row = await db.get(
    "SELECT SUM(total) as total FROM sales WHERE datetime LIKE ?",
    [`${today}%`]
  );
  res.json({ total: row.total || 0 });
});

router.get("/weekly", async (_, res) => {
  const db = await connectDB();
  const weekAgo = new Date(Date.now() - 7 * 86400000)
    .toISOString()
    .slice(0, 10);

  const row = await db.get(
    "SELECT SUM(total) as total FROM sales WHERE datetime >= ?",
    [weekAgo]
  );

  res.json({ total: row.total || 0 });
});

export default router;
