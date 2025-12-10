import express from "express";
import { connectDB } from "../db.js";
const router = express.Router();

// Get all products
router.get("/", async (_, res) => {
  const db = await connectDB();
  const rows = await db.all("SELECT * FROM products");
  res.json(rows);
});

// Search by name
router.get("/search", async (req, res) => {
  const db = await connectDB();
  const q = `%${req.query.q}%`;
  const rows = await db.all("SELECT * FROM products WHERE name LIKE ?", [q]);
  res.json(rows);
});

// Add product
router.post("/", async (req, res) => {
  const { name, price, stock, lowStock } = req.body;
  const db = await connectDB();

  await db.run(
    "INSERT INTO products(name, price, stock, lowStock) VALUES (?, ?, ?, ?)",
    [name, price, stock, lowStock]
  );
  res.json({ message: "Product added" });
});

// Deduct stock
router.post("/deduct", async (req, res) => {
  const db = await connectDB();
  const items = req.body.items;

  for (const item of items) {
    await db.run(
      "UPDATE products SET stock = stock - ? WHERE id = ?",
      [item.quantity, item.id]
    );
  }

  res.json({ ok: true });
});

export default router;
