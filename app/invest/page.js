export default function InvestPage() {
  return (
    <main className="container">

      <h1 style={{ marginBottom: "20px" }}>
        Investment Details
      </h1>

      <div className="plan-card">

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "15px"
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "15px",
              background:
                "linear-gradient(135deg,#0A3D91,#1E5FD8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "35px",
              color: "white"
            }}
          >
            💰
          </div>

          <div>
            <h2>KES 420</h2>
            <span className="badge">
              BASIC
            </span>
          </div>
        </div>

        <p>
          <strong>Investment:</strong> KES 420
        </p>

        <p>
          <strong>Daily Income:</strong> KES 200
        </p>

        <p>
          <strong>Duration:</strong> 3 Days
        </p>

        <p
          style={{
            color: "#0A3D91",
            fontWeight: "bold"
          }}
        >
          Total Return: KES 600
        </p>

      </div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Payment Instructions</h3>

        <p>
          Send payment to:
        </p>

        <h2
          style={{
            color: "#0A3D91"
          }}
        >
          Till Number 8808802
        </h2>

        <p>
          After payment, submit your
          M-Pesa transaction code below.
        </p>
      </div>

      <input
        type="text"
        placeholder="M-Pesa Transaction Code"
        style={{
          width: "100%",
          padding: "14px",
          marginTop: "20px",
          borderRadius: "10px",
          border: "1px solid #ddd"
        }}
      />

      <button
        className="invest-btn"
        style={{
          marginTop: "15px"
        }}
      >
        Submit Investment
      </button>

    </main>
  );
              }
