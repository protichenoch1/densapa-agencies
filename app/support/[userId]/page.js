"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

export default function ChatPage() {
  const params = useParams();
  const userId = params.userId;

  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadChat();
  }, []);

  async function loadChat() {
    // Load user details
    const { data: userData } = await supabase
      .from("users")
      .select("full_name, phone_number")
      .eq("id", userId)
      .single();

    setUser(userData);

    // Load messages
    const { data } = await supabase
      .from("support_chat")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    setMessages(data || []);
  }

  async function sendReply() {
    if (!reply.trim()) return;

    await supabase
      .from("support_chat")
      .insert([
        {
          user_id: userId,
          sender: "ADMIN",
          message: reply,
        },
      ]);

    setReply("");

    loadChat();
  }

  return (
    <main className="container">
      <h1>
        💬 {user?.full_name}
      </h1>

      <p>{user?.phone_number}</p>

      <div
        style={{
          marginTop: "20px",
          background: "#fff",
          borderRadius: "15px",
          padding: "15px",
          minHeight: "400px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign:
                msg.sender === "ADMIN"
                  ? "right"
                  : "left",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background:
                  msg.sender === "ADMIN"
                    ? "#0A3D91"
                    : "#f1f1f1",
                color:
                  msg.sender === "ADMIN"
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

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Type reply..."
          value={reply}
          onChange={(e) =>
            setReply(e.target.value)
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
          onClick={sendReply}
        >
          Send
        </button>
      </div>
    </main>
  );
             }
