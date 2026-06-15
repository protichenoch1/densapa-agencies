"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Popup from "../components/Popup";

export default function DepositPage() {
  const [image, setImage] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState("");
const [popupColor, setPopupColor] = useState("#28a745");

  return (
    <main className="container">

    {loading && <div className="center-loader"></div>}

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
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
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
          ✅ Minimum deposit amount is KES 200.
        </p>

        <p>
          ✅ Upload the M-Pesa payment screenshot.
        </p>

        <p>
          ✅ Wait for deposit approval.
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
  onClick={async () => {
  if (!amount) {
  setPopupColor("#D4AF37");
  setPopupMessage("⚠ Enter deposit amount");
  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
  }, 3000);

  return;
  }

    if (Number(amount) < 200) {
  setPopupColor("#D4AF37");
  setPopupMessage("⚠ Minimum deposit is KES 200");
  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
  }, 3000);

  return;
        }

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  if (!user.id) {
  setPopupColor("#dc3545");
  setPopupMessage("❌ Please login again");
  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
  }, 3000);

  return;
  }

  setLoading(true);

  const { error } = await supabase
    .from("deposits")
    .insert([
      {
        user_id: user.id,
        amount: Number(amount),
        phone_number: user.phone_number,
        status: "PENDING",
      },
    ]);

  if (error) {
  setLoading(false);

  setPopupColor("#dc3545");
  setPopupMessage(`❌ ${error.message}`);
  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
  }, 3000);

  return;
    }

    setLoading(false);

    await supabase
  .from("notifications")
  .insert([
    {
      user_id: user.id,
      title: "💰 Deposit Submitted",
      message: `Deposit of KES ${Number(amount).toLocaleString()} submitted successfully.`,
    is_read: false,
    },
  ]);

    setPopupColor("#28a745");
setPopupMessage("✅ Deposit submitted successfully");
setShowPopup(true);

setTimeout(() => {
  setShowPopup(false);
}, 3000);

  setAmount("");
}}
>
  {loading ? "Processing..." : "Submit Deposit"}
  </button>

    <a
  href="/deposit-history"
  style={{
    display: "block",
    textDecoration: "none",
    color: "inherit",
    marginTop: "20px"
  }}
>
  <div
    className="announcement"
    style={{
      cursor: "pointer"
    }}
  >
    <h3>📋 Deposit History</h3>
    <p style={{ marginTop: "10px" }}>
      View all your deposit requests and their status
    </p>
  </div>
</a>

    <Popup
  show={showPopup}
  message={popupMessage}
  color={popupColor}
/>

    </main>
  );
              }
