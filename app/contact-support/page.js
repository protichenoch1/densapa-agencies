"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ContactSupport() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  async function sendMessage() {
    if (!phoneNumber || !message) {
      alert("Fill all required fields");
      return;
    }

    const { error } = await supabase
      .from("support_requests")
      .insert([
        {
          full_name: fullName,
          phone_number: phoneNumber,
          message: message,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Message sent successfully");

    setFullName("");
    setPhoneNumber("");
    setMessage("");
  }

  return (
    <main className="container">
      <h1>💬 Contact Support</h1>

      <div className="announcement" style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Full Name (Optional)"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <textarea
          placeholder="Describe your problem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <button
          className="invest-btn"
          style={{ marginTop: "15px" }}
          onClick={sendMessage}
        >
          Send Message
        </button>
      </div>
    </main>
  );
    }
