"use client";

export default function Popup({
  show,
  message,
  color = "#28a745",
}) {
  if (!show) return null;

  return (
  <div
    style={{
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: color,
      color: "#fff",
      padding: "15px 25px",
      borderRadius: "15px",
      minWidth: "280px",
      textAlign: "center",
      zIndex: 10000,
      boxShadow: "0 5px 15px rgba(0,0,0,.2)",
      animation: "slideDown .4s ease"
    }}
  >
    <div
      style={{
        fontSize: "22px",
        marginBottom: "5px"
      }}
    >
      {icon}
    </div>

    <h3>{title}</h3>

    <p>{message}</p>

    <button
      onClick={onClose}
      style={{
        marginTop: "10px",
        padding: "8px 20px",
        border: "none",
        borderRadius: "10px",
        background: "#fff",
        color: color,
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      OK
    </button>
  </div>
);
}
