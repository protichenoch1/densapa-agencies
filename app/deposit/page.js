"use client";

import { useState } from "react";

export default function DepositPage() {
  const [image, setImage] = useState(null);
  
  const [loading, setLoading] = useState(false);

  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        💰 Deposit Funds
      </h1>

      <div className="balance-card">
        <p>Deposit Via Till Number</p>
        <h1>8808802</h1>
        <p>Upload payment screenshot after sending money</p>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Deposit Details</h3>

        <div style={{ marginTop: "15px" }}>
          <label>Deposit Amount</label>

          <input
            type="number"
            placeholder="Enter Deposit Amount"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          />
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>Upload M-Pesa Screenshot</label>

          <input
            type="file"
            accept="image/*"
            style={{
              width: "100%",
              marginTop: "8px"
            }}
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </div>

        {image && (
          <div style={{ marginTop: "15px" }}>
            <img
              src={image}
              alt="Deposit Screenshot"
              style={{
                width: "100%",
                borderRadius: "12px"
              }}
            />
          </div>
        )}
      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Deposit Instructions</h3>

        <p style={{ marginTop: "10px" }}>
          ✅ Send money to Till Number 8808802
        </p>

        <p>
          ✅ Enter the amount deposited
        </p>

        <p>
          ✅ Upload the M-Pesa payment screenshot
        </p>

        <p>
          ✅ Wait for manual approval
        </p>
      </div>

      <button
  disabled={loading}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    border: "none",
    borderRadius: "10px",
    background: "#0A3D91",
    color: "#fff",
    fontWeight: "bold"
  }}
  onClick={() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }}
>
  {loading ? "Processing..." : "Submit Deposit"}

<div className="floating-loader"></div>
  
</button>

    </main>
  );
              }
