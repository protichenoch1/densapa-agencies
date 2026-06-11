"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    loadWithdrawals();
  }, []);

  async function loadWithdrawals() {
    const { data } = await supabase
      .from("withdrawals")
      .select("*")
      .order("created_at", { ascending: false });

    setWithdrawals(data || []);
  }

  async function approveWithdrawal(withdrawal) {
  const { error } = await supabase
    .from("withdrawals")
    .update({
      status: "SUCCESSFUL",
    })
    .eq("id", withdrawal.id);

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

  alert("Withdrawal approved successfully");
  loadWithdrawals();
  }

   function rejectWithdrawal(withdrawal) {
    if (withdrawal.status === "FAILED") return;

    const { dataasync: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", withdrawal.user_id)
      .single();

    const refundedBalance =
      Number(user.balance || 0) +
      Number(withdrawal.amount);

    await supabase
      .from("users")
      .update({
        balance: refundedBalance,
      })
      .eq("id", user.id);

    const { error } = await supabase
  .from("withdrawals")
  .update({
    status: "FAILED",
  })
  .eq("id", withdrawal.id);

if (error) {
  alert(error.message);
  console.log(error);
  return;
}

alert("Withdrawal rejected successfully");

loadWithdrawals();
  }

  return (
    <main className="container">
      <h1>🏧 Manage Withdrawals</h1>

      {withdrawals.map((withdrawal) => (
        <div
          key={withdrawal.id}
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
            <span>
              KES {Number(withdrawal.amount).toLocaleString()}
            </span>
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
      withdrawal.status === "SUCCESSFUL"
        ? "#28a745"
        : withdrawal.status === "FAILED"
        ? "#dc3545"
        : "#D4AF37",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold"
  }}
>
  {withdrawal.status}
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
            <span>{withdrawal.phone_number}</span>
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
              {new Date(
                withdrawal.created_at + "Z"
              ).toLocaleString("en-KE", {
                timeZone: "Africa/Nairobi"
              })}
            </span>
          </div>

       {withdrawal.status === "PENDING" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "70px"
            }}
          >
            <button
              style={{
                width: "100px",
                padding: "8px",
                border: "none",
                borderRadius: "8px",
                background: "#28a745",
                color: "#fff",
                fontWeight: "bold"
              }}
              onClick={() =>
                approveWithdrawal(withdrawal)
              }
            >
              APPROVE
            </button>

            <button
              style={{
                width: "100px",
                padding: "8px",
                border: "none",
                borderRadius: "8px",
                background: "#dc3545",
                color: "#fff",
                fontWeight: "bold"
              }}
              onClick={() =>
                rejectWithdrawal(withdrawal)
              }
            >
              REJECT
            </button>
          </div>
             )}
        </div>
      ))}
    </main>
  );
    }
