"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const router = useRouter();
  
  async function handleLogin(e) {
  e.preventDefault();

  if (!/^0(1|7)\d{8}$/.test(phoneNumber)) {
    alert("Enter a valid 10-digit phone number");
    return;
  }

  if (pin.length !== 4) {
    alert("PIN must be exactly 4 digits");
    return;
  }

  setLoading(true);

  const cleanPhone = phoneNumber.replace(/\D/g, "");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("phone_number", cleanPhone)
    .eq("pin", pin)
    .maybeSingle();

    console.log("DATA:", data);
console.log("ERROR:", error);

alert(JSON.stringify({ data, error }));

  setLoading(false);

  if (error || !data) {
    alert("Invalid phone number or PIN");
    return;
  }

  localStorage.setItem("user", JSON.stringify(data));

  router.push("/dashboard");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0A3D91,#06275e)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "25px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <img
            src="/logo.png"
            alt="DENSAPAL"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
            }}
          />

          <h1 style={{ color: "#0A3D91" }}>Welcome Back</h1>

          <p style={{ color: "#666" }}>
            Login to your account
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <input
  type="tel"
  inputMode="numeric"
  maxLength={10}
  placeholder="07xx xxxxxx / 01xx xxxxxx"
  value={phoneNumber}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  }}
  required
  style={inputStyle}
/>

          <div style={{ position: "relative", marginBottom: "12px" }}>
  <input
    type={showPin ? "text" : "password"}
    inputMode="numeric"
    pattern="[0-9]*"
    maxLength={4}
    placeholder="Enter 4-Digit PIN"
    value={pin}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length <= 4) {
        setPin(value);
      }
    }}
    required
    style={{
      ...inputStyle,
      marginBottom: 0,
      paddingRight: "70px",
    }}
  />

  <button
    type="button"
    onClick={() => setShowPin(!showPin)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      border: "none",
      background: "none",
      cursor: "pointer",
      color: "#0A3D91",
      fontWeight: "bold",
    }}
  >
    {showPin ? "Hide" : "Show"}
  </button>
</div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: "#D4AF37",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging In..." : "LOGIN"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >

<p
  style={{
    textAlign: "center",
    marginTop: "15px",
  }}
>
  <a
    href="https://wa.me/254111721048?text=Hello%20Admin,%20I%20forgot%20my%20PIN.%20My%20phone%20number%20is%20________."
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#0A3D91",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Forgot PIN?
  </a>
</p>

          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#0A3D91",
              fontWeight: "bold",
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "12px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  outline: "none",
};
