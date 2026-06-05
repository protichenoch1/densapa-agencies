export default function Wallet() {
  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        💳 My Wallet
      </h1>
          <div
  style={{
    textAlign: "center",
    marginBottom: "20px"
  }}
>
  <img
    src="/wallet.png"
    alt="Wallet"
    style={{
      width: "45px",
      height: "45px"
    }}
  />
</div>

      <div className="balance-card">
        <p>Available Balance</p>
        <h1>KES 12,450</h1>
        <p>Last Updated: Today</p>
      </div>

      <div className="stats">

        <div className="stat-card">
          <h2>KES 15,000</h2>
          <p>Total Deposits</p>
        </div>

        <div className="stat-card">
          <h2>KES 2,550</h2>
          <p>Total Withdrawals</p>
        </div>

        <div className="stat-card">
          <h2>KES 400</h2>
          <p>Referral Earnings</p>
        </div>

        <div className="stat-card">
          <h2>3</h2>
          <p>Active Plans</p>
        </div>

      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>📋 Recent Transactions</h3>

        <div style={{ marginTop: "10px" }}>
          <p>✅ Deposit - KES 2,000</p>
          <p>✅ Investment - KES 420</p>
          <p>✅ Withdrawal - KES 500</p>
          <p>✅ Referral Bonus - KES 20</p>
        </div>
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
          💰 Deposit
        </a>

        <a
          href="/withdraw"
          className="invest-btn"
          style={{
            textDecoration: "none",
            textAlign: "center"
          }}
        >
          🏧 Withdraw
        </a>

      </div>

    </main>
  );
            }
