export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1>DENSAPAL AGENCIES</h1>
        <p>Invest Smart. Grow Daily.</p>
      </section>

      <div className="container">
        <h2 style={{ marginTop: "30px" }}>
          Referral Program
        </h2>
        <p>KES 20 per successful referral.</p>

        <h2 style={{ marginTop: "30px" }}>
          Deposit Method
        </h2>
        <p>M-Pesa Till Number: 8808802</p>

        <h2 style={{ marginTop: "30px" }}>
          Minimum Withdrawal
        </h2>
        <p>KES 450</p>

        <h2 style={{ marginTop: "30px" }}>
          Investment Plans
        </h2>

        <ul>
          <li>KES 420 → KES 200/day for 3 days</li>
          <li>KES 2,000 → KES 500/day for 7 days</li>
          <li>KES 5,000 → KES 900/day for 10 days</li>
          <li>KES 10,000 → KES 1,800/day for 15 days</li>
        </ul>
      </div>
    </main>
  );
}
