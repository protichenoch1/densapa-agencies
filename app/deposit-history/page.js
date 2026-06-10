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
        deposits.map((deposit) => (
          <div
            key={deposit.id}
            className="announcement"
            style={{ marginTop: "15px" }}
          >
            <p>
              <strong>Amount:</strong> KES {deposit.amount}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {deposit.status === "Approved"
                ? "🟢 Approved"
                : deposit.status === "Rejected"
                ? "🔴 Rejected"
                : "🟡 Pending"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                deposit.created_at
              ).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </main>
  );
                  }
