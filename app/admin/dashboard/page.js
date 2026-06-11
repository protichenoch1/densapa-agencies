"use client";

export default function AdminDashboard() {
  return (
    <main className="container">
      <h1>🛠 Admin Dashboard</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        <a
          href="/admin/deposits"
          className="invest-btn"
          style={{
            textDecoration: "none",
            textAlign: "center"
          }}
        >
          💰 Manage Deposits
        </a>

        <a
          href="/admin/withdrawals"
          className="invest-btn"
          style={{
            textDecoration: "none",
            textAlign: "center"
          }}
        >
          🏧 Manage Withdrawals
        </a>

        <a
          href="/admin/users"
          className="invest-btn"
          style={{
            textDecoration: "none",
            textAlign: "center"
          }}
        >
          👥 View Users
        </a>

        <a
          href="/admin/stats"
          className="invest-btn"
          style={{
            textDecoration: "none",
            textAlign: "center"
          }}
        >
          📊 Statistics
        </a>
      </div>
    </main>
  );
              }
