"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";

export default function Records() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
  async function loadInvestments() {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.id) return;

    const { data } = await supabase
      .from("investments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    setInvestments(data || []);
  }

  loadInvestments();
}, []);

  return (
    <main className="container">
      <h2
        style={{
          color: "#0A3D91",
          marginBottom: "20px"
        }}
      >
        📋 Investment Records
      </h2>

      {investments.length === 0 ? (
        <div className="stat-card">
          <p>No investments found.</p>
        </div>
      ) : (
        investments.map((item, index) => (
  <div
    key={index}
    className="plan-card"
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}
    >
      <img
  src="/plans/basic1.jpg"
  alt="Investment"
  style={{
    width: "90px",
    height: "90px",
    borderRadius: "15px",
    objectFit: "cover"
  }}
/>

      <div style={{ flex: 1 }}>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  }}
>
  <span
  style={{
    background:
      item.status === "completed"
        ? "#0A3D91"
        : "#28a745",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold"
  }}
>
  {item.status?.toUpperCase()}
</span>

  <span className="badge">
  {item.plan_type}
</span>
</div>

  <h3>
  KES {Number(item.amount).toLocaleString()}
</h3>

<p>
  Daily Income: KES {Number(item.daily_income).toLocaleString()}
</p>

<p>
  Duration: {item.days} Days
</p>

<p
  style={{
    color: "#0A3D91",
    fontWeight: "bold"
  }}
>
  Total Return: KES {Number(item.total_return).toLocaleString()}
</p>

<p
  style={{
    fontSize: "12px",
    color: "#666"
  }}
>
  Date:
  {" "}
  <p>
  Date:{" "}
  {new Date(item.created_at).toLocaleDateString(
    "en-KE",
    {
      timeZone: "Africa/Nairobi"
    }
  )}
</p>

<p>
  Time:{" "}
  {new Date(item.created_at + "Z").toLocaleTimeString(
    "en-KE",
    {
      timeZone: "Africa/Nairobi",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }
  )}
</p>
</p>
      </div>
    </div>
  </div>
   ))
  )}

      <BottomNav />
    </main>
  );
          }
