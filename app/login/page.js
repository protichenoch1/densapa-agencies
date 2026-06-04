export default function Login() {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0A3D91",
          marginBottom: "20px"
        }}
      >
        Login
      </h1>

      <form>
        <input
          type="email"
          placeholder="Email Address"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#D4AF37",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: "15px"
        }}
      >
        Don't have an account?{" "}
        <a href="/register" style={{ color: "#0A3D91" }}>
          Register
        </a>
      </p>
    </div>
  );
}
