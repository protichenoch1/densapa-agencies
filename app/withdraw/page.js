export default function Withdraw() {
  return (
    <main className="container">
      <h1>Withdraw Funds</h1>

      <div className="announcement">
        <p>Minimum Withdrawal</p>
        <h2>KES 450</h2>
      </div>

      <input
        placeholder="Amount"
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"20px"
        }}
      />

      <button className="invest-btn">
        Request Withdrawal
      </button>
    </main>
  );
}
