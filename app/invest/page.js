"use client";

import { useSearchParams } from "next/navigation";

export default function InvestPage() {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount") || "KES 0";
  const daily = searchParams.get("daily") || "KES 0";
  const days = searchParams.get("days") || "0 Days";
  const total = searchParams.get("total") || "KES 0";
  const type = searchParams.get("type") || "basic";

  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        💼 Investment Details
      </h1>

      <div className="plan-card">

        <div
          style={{
            textAlign: "center",
            marginBottom: "15px"
          }}
        >
          <span
            className="badge"
            style={{
              fontSize: "14px",
              padding: "8px 16px"
            }}
          >
            {type.toUpperCase()} PLAN
          </span>
        </div>

        <h2>{amount}</h2>

        <p style={{ marginTop: "10px" }}>
          💰 Daily Income: {daily}
        </p>

        <p>
          ⏳ Duration: {days}
        </p>

        <p
          style={{
            color: "#0A3D91",
            fontWeight: "bold",
            marginTop: "10px"
          }}
        >
          🎯 Total Return: {total}
        </p>

      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Wallet Balance</h3>

        <h2
          style={{
            color: "#0A3D91",
            marginTop: "10px"
          }}
        >
          KES 0.00
        </h2>

        <p style={{ marginTop: "10px" }}>
          Deposit funds before investing.
        </p>
      </div>

      <button
        className="invest-btn"
        style={{
          marginTop: "20px"
        }}
      >
        CONFIRM INVESTMENT
      </button>

    </main>
  );
}
