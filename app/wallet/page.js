"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

export default function Wallet() {
  const [investments, setInvestments] = useState([]);
  const [user, setUser] = useState(null);
  
const totalInvested = investments.reduce(
  (sum, plan) =>
    sum + Number(plan.amount.replace(/[^0-9]/g, "")),
  0
);

const totalDailyIncome = investments.reduce(
  (sum, plan) =>
    sum + Number(plan.daily.replace(/[^0-9]/g, "")),
  0
);
  
  useEffect(() => {
  const savedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  setUser(savedUser);

  const savedInvestments = JSON.parse(
    localStorage.getItem("investments") || "[]"
  );

  setInvestments(savedInvestments);
}, []);

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
  KES {(user?.wallet_balance || 0).toLocaleString()}
</h1>
        <p>Last Updated: Today</p>
      </div>

      <div className="stats">

        <div className="stat-card">
          <h2>KES {totalInvested.toLocaleString()}</h2>
<p>Total Invested</p>
        </div>

        <div className="stat-card">
          <h2>
  KES {(user?.total_withdrawals || 0).toLocaleString()}
</h2>
          <p>Total Withdrawals</p>
        </div>

        <div className="stat-card">
         <h2>KES {totalDailyIncome.toLocaleString()}</h2>
<p>Daily Earnings</p>
        </div>

        <div className="stat-card">
          <h2>{investments.length}</h2>
          <p>Active Plans</p>
        </div>

      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>📈 Active Investments</h3>

        {investments.length === 0 ? (
          <p style={{ marginTop: "10px" }}>
            No active investments.
          </p>
        ) : (
          investments.map((plan, index) => (
            <div
              key={index}
              style={{
                marginTop: "15px",
                padding: "10px",
                background: "#f5f7fb",
                borderRadius: "10px"
              }}
            >
              <p><strong>Plan:</strong> {plan.type}</p>
              <p><strong>Amount:</strong> {plan.amount}</p>
              <p><strong>Daily Income:</strong> {plan.daily}</p>
              <p><strong>Duration:</strong> {plan.days}</p>
              <p><strong>Total Return:</strong> {plan.total}</p>
                          <p>
  <strong>Status:</strong>
  <span style={{ color: "green" }}>
    {" "}🟢 Active
  </span>
</p>
              <p><strong>Date:</strong> {plan.date}</p>
            </div>
          ))
        )}
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
