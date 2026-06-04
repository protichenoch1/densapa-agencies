export default function Account() {
  return (
    <main className="container">

      <div className="balance-card">
        <h2>DENSAPAL MEMBER</h2>
        <p>Phone: +254700000000</p>
      </div>

      <div className="stat-card">
        <h3>Account Balance</h3>
        <h1>KES 0.00</h1>
      </div>

      <div className="stat-card">
        <h3>Active Plan</h3>
        <p>No Active Plan</p>
      </div>

      <button className="invest-btn">
        Logout
      </button>

    </main>
  );
}
