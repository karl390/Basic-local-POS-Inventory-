import express from "express";
import { connectDB } from "../db.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const db = await connectDB();
  const { total, items } = req.body;

  const now = new Date().toISOString();
  const sale = await db.run("INSERT INTO sales(datetime, total) VALUES (?, ?)", [
    now,
    total
  ]);

  for (const item of items) {
    await db.run(
      "INSERT INTO sold_items(saleId, productId, quantity, price) VALUES (?, ?, ?, ?)",
      [sale.lastID, item.id, item.quantity, item.price]
    );
  }

  res.json({ message: "Sale saved" });
});

export default router;
