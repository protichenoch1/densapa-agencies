export default function InvestPage() {
  return (
    <main className="container">

      <h1>Investment Details</h1>

      <div className="plan-card">

        <h2>KES 420</h2>

        <p>Daily Income: KES 200</p>

        <p>Duration: 3 Days</p>

        <p
          style={{
            color:"#0A3D91",
            fontWeight:"bold"
          }}
        >
          Total Return: KES 600
        </p>

      </div>

      <div
        className="stat-card"
        style={{marginTop:"20px"}}
      >
        <h3>Available Balance</h3>
        <h1>KES 0.00</h1>
      </div>

      <button className="invest-btn">
        Invest Now
      </button>

    </main>
  );
}
