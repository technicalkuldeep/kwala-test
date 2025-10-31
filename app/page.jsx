"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [incidents, setIncidents] = useState([]);

  async function fetchIncidents() {
    try {
      const res = await fetch("/api/new-complaint");
      const data = await res.json();
      setIncidents(data.reverse());
    } catch (err) {
      console.error("Failed to fetch incidents:", err);
    }
  }

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🚨 CityAlert Incidents (Polygon Amoy)</h1>

      {incidents.length === 0 && (
        <p className="text-gray-500 text-center">No incidents yet...</p>
      )}

      <div className="space-y-4 max-w-3xl mx-auto">
        {incidents.map((it) => (
          <div
            key={it.id}
            className="bg-white shadow-sm border border-gray-200 rounded-xl p-4"
          >
            <h2 className="font-semibold text-lg">
              #{it.id} — {it.category}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              📍 {it.pincode} | 👤 {it.creator?.slice(0, 6)}...{it.creator?.slice(-4)}
            </p>
            <p className="text-gray-700 mb-1">{it.description}</p>
            <p className="text-xs text-gray-400">
              🕒 {new Date(Number(it.timestamp) * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
