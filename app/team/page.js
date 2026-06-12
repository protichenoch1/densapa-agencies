"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";

export default function TeamPage() {
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);

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

      const { data: referralList } = await supabase
  .from("users")
  .select("id, full_name, created_at")
  .eq("referral_code", data.my_referral_code);

setReferrals(referralList || []);
    }
  }

  loadUser();
}, []);

  if (!user) {
  return <p style={{ padding: "20px" }}>Loading...</p>;
}

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
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "15px"
  }}
>
  <button
    onClick={() =>
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          `Join DENSAPAL AGENCIES and earn daily.\n${referralLink}`
        )}`
      )
    }
    style={{
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "12px 15px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    <img
      src="/whatsapp.png"
      width="24"
      height="24"
    />
    <span style={{ flex: 1, textAlign: "center" }}>
      WhatsApp
    </span>
  </button>

  <button
    onClick={() =>
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(
          referralLink
        )}`
      )
    }
    style={{
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "12px 15px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    <img
      src="/telegram.png"
      width="24"
      height="24"
    />
    <span style={{ flex: 1, textAlign: "center" }}>
      Telegram
    </span>
  </button>

  <button
    onClick={() =>
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          referralLink
        )}`
      )
    }
    style={{
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "12px 15px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    <img
      src="/facebook.png"
      width="24"
      height="24"
    />
    <span style={{ flex: 1, textAlign: "center" }}>
      Facebook
    </span>
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
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  }}
>
  <h3>My Referrals</h3>

  <div
    style={{
      background: "#0A3D91",
      color: "#fff",
      padding: "5px 12px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "14px"
    }}
  >
    {referrals.length}
  </div>
</div>

        {referrals.length === 0 ? (
  <p style={{ marginTop: "10px" }}>
    No referrals yet.
  </p>
) : (
  referrals.map((referral) => (
  <div
    key={referral.id}
    style={{
      padding: "15px",
      borderBottom: "1px solid #eee",
    }}
  >
    <div
      style={{
        fontWeight: "bold",
        color: "#0A3D91",
      }}
    >
      👤 {referral.full_name}
    </div>

    <div
      style={{
        marginTop: "5px",
        color: "#666",
        fontSize: "14px",
      }}
    >
      📅 Joined:
      {" "}
      {new Date(
        referral.created_at
      ).toLocaleDateString()}
    </div>

    <div
      style={{
        marginTop: "5px",
        color: "green",
        fontWeight: "bold",
      }}
    >
      🟢 Active
    </div>
  </div>
))
)}
      </div>

    <BottomNav />
      </main>
  );
          }
