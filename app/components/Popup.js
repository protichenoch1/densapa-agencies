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
        borderRadius: "12px",
        fontWeight: "bold",
        zIndex: 9999,
        boxShadow: "0 5px 15px rgba(0,0,0,.2)",
      }}
    >
      {message}
    </div>
  );
}
