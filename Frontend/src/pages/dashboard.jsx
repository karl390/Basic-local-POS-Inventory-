import api from "../api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);

  useEffect(() => {
    api.get("/reports/daily").then((res) => setDaily(res.data.total));
    api.get("/reports/weekly").then((res) => setWeekly(res.data.total));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <p>Today's Sales</p>
          <h2 className="text-3xl font-bold">₱{daily}</h2>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p>This Week</p>
          <h2 className="text-3xl font-bold">₱{weekly}</h2>
        </div>
      </div>
    </div>
  );
}
