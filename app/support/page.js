"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SupportPage() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setUser(savedUser);

    loadMessages();
  }, []);

  useEffect(() => {
  const sessionId =
    localStorage.getItem("support_session");

  if (!sessionId) return;

  const channel = supabase
    .channel("support-chat")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "support_chat",
        filter: `session_id=eq.${sessionId}`,
      },
      () => {
        loadMessages();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  async function loadMessages() {
  const sessionId = localStorage.getItem("support_session");

  if (!sessionId) return;

  const { data } = await supabase
    .from("support_chat")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  setMessages(data || []);
  }

  async function sendMessage() {
  if (!newMessage.trim()) return;

  // Get session id from localStorage
  let sessionId = localStorage.getItem("support_session");

  // Create one if it doesn't exist
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("support_session", sessionId);
  }

  await supabase
    .from("support_chat")
    .insert([
      {
        session_id: sessionId,
        phone_number: phoneNumber,
        sender: "USER",
        message: newMessage,
      },
    ]);

  setNewMessage("");
  loadMessages();
  }

  return (
    <main className="container">
      <h1>💬 Customer Support</h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "15px",
          minHeight: "400px",
          marginTop: "20px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign:
                msg.sender === "USER" ? "right" : "left",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background:
                  msg.sender === "USER"
                    ? "#0A3D91"
                    : "#f0f0f0",
                color:
                  msg.sender === "USER"
                    ? "#fff"
                    : "#000",
                padding: "12px",
                borderRadius: "15px",
                maxWidth: "80%",
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

    <input
  type="tel"
  placeholder="Enter your phone number"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "15px"
  }}
/>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) =>
            setNewMessage(e.target.value)
          }
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <button
          className="invest-btn"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </main>
  );
    }
