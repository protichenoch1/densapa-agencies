"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

export default function ChatPage() {
  const params = useParams();

const userId = Array.isArray(params.userId)
  ? params.userId[0]
  : params.userId;

  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
  if (userId) {
    loadChat();
  }
}, [userId]);

  useEffect(() => {
  const channel = supabase
    .channel("admin-support-chat")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "support_chat",
        filter: `session_id=eq.${userId}`,
      },
      () => {
        loadChat();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  async function loadChat() {
    // Load messages
const { data } = await supabase
  .from("support_chat")
  .select("*")
  .eq("session_id", userId)
  .order("created_at", { ascending: true });

// Mark all user messages as read
await supabase
  .from("support_chat")
  .update({ is_read: true })
  .eq("session_id", userId)
  .eq("sender", "USER");

setMessages(data || []);

    if (data && data.length > 0) {
  setUser({
    phone_number: data[0].phone_number,
  });
    }
  }

  async function sendReply() {
    if (!reply.trim()) return;

    await supabase
  .from("support_chat")
  .insert([
    {
      session_id: userId,
      phone_number: user?.phone_number,
      sender: "ADMIN",
      message: reply,
    },
  ]);

    setReply("");
    inputRef.current?.focus();

    loadChat();
  }

  return (
    <main className="container">
      <h1>💬 Customer Support</h1>

      <p>{user?.phone_number}</p>

      <div
  style={{
    marginTop: "20px",
    background: "#fff",
    borderRadius: "15px",
    padding: "15px",
    height: "500px",
    overflowY: "auto",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  }}
>

        {messages.map((msg) => {
  const currentDate = new Date(
    msg.created_at
  ).toLocaleDateString();

  const showDate = currentDate !== lastDate;

  lastDate = currentDate;

          let lastDate = "";

  return (

    <React.Fragment key={msg.id}>
  {showDate && (
    <div
      style={{
        textAlign: "center",
        margin: "20px 0",
        color: "#888",
        fontSize: "13px",
        fontWeight: "bold",
      }}
    >
      {currentDate}
    </div>
  )}
          <div
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
              <div>
  <div>{msg.message}</div>

  <div
    style={{
      fontSize: "11px",
      marginTop: "5px",
      opacity: 0.7,
      textAlign: "right",
    }}
  >
    {new Date(msg.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}

    {msg.sender === "ADMIN" && (
      <span style={{ marginLeft: "6px" }}>
        {msg.is_read ? "✓✓" : "✓"}
      </span>
    )}
  </div>
</div>
            </div>
          </div>
        </React.Fragment>
  );
})}

          <div ref={messagesEndRef}></div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          ref={inputRef}
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
