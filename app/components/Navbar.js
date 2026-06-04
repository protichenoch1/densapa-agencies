export default function Navbar() {
  return (
    <nav
      style={{
        background: "#0A3D91",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h3>DENSAPAL AGENCIES</h3>

      <div>
        <a
          href="/"
          style={{ color: "white", marginRight: "15px" }}
        >
          Home
        </a>

        <a
          href="/plans"
          style={{ color: "white", marginRight: "15px" }}
        >
          Plans
        </a>

        <a
          href="/register"
          style={{ color: "white", marginRight: "15px" }}
        >
          Register
        </a>

        <a
          href="/login"
          style={{ color: "white" }}
        >
          Login
        </a>
      </div>
    </nav>
  );
            }
