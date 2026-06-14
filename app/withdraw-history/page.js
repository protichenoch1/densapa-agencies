"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function WithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    async function loadWithdrawals() {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user.id) return;

      const { data } = await supabase
        .from("withdrawals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      setWithdrawals(data || []);
    }

    loadWithdrawals();
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
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    ← Back
  </button>

  <h2
    style={{
      margin: 0,
      fontSize: "18px",
      color: "#0A3D91",
      fontWeight: "bold"
    }}
  >
    Withdrawal History
  </h2>

  <div style={{ width: "50px" }}></div>
</div>

      {withdrawals.length === 0 ? (

  <p style={{ marginTop: "20px" }}>
    No withdrawals found.
  </p>
) : (
  <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        padding: "12px",
        fontWeight: "bold",
        fontSize: "11px",
        background: "#f5f5f5"
      }}
    >
      <span>Amount</span>
      <span>Date</span>
      <span>Time</span>
      <span>Status</span>
    </div>{withdrawals.map((item) => (
  <div
    key={item.id}
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      padding: "12px",
      borderBottom: "1px solid #eee",
      alignItems: "center",
      fontSize: "11px"
    }}
  >
    <span>
      KES {Number(item.amount).toLocaleString()}
    </span>

    <span>
      {new Date(item.created_at + "Z").toLocaleDateString("en-KE")}
    </span>

    <span>
      {new Date(item.created_at + "Z").toLocaleTimeString(
        "en-KE",
        {
          timeZone: "Africa/Nairobi",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }
      )}
    </span>

    <span
      style={{
        background:
          item.status === "SUCCESSFUL"
            ? "#28a745"
            : item.status === "FAILED"
            ? "#dc3545"
            : "#D4AF37",
        color: "#fff",
        padding: "3px 8px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: "bold",
        textAlign: "center",
        display: "inline-block"
      }}
    >
      {item.status}
    </span>
  </div>
))}

</>
)}
    </main>
  );
          }
