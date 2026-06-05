export default function NotificationsPage() {
  return (
    <main className="container">

      <h1 style={{ marginBottom: "20px" }}>
        🔔 Notifications
      </h1>

      <div className="announcement">
        <h3>🎉 Welcome</h3>
        <p>Welcome to DENSAPAL AGENCIES.</p>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "15px" }}
      >
        <h3>💰 Deposit</h3>
        <p>Deposit via Till Number 8808802.</p>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "15px" }}
      >
        <h3>👥 Referral Bonus</h3>
        <p>Earn KES 20 per successful referral.</p>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "15px" }}
      >
        <h3>🏧 Withdrawals</h3>
        <p>Minimum withdrawal amount is KES 450.</p>
      </div>

    </main>
  );
        }
