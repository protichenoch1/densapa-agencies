export default function Wallet() {
  return (
    <main className="container">

      <h1>My Wallet</h1>

      <div className="balance-card">
        <p>Available Balance</p>
        <h1>KES 0.00</h1>
      </div>

      <div className="stats">

        <div className="stat-card">
          <h2>KES 0</h2>
          <p>Total Deposits</p>
        </div>

        <div className="stat-card">
          <h2>KES 0</h2>
          <p>Total Withdrawals</p>
        </div>

        <div className="stat-card">
          <h2>KES 0</h2>
          <p>Referral Earnings</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Active Plans</p>
        </div>

      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Recent Transactions</h3>

        <p>No transactions found.</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginTop: "20px"
        }}
      >
        <a
          href="/deposit"
          className="invest-btn"
          style={{
            textDecoration: "none",
            textAlign: "center"
          }}
        >
          Deposit
        </a>

        <a
          href="/withdraw"
          className="invest-btn"
          style={{
            textDecoration: "none",
            textAlign: "center"
          }}
        >
          Withdraw
        </a>
      </div>

    </main>
  );
        }
