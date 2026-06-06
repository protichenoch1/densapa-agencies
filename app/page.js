"use client";

import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const [tab, setTab] = useState("basic");
const [selectedPlan, setSelectedPlan] = useState(null);
const [showModal, setShowModal] = useState(false);
  
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);

  return () => clearTimeout(timer);
}, []);
  
  const userName = "Enock";

const greeting =
  new Date().getHours() < 12
    ? "Good Morning"
    : new Date().getHours() < 18
    ? "Good Afternoon"
    : "Good Evening";
  
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
    image: "/plans/basic1.jpg",
    amount: "KES 420",
    daily: "KES 200",
    days: "3 Days",
    total: "KES 600"
  },
  {
    image: "/plans/basic2.jpg",
    amount: "KES 2,000",
    daily: "KES 500",
    days: "7 Days",
    total: "KES 3,500"
  },
  {
    image: "/plans/basic3.jpg",
    amount: "KES 5,000",
    daily: "KES 900",
    days: "10 Days",
    total: "KES 9,000"
  },
  {
    image: "/plans/basic4.jpg",
    amount: "KES 10,000",
    daily: "KES 1,800",
    days: "15 Days",
    total: "KES 27,000"
  }
];

const vipPlans = [
  {
    image: "/plans/vip1.jpg",
    amount: "KES 15,000",
    daily: "KES 2,000",
    days: "15 Days",
    total: "KES 30,000"
  },
  {
    image: "/plans/vip2.jpg",
    amount: "KES 22,000",
    daily: "KES 2,200",
    days: "20 Days",
    total: "KES 44,000"
  },
  {
    image: "/plans/vip3.jpg",
    amount: "KES 30,000",
    daily: "KES 2,600",
    days: "25 Days",
    total: "KES 65,000"
  },
  {
    image: "/plans/vip4.jpg",
    amount: "KES 40,000",
    daily: "KES 3,000",
    days: "30 Days",
    total: "KES 90,000"
  }
];

  const plans = tab === "basic" ? basicPlans : vipPlans;

if (loading) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#0A3D91,#06275e)"
      }}
    >
      <img
        src="/logo.png"
        alt="DENSAPAL"
        style={{
          width: "100px",
          height: "100px"
        }}
      />

      <h1 style={{ color: "#fff" }}>
        DENSAPAL
      </h1>

      <p style={{ color: "#D4AF37" }}>
        AGENCIES
      </p>
    </div>
  );
}

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
        height: "45px",
        borderRadius: "50%"
      }}
    />

    <div>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          color: "#0A3D91"
        }}
      >
        DENSAPAL
      </div>

      <div
        style={{
          fontSize: "11px",
          color: "#D4AF37",
          letterSpacing: "2px"
        }}
      >
        AGENCIES
      </div>
    </div>
  </div>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "15px"
    }}
  >
    <a
      href="/notifications"
      style={{
        textDecoration: "none"
      }}
    >
      <div
        style={{
          position: "relative",
          fontSize: "22px"
        }}
      >
        🔔

        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-8px",
            background: "#D4AF37",
            color: "#000",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            fontSize: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}
        >
          4
        </span>
      </div>
    </a>

    <div
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "#0A3D91",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
      }}
    >
      U
    </div>

</div>
      </div>
<div
  style={{
    marginBottom: "15px"
  }}
>
  <h2
    style={{
      color: "#0A3D91",
      fontSize: "22px",
      fontWeight: "bold"
    }}
  >
    {greeting}, {userName} 👋
  </h2>

  <p
    style={{
      color: "#666",
      fontSize: "14px"
    }}
  >
    Welcome back
  </p>
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
          <div style={{ fontSize: "20px" }}>💰</div>
          Deposit
        </a>

        <a href="/withdraw" className="action-card">
          <div style={{ fontSize: "20px" }}>🏧</div>
          Withdraw
        </a>

        <a href="/invite" className="action-card">
          <div style={{ fontSize: "20px" }}>👥</div>
          Invite
        </a>

        <a href="/records" className="action-card">
          <div style={{ fontSize: "20px" }}>📋</div>
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
<div className="plans-container" key={tab}>
            
      {plans.map((plan, index) => (
        <div className="plan-card" key={index}>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}
          >

            <img
  src={plan.image}
  alt={plan.amount}
  style={{
    width: "90px",
    height: "90px",
    borderRadius: "15px",
    objectFit: "cover"
  }}
/>

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

         <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "15px"
  }}
>
  <button
  className="invest-btn"
  style={{
    width: "120px"
  }}
  onClick={() => {
    setSelectedPlan({
      ...plan,
      type: tab.toUpperCase()
    });
    setShowModal(true);
  }}
>
  INVEST NOW
</button>
</div>
</div>
      ))}
        </div>

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


      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        width: "90%",
        maxWidth: "350px"
      }}
    >
      <h2>💼 Confirm Investment</h2>

      <p><strong>Plan:</strong> {selectedPlan.type}</p>
      <p><strong>Amount:</strong> {selectedPlan.amount}</p>
      <p><strong>Daily Income:</strong> {selectedPlan.daily}</p>
      <p><strong>Duration:</strong> {selectedPlan.days}</p>
      <p><strong>Total Return:</strong> {selectedPlan.total}</p>

      <button
        className="invest-btn"
        style={{ marginTop: "15px" }}
        onClick={() => {
  const investments = JSON.parse(
    localStorage.getItem("investments") || "[]"
  );

  investments.push({
    ...selectedPlan,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem(
    "investments",
    JSON.stringify(investments)
  );

  alert("Investment submitted successfully!");
  setShowModal(false);
}}
      >
        CONFIRM INVESTMENT
      </button>

      <button
        onClick={() => setShowModal(false)}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          border: "none",
          borderRadius: "10px"
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
  <BottomNav />
    </main>
  );
    }
