"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function WithdrawPage() {
  const [user, setUser] = useState(null);
const [amount, setAmount] = useState("");
const [loading, setLoading] = useState(false);

  useEffect(() => {
  const savedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  setUser(savedUser);
}, []);

  async function handleWithdraw() {
  if (!amount || Number(amount) <= 0) {
    alert("Enter a valid amount");
    return;
  }

  if (Number(amount) < 450) {
    alert("Minimum withdrawal is KES 450");
    return;
  }

  if (Number(amount) > Number(user.balance || 0)) {
    alert("Insufficient balance");
    return;
  }

  setLoading(true);

  const { error } = await supabase
    .from("withdrawals")
    .insert([
      {
        user_id: user.id,
        amount: Number(amount),
        phone_number: user.phone_number,
        status: "PENDING",
      },
    ]);

  if (error) {
    setLoading(false);
    alert(error.message);
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

    const notifications = JSON.parse(
  localStorage.getItem("notifications") || "[]"
);

notifications.push({
  title: "🏧 Withdrawal",
  message: `Withdrawal request of KES ${Number(amount).toLocaleString()} submitted successfully.`,
  date: new Date().toLocaleString(),
});

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);

  setAmount("");
  setLoading(false);

  alert("Withdrawal request submitted successfully");
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
    <label>Withdrawal Number</label>

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
  </div>

</div>

      <div
        className="announcement"
        style={{ marginTop: "20px" }}
      >
        <h3>Withdrawal Rules</h3>

        <p style={{ marginTop: "10px" }}>
          ✅ Minimum withdrawal is KES 450
        </p>

        <p>
          ✅ Withdrawals are processed manually
        </p>

        <p>
          ✅ Ensure your M-Pesa number is correct
        </p>
      </div>

      <button
  className="invest-btn"
  style={{ marginTop: "20px" }}
  onClick={handleWithdraw}
  disabled={loading}
>
  {loading
    ? "Processing..."
    : "SUBMIT WITHDRAWAL"}
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

    </main>
  );
}
