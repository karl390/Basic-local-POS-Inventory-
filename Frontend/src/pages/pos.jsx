import { useState, useEffect } from "react";
import api from "../api";

export default function POS() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (query.length < 1) return setResults([]);
    api.get(`/products/search?q=${query}`).then((res) => setResults(res.data));
  }, [query]);

  const checkout = async () => {
    if (cart.length === 0) return;

    const total = cart.reduce((a, b) => a + b.price, 0);
    await api.post("/sales", { total, items: cart });
    await api.post("/products/deduct", { items: cart });

    alert("Sale completed!");
    setCart([]);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">POS</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Search product..."
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="mt-4 bg-white shadow rounded">
        {results.map((p) => (
          <div
            key={p.id}
            className="p-2 border-b flex justify-between"
            onClick={() => setCart([...cart, p])}
          >
            <span>{p.name}</span>
            <span>₱{p.price}</span>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold mt-4">Cart</h2>

      {cart.map((c, i) => (
        <div key={i} className="flex justify-between p-2 border-b">
          <span>{c.name}</span>
          <span>₱{c.price}</span>
        </div>
      ))}

      <button
        className="mt-4 bg-blue-600 text-white p-3 rounded w-full"
        onClick={checkout}
      >
        Checkout
      </button>
    </div>
  );
}
