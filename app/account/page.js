export default function AccountPage() {
  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        👤 My Account
      </h1>

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "25px",
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
            color: "white",
            margin: "0 auto 15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px"
          }}
        >
          👤
        </div>

        <h2>Username</h2>
        <p>Member ID: DSP001</p>
      </div>

      <div className="announcement">
        <h3>Account Information</h3>

        <p style={{ marginTop: "10px" }}>
          📱 Phone Number: Not Set
        </p>

        <p>
          📅 Join Date: Today
        </p>

        <p>
          🌍 Country: Kenya
        </p>
      </div>

      <div className="stats">

        <div className="stat-card">
          <h2>0</h2>
          <p>Investments</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Referrals</p>
        </div>

      </div>

      <a
        href="/login"
        className="invest-btn"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "20px",
          textDecoration: "none"
        }}
      >
        Logout
      </a>

    </main>
  );
            }
