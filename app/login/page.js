"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Popup from "../components/Popup";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState("");
const [popupColor, setPopupColor] = useState("#28a745");

  const router = useRouter();
  
  async function handleLogin(e) {
  e.preventDefault();

  if (!/^0(1|7)\d{8}$/.test(phoneNumber)) {
    setPopupColor("#D4AF37");
setPopupMessage("⚠ Enter a valid 10-digit phone number");
setShowPopup(true);

setTimeout(() => {
  setShowPopup(false);
}, 3000);

return;
    }

  if (pin.length !== 4) {
    setPopupColor("#D4AF37");
setPopupMessage("⚠ PIN must be exactly 4 digits");
setShowPopup(true);

setTimeout(() => {
  setShowPopup(false);
}, 3000);

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

  setLoading(false);

  if (error || !data) {
    setPopupColor("#dc3545");
setPopupMessage("❌ Invalid phone number or PIN");
setShowPopup(true);

setTimeout(() => {
  setShowPopup(false);
}, 3000);

return;
  }

  localStorage.setItem("user", JSON.stringify(data));

    setPopupColor("#28a745");
setPopupMessage("✅ Login successful!");
setShowPopup(true);

setTimeout(() => {
  setShowPopup(false);
  router.push("/dashboard");
}, 2000);

return;
  }

  return (
    <div
      style={{
  minHeight: "100vh",
  background:
    "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/background2.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
}}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
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

          {loading && (
  <div
    style={{
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #0A3D91",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      animation: "spin 1s linear infinite",
      margin: "20px auto",
    }}
  />
)}
          
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
  href="/contact-support"
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
    {showPopup && (
   <div
    style={{
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: popupColor,
      color: "#fff",
      padding: "15px 25px",
      borderRadius: "15px",
      fontWeight: "bold",
      zIndex: 9999,
      boxShadow: "0 5px 15px rgba(0,0,0,.2)",
      animation: "slideDown .4s ease"
    }}
  >
    {popupMessage}
   </div>
)}
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
