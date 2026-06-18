"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";

export default function Wallet() {
  const [investments, setInvestments] = useState([]);
  const [user, setUser] = useState(null);
  
const totalInvested = investments.reduce(
  (sum, plan) => sum + Number(plan.amount || 0),
  0
);

const totalDailyIncome = investments.reduce(
  (sum, plan) => sum + Number(plan.daily_income || 0),
  0
);
  
  useEffect(() => {
  async function loadUser() {
    const savedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!savedUser.id) return;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", savedUser.id)
      .single();

    if (!error && data) {
      setUser(data);

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );
    }
  }

  loadUser();
    }, []);

  useEffect(() => {
  async function loadInvestments() {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("investments")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "Active");

    if (!error) {
      setInvestments(data || []);
    }
  }

  loadInvestments();
}, [user]);

  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        💳 My Wallet
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        <img
          src="/wallet.png"
          alt="Wallet"
          style={{
            width: "45px",
            height: "45px"
          }}
        />
      </div>

      <div className="balance-card">
        <p>Available Balance</p>
        <h1>
  KES {(user?.balance || 0).toLocaleString()}
</h1>
        <p>Last Updated: Today</p>
      </div>

  <a href="/earnings" className="action-card">
  <div style={{ fontSize: "20px" }}>💸</div>
  Earnings
</a>

      <div className="stats">

        <div className="stat-card">
          <h2>
  KES {(user?.total_withdrawals || 0).toLocaleString()}
</h2>
          <p>Total Withdrawals</p>
        </div>

        <div className="stat-card">
          <h2>{investments.length}</h2>
          <p>Active Plans</p>
        </div>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginTop: "20px"
        }}
      >
        <a
          href="/deposit"
          className="invest-btn"
          style={{
            textDecoration: "none",
            textAlign: "center"
          }}
        >
          💰 Deposit
        </a>

        <a
          href="/withdraw"
          className="invest-btn"
          style={{
            textDecoration: "none",
            textAlign: "center"
          }}
        >
          🏧 Withdraw
        </a>
       </div>
            
<BottomNav />
    </main>
  );
          }
