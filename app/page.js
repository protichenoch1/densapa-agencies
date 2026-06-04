export default function Home() {
  return (
    <main
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "15px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#0A3D91" }}>DENSAPAL</h2>

        <div>
          🔔 👤
        </div>
      </div>

      {/* Balance Card */}
      <div
        style={{
          background: "linear-gradient(135deg,#0A3D91,#D4AF37)",
          color: "white",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <p>Total Balance</p>

        <h1>KES 0.00</h1>

        <p>Today's Earnings: KES 0</p>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <button>💰<br />Deposit</button>

        <button>🏧<br />Withdraw</button>

        <button>👥<br />Invite</button>

        <button>📋<br />Records</button>
      </div>

      {/* Plan Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            flex: 1,
            background: "#0A3D91",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          BASIC
        </button>

        <button
          style={{
            flex: 1,
            background: "#D4AF37",
            color: "black",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          VIP
        </button>
      </div>

      {/* Basic Plans */}
      <div
        style={{
          background: "white",
          padding: "15px",
          borderRadius: "15px",
          marginBottom: "12px",
        }}
      >
        <h3>KES 420</h3>
        <p>Daily Income: KES 200</p>
        <p>Duration: 3 Days</p>
        <button>Invest Now</button>
      </div>

      <div
        style={{
          background: "white",
          padding: "15px",
          borderRadius: "15px",
          marginBottom: "12px",
        }}
      >
        <h3>KES 2,000</h3>
        <p>Daily Income: KES 500</p>
        <p>Duration: 7 Days</p>
        <button>Invest Now</button>
      </div>

      <div
        style={{
          background: "white",
          padding: "15px",
          borderRadius: "15px",
          marginBottom: "12px",
        }}
      >
        <h3>KES 5,000</h3>
        <p>Daily Income: KES 900</p>
        <p>Duration: 10 Days</p>
        <button>Invest Now</button>
      </div>

      <div
        style={{
          background: "white",
          padding: "15px",
          borderRadius: "15px",
          marginBottom: "80px",
        }}
      >
        <h3>KES 10,000</h3>
        <p>Daily Income: KES 1,800</p>
        <p>Duration: 15 Days</p>
        <button>Invest Now</button>
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          display: "flex",
          justifyContent: "space-around",
          padding: "12px",
          borderTop: "1px solid #ddd",
        }}
      >
        <div>🏠<br />Home</div>
        <div>💼<br />Invest</div>
        <div>👥<br />Team</div>
        <div>💳<br />Wallet</div>
        <div>👤<br />Account</div>
      </div>
    </main>
  );
}
