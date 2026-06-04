export default function Deposit() {
  return (
    <main className="container">
      <h1>Deposit Funds</h1>

      <div className="announcement">
        <h3>M-Pesa Till Number</h3>
        <h2>8808802</h2>

        <p>
          Pay using the Till Number above,
          then submit your transaction code.
        </p>
      </div>

      <input
        placeholder="M-Pesa Transaction Code"
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"20px"
        }}
      />

      <button className="invest-btn">
        Submit Deposit
      </button>
    </main>
  );
}
