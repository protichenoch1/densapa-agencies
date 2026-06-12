import BottomNav from "../../components/BottomNav";

export default function TeamPage() {
  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        👥 My Team
      </h1>

      <div className="balance-card">
        <p>Total Team Earnings</p>
        <h1>KES 0</h1>
        <p>Earn KES 20 per successful referral</p>
      </div>

      <div className="stats">

        <div className="stat-card">
          <h2>0</h2>
          <p>Direct Referrals</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Total Team</p>
        </div>

        <div className="stat-card">
          <h2>KES 0</h2>
          <p>Referral Income</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Active Members</p>
        </div>

      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Referral Program</h3>

        <p style={{ marginTop: "10px" }}>
          📌 Earn KES 20 for every successful registration.
        </p>

        <p>
          📌 Referral bonuses are credited to your wallet.
        </p>

        <p>
          📌 Unlimited referrals allowed.
        </p>
      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Team Members</h3>

        <p style={{ marginTop: "10px" }}>
          No team members yet.
        </p>
      </div>

      <a
        href="/invite"
        className="invest-btn"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "20px",
          textDecoration: "none"
        }}
      >
        👥 Invite More Friends
      </a>
          
<BottomNav />
    </main>
  );
}
