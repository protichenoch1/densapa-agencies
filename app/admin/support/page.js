"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminSupportPage() {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");

  async function loadMessages() {
    const { data } = await supabase
      .from("support_chat")
      .select("*")
      .order("created_at", { ascending: true });

    setMessages(data || []);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function sendReply(userId) {
    if (!reply.trim()) return;

    await supabase.from("support_chat").insert([
      {
        user_id: userId,
        sender: "ADMIN",
        message: reply,
      },
    ]);

    setReply("");
    loadMessages();
  }

  return (
    <main className="container">
      <h1>💬 Customer Support Admin</h1>

      {messages.map((msg) => (
        <div
          key={msg.id}
          className="announcement"
          style={{ marginTop: "15px" }}
        >
          <p>
            <strong>User ID:</strong> {msg.user_id}
          </p>

          <p>
            <strong>{msg.sender}:</strong> {msg.message}
          </p>

          {msg.sender === "USER" && (
            <>
              <input
                type="text"
                placeholder="Type reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />

              <button
                className="invest-btn"
                style={{ marginTop: "10px" }}
                onClick={() => sendReply(msg.user_id)}
              >
                Send Reply
              </button>
            </>
          )}
        </div>
      ))}
    </main>
  );
    }
