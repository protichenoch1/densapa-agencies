"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [tab, setTab] = useState("basic");

  const banners = [
  "🎉 Welcome to DENSAPAL AGENCIES",
  "💰 Deposit via Till Number 8808802",
  "👥 Earn KES 20 Per Successful Referral",
  "🏧 Minimum Withdrawal KES 450"
];

const [currentBanner, setCurrentBanner] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentBanner((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(timer);
}, []);
  
  const basicPlans = [
  {
    amount: "KES 420",
    daily: "KES 200",
    days: "3 Days",
    total: "KES 600"
  },
  {
    amount: "KES 2,000",
    daily: "KES 500",
    days: "7 Days",
    total: "KES 3,500"
  },
  {
    amount: "KES 5,000",
    daily: "KES 900",
    days: "10 Days",
    total: "KES 9,000"
  },
  {
    amount: "KES 10,000",
    daily: "KES 1,800",
    days: "15 Days",
    total: "KES 27,000"
  }
];

const vipPlans = [
  {
    amount: "KES 15,000",
    daily: "KES 2,000",
    days: "15 Days",
    total: "KES 30,000"
  },
  {
    amount: "KES 22,000",
    daily: "KES 2,200",
    days: "20 Days",
    total: "KES 44,000"
  },
  {
    amount: "KES 30,000",
    daily: "KES 2,600",
    days: "25 Days",
    total: "KES 65,000"
  },
  {
    amount: "KES 40,000",
    daily: "KES 3,000",
    days: "30 Days",
    total: "KES 90,000"
  }
];

  const plans = tab === "basic" ? basicPlans : vipPlans;

  return (
    <main className="container">

      <div className="header">
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }}
>
  <img
    src="/logo.png"
    alt="DENSAPAL"
    style={{
      width: "45px",
      height: "45px"
    }}
  />

  <div>
    <div style={{fontWeight:"bold"}}>
      DENSAPAL
    </div>

    <div
      style={{
        fontSize:"12px",
        color:"#D4AF37"
      }}
    >
      AGENCIES
    </div>
  </div>
</div>
        <div>🔔 👤</div>
      </div>

      <div className="balance-card">
  <p>Total Balance</p>
  <h1>KES 0.00</h1>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginTop: "15px"
    }}
  >
    <div>
      <small>Today's Earnings</small>
      <h3>KES 0</h3>
    </div>

    <div>
      <small>Active Plans</small>
      <h3>0</h3>
    </div>
  </div>
</div>

  <div className="banner-slide">
  {banners[currentBanner]}
</div>

<div
  style={{
    background: "#fff",
    padding: "15px",
    borderRadius: "15px",
    marginTop: "15px",
    marginBottom: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,.08)"
  }}
>
  <h3 style={{ color: "#0A3D91" }}>
    Welcome to DENSAPAL AGENCIES
  </h3>

  <p>
    Invest and earn daily with our Basic and VIP plans.
  </p>
</div>

      <div className="quick-actions">

        <a href="/deposit" className="action-card">
          <div style={{ fontSize: "28px" }}>💰</div>
          Deposit
        </a>

        <a href="/withdraw" className="action-card">
          <div style={{ fontSize: "28px" }}>🏧</div>
          Withdraw
        </a>

        <a href="/invite" className="action-card">
          <div style={{ fontSize: "28px" }}>👥</div>
          Invite
        </a>

        <a href="/records" className="action-card">
          <div style={{ fontSize: "28px" }}>📋</div>
          Records
        </a>

      </div>

      <div className="tabs">

        <button
          onClick={() => setTab("basic")}
          className={`tab ${tab === "basic" ? "active-tab" : ""}`}
        >
          BASIC
        </button>

        <button
          onClick={() => setTab("vip")}
          className={`tab ${tab === "vip" ? "vip-tab" : ""}`}
        >
          VIP
        </button>

      </div>

      {plans.map((plan, index) => (
        <div className="plan-card" key={index}>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}
          >

            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "15px",
                background:
                  tab === "basic"
                    ? "linear-gradient(135deg,#0A3D91,#1E5FD8)"
                    : "linear-gradient(135deg,#D4AF37,#FFD700)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "35px",
                color: "white"
              }}
            >
              {tab === "basic" ? "💰" : "👑"}
            </div>

            <div style={{ flex: 1 }}>

              <div className="plan-top">
                <h3>{plan.amount}</h3>

                <span className="badge">
                  {tab === "basic" ? "BASIC" : "VIP"}
                </span>
              </div>

              <p>Daily Income: {plan.daily}</p>
<p>Duration: {plan.days}</p>

<p
  style={{
    color: "#0A3D91",
    fontWeight: "bold",
    marginTop: "5px"
  }}
>
  Total Return: {plan.total}
</p>

            </div>

          </div>

         <a
  href={`/invest?amount=${encodeURIComponent(plan.amount)}&daily=${encodeURIComponent(plan.daily)}&days=${encodeURIComponent(plan.days)}&total=${encodeURIComponent(plan.total)}&type=${tab}`}
  className="invest-btn"
  style={{
    display: "block",
    textAlign: "center",
    textDecoration: "none"
  }}
>
  INVEST NOW
</a>

        </div>
      ))}

      <div className="stats">

        <div className="stat-card">
  <h2>KES 0</h2>
  <p>Total Deposits</p>
</div>

<div className="stat-card">
  <h2>KES 0</h2>
  <p>Total Withdrawals</p>
</div>

<div className="stat-card">
  <h2>KES 0</h2>
  <p>Referral Earnings</p>
</div>

<div className="stat-card">
  <h2>0</h2>
  <p>Active Plans</p>
</div>

      </div>

      <div className="announcement">
        <marquee>
          📢 Welcome to DENSAPAL AGENCIES |
          Deposit via Till Number 8808802 |
          Minimum Withdrawal KES 450 |
          Referral Bonus KES 20
        </marquee>
      </div>

      <div className="support-btn">
        💬
      </div>

      <div className="bottom-nav">

        <div>
          <span>🏠</span>
          Home
        </div>

        <a
  href="/team"
  style={{
    textDecoration: "none",
    color: "inherit",
    textAlign: "center"
  }}
>
  <span>👥</span>
  Team
</a>

        <a
  href="/wallet"
  style={{
    textDecoration: "none",
    color: "inherit",
    textAlign: "center"
  }}
>
  <span>💳</span>
  Wallet
</a>

        <a
          href="/account"
          style={{
            textDecoration: "none",
            color: "inherit",
            textAlign: "center"
          }}
        >
          <span>👤</span>
          Account
        </a>

      </div>

    </main>
  );
    }
