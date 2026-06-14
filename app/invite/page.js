"use client";

export default function InvitePage() {
  return (
    <main className="container">

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            border: "none",
            background: "transparent",
            color: "#0A3D91",
            fontSize: "14px",
            fontWeight: "bold"
          }}
        >
          ← Back
        </button>

        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            color: "#0A3D91"
          }}
        >
          Invite
        </h2>

        <div style={{ width: "50px" }} />
      </div>

      <div className="announcement">
        <h3>👥 Referral Program</h3>

        <p style={{ marginTop: "10px" }}>
          Earn KES 20 for every successful referral.
        </p>

        <a
          href="/team"
          style={{
            display: "block",
            marginTop: "20px",
            textDecoration: "none",
            background: "#0A3D91",
            color: "#fff",
            padding: "15px",
            borderRadius: "15px",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          👥 My Team
        </a>
      </div>

    </main>
  );
            }
