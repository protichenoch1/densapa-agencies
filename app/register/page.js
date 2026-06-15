"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if (ref) {
    setReferralCode(ref);
  }
}, []);

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
  setLoading(false);
  alert("Phone number already registered");
  return;
}
   const myReferralCode =
  Math.random().toString(36).substring(2, 8).toUpperCase(); 

    const { error } = await supabase.from("users").insert([
  {
    full_name: firstName.toUpperCase(),
    phone_number: phoneNumber,
    pin,
    referral_code: referralCode,
    my_referral_code: myReferralCode,
  },
]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (referralCode) {
  const { data: referrer } = await supabase
    .from("users")
    .select("id, balance, referral_count, referral_earnings")
    .eq("my_referral_code", referralCode)
    .maybeSingle();

  if (referrer) {
    await supabase
  .from("users")
  .update({
    referral_count: (referrer.referral_count || 0) + 1,
    referral_earnings: (referrer.referral_earnings || 0) + 20,
    balance: (referrer.balance || 0) + 20,
  })
  .eq("id", referrer.id);

    await supabase
  .from("notifications")
  .insert([
    {
      user_id: referrer.id,
      title: "👥 Referral Bonus",
      message: "KES 20 referral bonus has been added to your wallet.",
    is_read: false,
    },
  ]);
     }
    }

    alert("Registration successful!");
    window.location.href = "/login";
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
  placeholder="First Name"
  value={firstName}
  onChange={(e) =>
    setFirstName(
      e.target.value
        .replace(/[^a-zA-Z]/g, "")
        .toUpperCase()
    )
  }
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
