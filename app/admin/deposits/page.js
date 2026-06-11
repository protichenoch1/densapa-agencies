"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminDeposits() {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    loadDeposits();
  }, []);

  async function loadDeposits() {
    const { data } = await supabase
      .from("deposits")
      .select("*")
      .order("created_at", { ascending: false });

    setDeposits(data || []);
  }

  async function approveDeposit(deposit) {
    if (deposit.status === "SUCCESSFUL") return;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", deposit.user_id)
      .single();

    const newBalance =
      Number(user.balance || 0) +
      Number(deposit.amount);

    await supabase
      .from("users")
      .update({
        balance: newBalance,
      })
      .eq("id", user.id);

    await supabase
      .from("deposits")
      .update({
        status: "SUCCESSFUL",
      })
      .eq("id", deposit.id);

    loadDeposits();
  }

  async function rejectDeposit(deposit) {
    await supabase
      .from("deposits")
      .update({
        status: "FAILED",
      })
      .eq("id", deposit.id);

    loadDeposits();
  }

  return (
    <main className="container">
      <h1>💰 Manage Deposits</h1>

      {deposits.map((deposit) => (
        <div
  key={deposit.id}
  className="announcement"
  style={{ marginBottom: "15px" }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px"
    }}
  >
    <span><strong>Amount:</strong></span>
    <span>KES {Number(deposit.amount).toLocaleString()}</span>
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px"
    }}
  >
    <span><strong>Status:</strong></span>
    <span
  style={{
    background:
      deposit.status === "SUCCESSFUL"
        ? "#28a745"
        : deposit.status === "FAILED"
        ? "#dc3545"
        : "#D4AF37",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold"
  }}
>
  {deposit.status}
</span>
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px"
    }}
  >
    <span><strong>Phone:</strong></span>
    <span>{deposit.phone_number}</span>
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px"
    }}
  >
    <span><strong>Submitted:</strong></span>
    <span>
      {new Date(deposit.created_at).toLocaleString(
        "en-KE",
        {
          timeZone: "Africa/Nairobi"
        }
      )}
    </span>
  </div>

  <div
  style={{
    display: "flex",
    gap: "70px"
  }}
>
  <button
    style={{
      width: "90px",
      padding: "8px",
      border: "none",
      borderRadius: "8px",
      background: "#28a745",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "12px"
    }}
    onClick={() => approveDeposit(deposit)}
  >
    APPROVE
  </button>

  <button
    style={{
      width: "90px",
      padding: "8px",
      border: "none",
      borderRadius: "8px",
      background: "#dc3545",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "12px"
    }}
    onClick={() => rejectDeposit(deposit)}
  >
    REJECT
  </button>
</div>
</div>
      ))}
    </main>
  );
          }
