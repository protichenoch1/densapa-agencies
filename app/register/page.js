"use client";

import { useState } from "react";
import { supabase } from "@lib/supabase.js";

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

    const { error } = await supabase
      .from("users")
      .insert([
        {
          full_name: fullName,
          phone_number: phoneNumber,
          pin: pin,
          referral_code: referralCode,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration successful!");

    setFullName("");
    setPhoneNumber("");
    setPin("");
    setReferralCode("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
          }}
        />

        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
          }}
        />

          <input
  type="password"
  placeholder="Confirm PIN"
  value={confirmPin}
  onChange={(e) => setConfirmPin(e.target.value)}
  style={{
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
  }}
/>

        <input
          type="text"
          placeholder="Referral Code (Optional)"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#D4AF37",
            padding: "10px 20px",
            border: "none",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
  );
              }
