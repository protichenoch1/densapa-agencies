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
          <p>Amount: KES {deposit.amount}</p>
          <p>Status: {deposit.status}</p>
          <p>Phone: {deposit.phone_number}</p>

          <button
            className="invest-btn"
            onClick={() => approveDeposit(deposit)}
          >
            APPROVE
          </button>

          <button
            onClick={() => rejectDeposit(deposit)}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              background: "#dc3545",
              color: "#fff"
            }}
          >
            REJECT
          </button>
        </div>
      ))}
    </main>
  );
          }
