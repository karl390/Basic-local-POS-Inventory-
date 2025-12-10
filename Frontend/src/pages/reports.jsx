import { useEffect, useState } from "react";
import api from "../api";

export default function Reports() {
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);

  useEffect(() => {
    api.get("/reports/daily").then((r) => setDaily(r.data.total));
    api.get("/reports/weekly").then((r) => setWeekly(r.data.total));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Reports</h1>

      <div className="bg-white p-4 shadow rounded mb-4">
        <p>Today's Total</p>
        <h2 className="text-2xl font-bold">₱{daily}</h2>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <p>This Week</p>
        <h2 className="text-2xl font-bold">₱{weekly}</h2>
      </div>
    </div>
  );
}
