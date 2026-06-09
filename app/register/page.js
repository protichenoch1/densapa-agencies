"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
const [showConfirmPin, setShowConfirmPin] = useState(false);
  
  const searchParams = useSearchParams();

  useEffect(() => {
  const ref = searchParams.get("ref");

  if (ref) {
    setReferralCode(ref);
  }
}, [searchParams]);

  async function handleRegister(e) {
    e.preventDefault();

    if (!/^0(1|7)\d{8}$/.test(phoneNumber)) {
  alert("Enter a valid 10-digit phone number");
  return;
    }

    if (pin.length !== 4) {
  alert("PIN must be exactly 4 digits");
  return;
    }

    if (pin !== confirmPin) {
      alert("PINs do not match");
      return;
    }

    setLoading(true);

    const { data: existingUser } = await supabase
  .from("users")
  .select("id")
  .eq("phone_number", phoneNumber)
  .maybeSingle();

if (existingUser) {
  alert("Phone number already registered");
  return;
}

    const { error } = await supabase.from("users").insert([
      {
        full_name: fullName,
        phone_number: phoneNumber,
        pin,
        referral_code: referralCode,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration successful!");
    window.location.href = "/login";
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

          <h1
            style={{
              color: "#0A3D91",
              marginTop: "10px",
            }}
          >
            DENSAPAL
          </h1>

          <p
            style={{
              color: "#D4AF37",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            AGENCIES
          </p>

          <p
            style={{
              color: "#666",
              marginTop: "10px",
            }}
          >
            Create your account
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={inputStyle}
          />

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
  placeholder="Create 4-Digit PIN"
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

          <div style={{ position: "relative", marginBottom: "12px" }}>
  <input
    type={showConfirmPin ? "text" : "password"}
    inputMode="numeric"
    pattern="[0-9]*"
    maxLength={4}
    placeholder="Confirm 4-Digit PIN"
    value={confirmPin}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length <= 4) {
        setConfirmPin(value);
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
    onClick={() => setShowConfirmPin(!showConfirmPin)}
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
    {showConfirmPin ? "Hide" : "Show"}
  </button>
</div>

          <input
            type="text"
            placeholder="Referral Code (Optional)"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            style={inputStyle}
          />

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
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            {loading ? "Creating Account..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#0A3D91",
              fontWeight: "bold",
            }}
          >
            Login
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
