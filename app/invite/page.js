"use client";

export default function InvitePage() {
  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        👥 Referral Center
      </h1>

      <div className="balance-card">
        <p>Referral Earnings</p>
        <h1>KES 0</h1>
        <p>KES 20 Per Successful Registration</p>
      </div>

      <div className="stats">

        <div className="stat-card">
          <h2>0</h2>
          <p>Total Referrals</p>
        </div>

        <div className="stat-card">
          <h2>KES 0</h2>
          <p>Total Earnings</p>
        </div>

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
            wordBreak: "break-all"
          }}
        >
          https://densapa-agencies.vercel.app/register?ref=USER123
        </div>

        <button
          className="invest-btn"
          style={{ marginTop: "15px" }}
          onClick={() => {
            navigator.clipboard.writeText(
              "https://densapa-agencies.vercel.app/register?ref=USER123"
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
