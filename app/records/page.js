"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

export default function Records() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("investments") || "[]"
    );

    setInvestments(data);
  }, []);

  return (
    <main className="container">
      <h2
        style={{
          color: "#0A3D91",
          marginBottom: "20px"
        }}
      >
        📋 Investment Records
      </h2>

      {investments.length === 0 ? (
        <div className="stat-card">
          <p>No investments found.</p>
        </div>
      ) : (
        investments.map((item, index) => (
  <div
    key={index}
    className="plan-card"
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}
    >
      <img
        src={item.image}
        alt={item.amount}
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "15px",
          objectFit: "cover"
        }}
      />

      <div style={{ flex: 1 }}>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  }}
>
  <span
    style={{
      background: "#28a745",
      color: "#fff",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold"
    }}
  >
    ACTIVE
  </span>

  <span className="badge">
    {item.type}
  </span>
</div>

<h3>{item.amount}</h3>

        <p>Daily Income: {item.daily}</p>
        <p>Duration: {item.days}</p>

        <p
          style={{
            color: "#0A3D91",
            fontWeight: "bold"
          }}
        >
          Total Return: {item.total}
        </p>

          <p
          style={{
            fontSize: "12px",
            color: "#666",
            marginTop: "8px"
          }}
        >
          Date: {item.date}
        </p>
      </div>
    </div>
  </div>
   ))
  )}

      <BottomNav />
    </main>
  );
          }
