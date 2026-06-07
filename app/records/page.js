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
            <div className="plan-top">
              <h3>{item.amount}</h3>

              <span className="badge">
                {item.type}
              </span>
            </div>

            <p>
              Daily Income: {item.daily}
            </p>

            <p>
              Duration: {item.days}
            </p>

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
                marginTop: "10px"
              }}
            >
              Date: {item.date}
            </p>
          </div>
        ))
      )}

      <BottomNav />
    </main>
  );
          }
