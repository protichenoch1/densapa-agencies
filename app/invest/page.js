"use client";

import { useSearchParams } from "next/navigation";

export default function InvestPage() {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const daily = searchParams.get("daily");
  const days = searchParams.get("days");
  const total = searchParams.get("total");
  const type = searchParams.get("type");

  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        💼 Investment Details
      </h1>

      <div className="plan-card">
        <h2>{type?.toUpperCase()} PLAN</h2>

        <p style={{ marginTop: "10px" }}>
          <strong>Investment Amount:</strong> {amount}
        </p>

        <p>
          <strong>Daily Income:</strong> {daily}
        </p>

        <p>
          <strong>Duration:</strong> {days}
        </p>

        <p
          style={{
            color: "#0A3D91",
            fontWeight: "bold"
          }}
        >
          <strong>Total Return:</strong> {total}
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
      </div>

      <button
        className="invest-btn"
        style={{ marginTop: "20px" }}
      >
        CONFIRM INVESTMENT
      </button>

    </main>
  );
          }
