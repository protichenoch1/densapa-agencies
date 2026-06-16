"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const ADMIN_PIN = "123456";

  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [usersCount, setUsersCount] = useState(0);
  const [depositsCount, setDepositsCount] = useState(0);
  const [withdrawalsCount, setWithdrawalsCount] = useState(0);
  const [investmentsCount, setInvestmentsCount] = useState(0);
  const [pendingDeposits, setPendingDeposits] = useState(0);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(0);

  const [totalBalance, setTotalBalance] = useState(0);
const [totalDeposited, setTotalDeposited] = useState(0);
const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  async function handleLogin() {
  setLoading(true);

  setTimeout(() => {
    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
    } else {
      alert("Wrong Admin PIN");
    }

    setLoading(false);
  }, 1500);
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

      // Total balance
const { data: usersData } = await supabase
  .from("users")
  .select("balance");

setTotalBalance(
  usersData?.reduce(
    (sum, user) => sum + Number(user.balance || 0),
    0
  ) || 0
);

// Total deposited
const { data: depositsData } = await supabase
  .from("deposits")
  .select("amount")
  .eq("status", "SUCCESSFUL");

setTotalDeposited(
  depositsData?.reduce(
    (sum, deposit) => sum + Number(deposit.amount || 0),
    0
  ) || 0
);

// Total withdrawn
const { data: withdrawalsData } = await supabase
  .from("withdrawals")
  .select("amount")
  .eq("status", "SUCCESSFUL");

setTotalWithdrawn(
  withdrawalsData?.reduce(
    (sum, withdrawal) => sum + Number(withdrawal.amount || 0),
    0
  ) || 0
);
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

{loading && (
  <div
    style={{
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #0A3D91",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      animation: "spin 1s linear infinite",
      margin: "20px auto"
    }}
  />
)}
  
  <button
  onClick={handleLogin}
  disabled={loading}
  style={{
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    border: "none",
    borderRadius: "12px",
    background: "#D4AF37",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  {loading ? "⏳ Logging in..." : "LOGIN"}
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
          marginTop: "10px",
          color: "#D4AF37"
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
    gap: "12px",
    marginBottom: "20px"
  }}
>

  {/* Users */}
  <div
    className="stat-card"
    style={{
      background: "#0A3D91",
      color: "#fff"
    }}
  >
    <h2 style={{ color: "#fff" }}>
  {usersCount}
</h2>
    <p>👥 Users</p>
  </div>

  {/* Total Balance */}
  <div
    className="stat-card"
    style={{
      background: "#198754",
      color: "#fff"
    }}
  >
    <h2>KES {totalBalance.toLocaleString()}</h2>
    <p>💳 Total Balance</p>
  </div>

  {/* Total Deposited */}
  <div
    className="stat-card"
    style={{
      background: "#28a745",
      color: "#fff"
    }}
  >
    <h2>KES {totalDeposited.toLocaleString()}</h2>
    <p>💰 Total Deposited</p>
  </div>

  {/* Total Withdrawn */}
  <div
    className="stat-card"
    style={{
      background: "#fd7e14",
      color: "#fff"
    }}
  >
    <h2>KES {totalWithdrawn.toLocaleString()}</h2>
    <p>🏧 Total Withdrawn</p>
  </div>

  {/* Investments */}
  <div
    className="stat-card"
    style={{
      background: "#6f42c1",
      color: "#fff"
    }}
  >
    <h2 style={{ color: "#fff" }}>
  {investmentsCount}
</h2>
    <p>📈 Investments</p>
  </div>

  {/* Pending Deposits */}
  <div
    className="stat-card"
    style={{
      background: "#D4AF37",
      color: "#000"
    }}
  >
    <h2>{pendingDeposits}</h2>
    <p>⏳ Pending Deposits</p>
  </div>

  {/* Pending Withdrawals */}
  <div
    className="stat-card"
    style={{
      background: "#dc3545",
      color: "#fff"
    }}
  >
    <h2 style={{ color: "#fff" }}>
  {pendingWithdrawals}
</h2>
    <p>⏳ Pending Withdrawals</p>
  </div>

</div>

      {/* Management Buttons */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "15px",
    marginTop: "20px"
  }}
>

  <a href="/admin/deposits" className="stat-card">
    <h1>💰</h1>
    <h3>Deposits</h3>
    <p>Manage requests</p>
  </a>

  <a href="/admin/withdrawals" className="stat-card">
    <h1>🏧</h1>
    <h3>Withdrawals</h3>
    <p>Approve requests</p>
  </a>

  <a href="/admin/users" className="stat-card">
    <h1>👥</h1>
    <h3>Users</h3>
    <p>View members</p>
  </a>

  <a href="/admin/stats" className="stat-card">
    <h1>📊</h1>
    <h3>Statistics</h3>
    <p>View reports</p>
  </a>

  <a href="/admin/support" className="stat-card">
  <h1>💬</h1>
  <h3>Support</h3>
  <p>Customer chats</p>
</a>

</div>

  <div className="announcement" style={{ marginTop: "20px" }}>
  <h3>⚙ Quick Actions</h3>

  <a
    href="/"
    style={{
      display: "block",
      marginTop: "15px",
      color: "#0A3D91",
      fontWeight: "bold"
    }}
  >
    🏠 Go to Home Page
  </a>

  <button
    onClick={() => {
      setLoggedIn(false);
      setPin("");
    }}
    style={{
      width: "100%",
      marginTop: "20px",
      padding: "12px",
      border: "none",
      borderRadius: "12px",
      background: "#dc3545",
      color: "#fff",
      fontWeight: "bold"
    }}
  >
    🚪 Logout
  </button>
</div>

  </main>
);
                }
