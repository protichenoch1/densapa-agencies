export default function WithdrawPage() {
  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        🏧 Withdraw Funds
      </h1>

      <div className="balance-card">
        <p>Available Balance</p>
        <h1>KES 0.00</h1>
        <p>Minimum Withdrawal: KES 450</p>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Withdrawal Details</h3>

        <div style={{ marginTop: "15px" }}>

          <label>M-Pesa Number</label>

          <input
            type="text"
            placeholder="Enter M-Pesa Number"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          />

        </div>

        <div style={{ marginTop: "15px" }}>

          <label>Withdrawal Amount</label>

          <input
            type="number"
            placeholder="Enter Amount"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          />

        </div>

      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Withdrawal Rules</h3>

        <p style={{ marginTop: "10px" }}>
          ✅ Minimum withdrawal is KES 450
        </p>

        <p>
          ✅ Withdrawals are processed manually
        </p>

        <p>
          ✅ Ensure your M-Pesa number is correct
        </p>
      </div>

      <button
        className="invest-btn"
        style={{ marginTop: "20px" }}
      >
        SUBMIT WITHDRAWAL
      </button>

    </main>
  );
}
