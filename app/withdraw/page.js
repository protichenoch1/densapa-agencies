"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function WithdrawPage() {
  const [user, setUser] = useState(null);
const [amount, setAmount] = useState("");
const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
  const savedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  setUser(savedUser);
}, []);

  async function handleWithdraw() {
  if (!amount || Number(amount) <= 0) {
    setPopupTitle("Warning");
setPopupMessage("Enter a valid amount");
setPopupColor("#D4AF37");
setPopupIcon("⚠️");
setShowPopup(true);
return;
  }

  if (Number(amount) < 450) {
    setPopupTitle("Warning");
setPopupMessage("Minimum withdrawal is KES 450");
setPopupColor("#D4AF37");
setPopupIcon("⚠️");
setShowPopup(true);
return;
  }

  if (Number(amount) > Number(user.balance || 0)) {
    setPopupTitle("Error");
setPopupMessage("Insufficient balance");
setPopupColor("#dc3545");
setPopupIcon("❌");
setShowPopup(true);
return;
  }

  setLoading(true);

    const fee =
  Math.floor(Number(amount) * 0.05);

const amountToReceive =
  Number(amount) - fee;

  const { error } = await supabase
  .from("withdrawals")
  .insert([
    {
      user_id: user.id,
      amount: Number(amount),
      withdrawal_fee: fee,
      amount_received: amountToReceive,
      phone_number: user.phone_number,
      status: "PENDING",
    },
  ]);

  if (error) {
    setLoading(false);
    setPopupTitle("Error");
setPopupMessage(error.message);
setPopupColor("#dc3545");
setPopupIcon("❌");
setShowPopup(true);
setLoading(false);
return;
  }
    
  const newBalance =
  Number(user.balance) - Number(amount);

const { data, error: updateError } = await supabase
  .from("users")
  .update({
    balance: newBalance,
  })
  .eq("id", user.id)
  .select();

console.log("USER ID:", user.id);
console.log("NEW BALANCE:", newBalance);
console.log("UPDATED DATA:", data);
console.log("UPDATE ERROR:", updateError);

if (updateError) {
  alert(updateError.message);
  setLoading(false);
  return;
}

const updatedUser = {
  ...user,
  balance: newBalance,
};

localStorage.setItem(
  "user",
  JSON.stringify(updatedUser)
);

setUser(updatedUser);

    await supabase
  .from("notifications")
  .insert([
    {
      user_id: user.id,
      title: "🏧 Withdrawal Submitted",
      message: `Withdrawal request submitted successfully. You will receive KES ${amountToReceive.toLocaleString()}.`,
    },
  ]);

  setAmount("");
  setLoading(false);

  setPopupTitle("Success");
setPopupMessage(
  `Withdrawal request submitted successfully. You will receive KES ${amountToReceive.toLocaleString()}.`
);
setPopupColor("#28a745");
setPopupIcon("✅");
setShowPopup(true);
  }

  if (!user) {
  return <p style={{ padding: "20px" }}>Loading...</p>;
}
  
  return (
    <main className="container">

      <h1 style={{ marginBottom: "15px" }}>
        🏧 Withdraw Funds
      </h1>

      <div className="balance-card">
        <p>Available Balance</p>
        <h1>KES {Number(user?.balance || 0).toLocaleString()}</h1>
        <p>Minimum Withdrawal: KES 450</p>
      </div>

      <div
  className="announcement"
  style={{ marginTop: "20px" }}
>
  <h3>Withdrawal Details</h3>

  <div style={{ marginTop: "15px" }}>
    <label>M-PESA Number</label>

    <input
      type="text"
      value={user?.phone_number || ""}
      readOnly
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "8px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        background: "#f5f5f5"
      }}
    />
  </div>

  <div style={{ marginTop: "15px" }}>
  <label>Withdrawal Amount</label>

  <input
    type="number"
    placeholder="Enter Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginTop: "8px",
      borderRadius: "10px",
      border: "1px solid #ddd"
    }}
  />

  {amount && Number(amount) > 0 && (
    <div
      style={{
        marginTop: "12px",
        padding: "12px",
        background: "#f5f7fb",
        borderRadius: "10px"
      }}
    >
      <p
        style={{
          color: "#0A3D91",
          fontWeight: "bold"
        }}
      >
        You Will Receive: KES{" "}
        {(
          Number(amount) -
          Math.floor(Number(amount) * 0.05)
        ).toLocaleString()}
      </p>
    </div>
  )}
</div>

</div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Withdrawal Rules</h3>

        <p style={{ marginTop: "10px" }}>
          ✅ Minimum withdrawal amount is KES 450.
        </p>

        <p>
          ✅ Withdrawal fee is 5%. If you withdraw KES 500, you will receive KES 475.
        </p>

        <p>
          ✅ Ensure your M-Pesa number is correct.
        </p>
          
        <p>
          🕓 Withdrawal time is from 6:00 AM to 10:30 PM everyday.
        </p>
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
      margin: "20px auto"
    }}
  />
)}
  
  <button
  className="invest-btn"
  style={{ marginTop: "20px" }}
  onClick={handleWithdraw}
  disabled={loading}
>
  {loading ? "Processing..." : "SUBMIT WITHDRAWAL"}
</button>

  <a
  href="/withdraw-history"
  style={{
    display: "block",
    textAlign: "center",
    marginTop: "15px",
    color: "#0A3D91",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px"
  }}
>
  📋 View Withdrawal History
</a>

     <Popup
  show={showPopup}
  title={popupTitle}
  message={popupMessage}
  color={popupColor}
  icon={popupIcon}
  onClose={() => setShowPopup(false)}
/>

    </main>
  );
}
