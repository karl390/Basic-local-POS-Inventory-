import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function connectDB() {
  const db = await open({
    filename: "./tindahan.db",
    driver: sqlite3.Database
  });

  // Initialize tables if they don’t exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      stock INTEGER,
      lowStock INTEGER
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      datetime TEXT,
      total REAL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sold_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      saleId INTEGER,
      productId INTEGER,
      quantity INTEGER,
      price REAL
    );
  `);

  return db;
}

