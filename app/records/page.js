"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";

export default function MyInvestments() {
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
      <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px"
  }}
>
  <button
    onClick={() => window.history.back()}
    style={{
      border: "none",
      background: "transparent",
      color: "#0A3D91",
      fontSize: "14px",
      fontWeight: "bold"
    }}
  >
    ← Back
  </button>

  <h2
    style={{
      margin: 0,
      fontSize: "18px",
      color: "#0A3D91"
    }}
  >
    📈 My Investments
  </h2>

  <div style={{ width: "50px" }}></div>
</div>

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
      item.status === "Completed"
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

  <p>
  Earnings Paid: {item.earnings_paid || 0} Days
</p>

<p>
  Days Remaining:{" "}
  {Number(item.days) - Number(item.earnings_paid || 0)} Days
</p>

<p>
  Earnings Received: KES{" "}
  {(
    Number(item.daily_income) *
    Number(item.earnings_paid || 0)
  ).toLocaleString()}
</p>

<p
  style={{
    fontSize: "12px",
    color: "#666"
  }}
>
  
  <p>
  <p>
  Date:{" "}
  {new Date(item.created_at + "Z").toLocaleDateString(
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
