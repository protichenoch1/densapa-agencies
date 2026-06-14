"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const ADMIN_PIN = "123456";

  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [usersCount, setUsersCount] = useState(0);
  const [depositsCount, setDepositsCount] = useState(0);
  const [withdrawalsCount, setWithdrawalsCount] = useState(0);
  const [investmentsCount, setInvestmentsCount] = useState(0);
  const [pendingDeposits, setPendingDeposits] = useState(0);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(0);

  function handleLogin() {
    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
    } else {
      alert("Wrong Admin PIN");
    }
  }

  useEffect(() => {
    if (!loggedIn) return;

    async function loadStats() {
      const { count: users } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      setUsersCount(users || 0);

      const { count: deposits } = await supabase
        .from("deposits")
        .select("*", { count: "exact", head: true });

      setDepositsCount(deposits || 0);

      const { count: withdrawals } = await supabase
        .from("withdrawals")
        .select("*", { count: "exact", head: true });

      setWithdrawalsCount(withdrawals || 0);

      const { count: investments } = await supabase
        .from("investments")
        .select("*", { count: "exact", head: true });

      setInvestmentsCount(investments || 0);

      const { count: pendingDep } = await supabase
        .from("deposits")
        .select("*", { count: "exact", head: true })
        .eq("status", "PENDING");

      setPendingDeposits(pendingDep || 0);

      const { count: pendingWith } = await supabase
        .from("withdrawals")
        .select("*", { count: "exact", head: true })
        .eq("status", "PENDING");

      setPendingWithdrawals(pendingWith || 0);
    }

    loadStats();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#0A3D91,#06275e)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px"
        }}
      >
        <div
          style={{
            background: "#fff",
            width: "100%",
            maxWidth: "400px",
            padding: "30px",
            borderRadius: "25px"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "#0A3D91" }}>
              🔐 ADMIN PANEL
            </h1>

            <p style={{ color: "#D4AF37", fontWeight: "bold" }}>
              DENSAPAL AGENCIES
            </p>
          </div>

          <div
            style={{
              position: "relative",
              marginTop: "20px"
            }}
          >
            <input
              type={showPin ? "text" : "password"}
              placeholder="Enter Admin PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #ddd"
              }}
            />

            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "none",
                cursor: "pointer"
              }}
            >
              {showPin ? "Hide" : "Show"}
            </button>
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "20px",
              border: "none",
              borderRadius: "12px",
              background: "#D4AF37",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="container">

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg,#0A3D91,#06275e)",
          color: "#fff",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px"
        }}
      >
        <h1>🛠 Admin Dashboard</h1>

        <p
          style={{
            color: "#D4AF37",
            marginTop: "10px"
          }}
        >
          Welcome Administrator
        </p>
      </div>

      {/* Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "12px"
        }}
      >
        <div className="stat-card">
          <h2>{usersCount}</h2>
          <p>Users</p>
        </div>

        <div className="stat-card">
          <h2>{depositsCount}</h2>
          <p>Deposits</p>
        </div>

        <div className="stat-card">
          <h2>{withdrawalsCount}</h2>
          <p>Withdrawals</p>
        </div>

        <div className="stat-card">
          <h2>{investmentsCount}</h2>
          <p>Investments</p>
        </div>

        <div className="stat-card">
          <h2>{pendingDeposits}</h2>
          <p>Pending Deposits</p>
        </div>

        <div className="stat-card">
          <h2>{pendingWithdrawals}</h2>
          <p>Pending Withdrawals</p>
        </div>
      </div>

    </main>
  );
                }
