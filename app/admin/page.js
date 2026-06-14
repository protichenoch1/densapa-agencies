"use client";

import { useState } from "react";

export default function AdminPage() {
  const ADMIN_PIN = "123456";

  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
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
          borderRadius: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,.2)"
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          <img
            src="/logo.png"
            alt="DENSAPAL"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%"
            }}
          />

          <h1
            style={{
              color: "#0A3D91",
              marginTop: "10px"
            }}
          >
            ADMIN PANEL
          </h1>

          <p
            style={{
              color: "#D4AF37",
              fontWeight: "bold"
            }}
          >
            DENSAPAL AGENCIES
          </p>
        </div>

        <div
  style={{
    position: "relative"
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
      paddingRight: "70px",
      border: "1px solid #ddd",
      borderRadius: "12px",
      outline: "none"
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
      cursor: "pointer",
      color: "#0A3D91",
      fontWeight: "bold"
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
            marginTop: "15px",
            border: "none",
            borderRadius: "12px",
            background: "#D4AF37",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer"
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

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "15px"
      }}
    >

      <a
        href="/admin/deposits"
        className="stat-card"
        style={{
          textDecoration: "none",
          color: "#000"
        }}
      >
        <h1>💰</h1>
        <h3>Deposits</h3>
        <p>Manage requests</p>
      </a>

      <a
        href="/admin/withdrawals"
        className="stat-card"
        style={{
          textDecoration: "none",
          color: "#000"
        }}
      >
        <h1>🏧</h1>
        <h3>Withdrawals</h3>
        <p>Approve requests</p>
      </a>

      <a
        href="/admin/users"
        className="stat-card"
        style={{
          textDecoration: "none",
          color: "#000"
        }}
      >
        <h1>👥</h1>
        <h3>Users</h3>
        <p>View members</p>
      </a>

      <a
        href="/admin/investments"
        className="stat-card"
        style={{
          textDecoration: "none",
          color: "#000"
        }}
      >
        <h1>📈</h1>
        <h3>Investments</h3>
        <p>View plans</p>
      </a>

    </div>

    <div
      className="announcement"
      style={{
        marginTop: "20px"
      }}
    >
      <h3>⚙ Quick Actions</h3>

      <a
        href="/"
        style={{
          display: "block",
          marginTop: "15px",
          color: "#0A3D91",
          textDecoration: "none",
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
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        🚪 Logout
      </button>
    </div>

  </main>
);
            }
