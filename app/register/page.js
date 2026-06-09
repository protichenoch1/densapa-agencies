"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    if (pin !== confirmPin) {
      alert("PINs do not match");
      return;
    }

    setLoading(true);

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
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Create PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Confirm PIN"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            required
            style={inputStyle}
          />

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
