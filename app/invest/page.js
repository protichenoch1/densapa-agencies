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

      <h1>Investment Details</h1>

      <div className="plan-card">

        <h2>{amount}</h2>

        <span className="badge">
          {type?.toUpperCase()}
        </span>

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
          Total Return: {total}
        </p>

      </div>

      <div
        className="stat-card"
        style={{ marginTop: "20px" }}
      >
        <h3>Available Balance</h3>
        <h1>KES 0.00</h1>
      </div>

      <button className="invest-btn">
        Invest Now
      </button>

    </main>
  );
}
