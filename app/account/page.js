"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

export default function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        👤 My Account
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 5px 20px rgba(0,0,0,.08)"
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#0A3D91",
            color: "#fff",
            fontSize: "40px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          👤
        </div>

        <h2 style={{ marginTop: "15px" }}>
  {user.full_name}
</h2>

<p style={{ color: "#777" }}>
  {user.phone_number}
</p>

</div>
  
     <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Account Information</h3>

        <p style={{ marginTop: "10px" }}>
  📱 Phone: {user.phone_number}
</p>

        <p>
  🔑 Referral Code: {user.my_referral_code}
</p>

        <p>
  🗓️ Joined: {new Date(user.created_at).toLocaleDateString()}
</p>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Quick Actions</h3>

        <a
          href="/wallet"
          className="invest-btn"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            marginTop: "10px"
          }}
        >
          💳 My Wallet
        </a>

        <a
          href="/invite"
          className="invest-btn"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            marginTop: "10px"
          }}
        >
          👥 Referral Center
        </a>

        <a
          href="/team"
          className="invest-btn"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            marginTop: "10px"
          }}
        >
          👨‍👩‍👧‍👦 My Team
        </a>
      </div>

      <button
  className="invest-btn"
  style={{
    marginTop: "20px",
    background: "#d9534f"
  }}
  onClick={() => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
>
  Logout
</button>

      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#888"
        }}
      >
        DENSAPAL v1.0.0
      </p>
          
<BottomNav />
    </main>
  );
            }
