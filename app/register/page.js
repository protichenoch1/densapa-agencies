export default function Register() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>

      <form>
        <input
          type="text"
          placeholder="Full Name"
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
          }}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#D4AF37",
            padding: "10px 20px",
            border: "none",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
            }
