export default function Invite() {
  return (
    <main className="container">
      <h1>Invite Friends</h1>

      <div className="announcement">
        <p>Referral Bonus</p>
        <h2>KES 20</h2>

        <p>
          Earn KES 20 for every successful referral.
        </p>
      </div>

      <input
        value="https://densapa-agencies.vercel.app/register?ref=USER123"
        readOnly
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"20px"
        }}
      />
    </main>
  );
}
