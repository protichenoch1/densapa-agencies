"use client";

import { useState } from "react";

export default function AdminPage() {
  const ADMIN_PIN = "123456";

  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin() {
    if (pin === ADMIN_PIN) {
      setLoggedIn(true);
    } else {
      alert("Wrong Admin PIN");
    }
  }

  if (!loggedIn) {
    return (
      <main className="container">
        <h1>🔐 Admin Login</h1>

        <input
          type="password"
          placeholder="Enter Admin PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <button
          className="invest-btn"
          style={{ marginTop: "15px" }}
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>🛠 Admin Dashboard</h1>

      <div className="announcement">
        <h3>Admin Panel</h3>

        <a
          href="/admin/deposits"
          style={{
            display: "block",
            marginTop: "10px",
            color: "#0A3D91",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          💰 Manage Deposits
        </a>

        <a
          href="/admin/withdrawals"
          style={{
            display: "block",
            marginTop: "10px",
            color: "#0A3D91",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          🏧 Manage Withdrawals
        </a>

        <a
          href="/admin/users"
          style={{
            display: "block",
            marginTop: "10px",
            color: "#0A3D91",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          👥 View Users
        </a>
      </div>
    </main>
  );
            }
