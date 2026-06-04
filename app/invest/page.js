export default function InvestPage() {
  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        💼 Investment Details
      </h1>

      <div className="plan-card">
        <h2>Investment Plan</h2>

        <p style={{ marginTop: "10px" }}>
          Select a plan from the homepage.
        </p>

        <p style={{ marginTop: "10px" }}>
          Daily income and duration will appear here.
        </p>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Wallet Balance</h3>

        <h2
          style={{
            color: "#0A3D91",
            marginTop: "10px"
          }}
        >
          KES 0.00
        </h2>
      </div>

      <button
        className="invest-btn"
        style={{ marginTop: "20px" }}
      >
        CONFIRM INVESTMENT
      </button>

    </main>
  );
}
