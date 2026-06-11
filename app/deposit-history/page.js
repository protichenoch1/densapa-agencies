"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function DepositHistory() {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    async function loadDeposits() {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user.id) return;

      const { data } = await supabase
        .from("deposits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setDeposits(data || []);
    }

    loadDeposits();
  }, []);

  return (
    <main className="container">
      <h1>💰 Deposit History</h1>

      {deposits.length === 0 ? (
        <p style={{ marginTop: "20px" }}>
          No deposits found.
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
    </div>

    {deposits.map((deposit) => (
      <div
        key={deposit.id}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          padding: "12px",
          borderBottom: "1px solid #eee",
          alignItems: "center",
          fontSize: "11px"
        }}
      >
        <span>KES {deposit.amount}</span>

        <span>
          {new Date(deposit.created_at + "Z")
            .toLocaleDateString("en-KE")}
        </span>

        <span>
          {new Date(deposit.created_at + "Z")
            .toLocaleTimeString("en-KE", {
              timeZone: "Africa/Nairobi",
              hour: "numeric",
              minute: "2-digit",
              hour12: true
            })}
        </span>

        <span
  style={{
    background:
      deposit.status === "Approved"
        ? "#28a745"
        : deposit.status === "Rejected"
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
  {deposit.status === "Approved"
    ? "SUCCESSFUL"
    : deposit.status === "Rejected"
    ? "FAILED"
    : "PENDING"}
</span>
      </div>
    ))}
  </>
)}
    </main>
  );
                  }
