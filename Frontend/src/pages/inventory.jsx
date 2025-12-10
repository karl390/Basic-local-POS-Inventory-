import { useEffect, useState } from "react";
import api from "../api";
import LowStockAlert from "../components/LowStockAlert";

export default function Inventory() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    lowStock: 5,
  });

  const load = () =>
    api.get("/products").then((res) => setList(res.data));

  useEffect(() => {
    load();
  }, []);

  const addProduct = async () => {
    await api.post("/products", form);
    setForm({ name: "", price: "", stock: "", lowStock: 5 });
    load();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Inventory</h1>

      <div className="bg-white p-4 shadow rounded mb-4">
        <input
          placeholder="Name"
          className="border p-2 mb-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          className="border p-2 mb-2 w-full"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: parseFloat(e.target.value) })
          }
        />
        <input
          placeholder="Stock"
          className="border p-2 mb-2 w-full"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: parseInt(e.target.value) })
          }
        />
        <button className="bg-green-600 text-white p-2 rounded w-full" onClick={addProduct}>
          Add Product
        </button>
      </div>

      {list.map((p) => (
        <div key={p.id} className="p-3 border-b bg-white rounded mb-2 shadow">
          <LowStockAlert product={p} />
          <div className="font-bold">{p.name}</div>
          <div>₱{p.price} • Stock: {p.stock}</div>
        </div>
      ))}
    </div>
  );
}
