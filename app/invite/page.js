"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function InvitePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  useEffect(() => {
  async function loadUser() {
    const savedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!savedUser.id) return;

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", savedUser.id)
      .maybeSingle();

    if (data) {
      setUser(data);

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );
    }
  }

  loadUser();
}, []);

  const referralLink =
    `https://densapal-agencies.vercel.app/register?ref=${user.my_referral_code}`;

  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        👥 Referral Center
      </h1>

      <div className="balance-card">
        <p>Referral Earnings</p>
        <h1>KES {user.referral_earnings || 0}</h1>
        <p>KES 20 Per Successful Registration</p>
      </div>

      <div className="stats">

        <div className="stat-card">
          <h2>{user.referral_count || 0}</h2>
          <p>Total Referrals</p>
        </div>

        <div className="stat-card">
          <h2>KES {user.referral_earnings || 0}</h2>
          <p>Total Earnings</p>
        </div>

      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Your Referral Code</h3>

        <div
          style={{
            marginTop: "10px",
            padding: "12px",
            background: "#f5f7fb",
            borderRadius: "10px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {user.my_referral_code}
        </div>

        <button
          className="invest-btn"
          style={{ marginTop: "15px" }}
          onClick={() => {
            navigator.clipboard.writeText(
              user.my_referral_code
            );
            alert("Referral code copied!");
          }}
        >
          📋 Copy Referral Code
        </button>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Your Referral Link</h3>

        <div
          style={{
            marginTop: "10px",
            padding: "12px",
            background: "#f5f7fb",
            borderRadius: "10px",
            wordBreak: "break-all",
          }}
        >
          {referralLink}
        </div>

        <button
          className="invest-btn"
          style={{ marginTop: "15px" }}
          onClick={() => {
            navigator.clipboard.writeText(
              referralLink
            );
            alert("Referral link copied!");
          }}
        >
          📋 Copy Referral Link
        </button>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Referral Rewards</h3>

        <p style={{ marginTop: "10px" }}>
          ✅ Earn KES 20 for every successful registration.
        </p>

        <p>
          ✅ Unlimited referrals allowed.
        </p>

        <p>
          ✅ Referral bonus is added to your wallet.
        </p>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>My Referrals</h3>

        <p style={{ marginTop: "10px" }}>
          No referrals yet.
        </p>
      </div>

    </main>
  );
}
