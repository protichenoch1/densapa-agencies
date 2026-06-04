export default function Home() {
  return (
    <main className="container">

      <div className="header">
        <div className="logo">DENSAPAL</div>
        <div>🔔 👤</div>
      </div>

      <div className="balance-card">
        <p>Total Balance</p>
        <h1>KES 0.00</h1>
        <p>Today's Earnings: KES 0</p>
      </div>

      <div className="quick-actions">
        <div className="action-card">💰<br/>Deposit</div>
        <div className="action-card">🏧<br/>Withdraw</div>
        <div className="action-card">👥<br/>Invite</div>
        <div className="action-card">📋<br/>Records</div>
      </div>

      <div className="tabs">
        <button className="tab active-tab">
          BASIC
        </button>

        <button className="tab vip-tab">
          VIP
        </button>
      </div>

      <div className="plan-card">
        <div className="plan-top">
          <h3>KES 420</h3>
          <span className="badge">HOT</span>
        </div>

        <p>Daily Income: KES 200</p>
        <p>Duration: 3 Days</p>

        <button className="invest-btn">
          INVEST NOW
        </button>
      </div>

      <div className="plan-card">
        <div className="plan-top">
          <h3>KES 2,000</h3>
          <span className="badge">POPULAR</span>
        </div>

        <p>Daily Income: KES 500</p>
        <p>Duration: 7 Days</p>

        <button className="invest-btn">
          INVEST NOW
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h2>0</h2>
          <p>Investments</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Earnings</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Referrals</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Team</p>
        </div>
      </div>

      <div className="announcement">
        <h3>📢 Announcement</h3>
        <p>Deposit via Till Number 8808802</p>
        <p>Minimum Withdrawal: KES 450</p>
      </div>

      <div className="support-btn">
        💬
      </div>

      <div className="bottom-nav">
        <div>🏠</div>
        <div>💼</div>
        <div>👥</div>
        <div>💳</div>
        <div>👤</div>
      </div>

    </main>
  );
    }
