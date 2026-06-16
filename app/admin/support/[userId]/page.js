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

  function formatDate(dateString) {
  const date = new Date(dateString);

  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  }

  return (
    <main className="container">
      <h1>💬 Customer Support</h1>

      <p>{user?.phone_number}</p>

      <div
  style={{
    marginTop: "20px",
    background: "#ECE5DD",
    borderRadius: "15px",
    padding: "15px",
    height: "500px",
    overflowY: "auto",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  }}
>

        {
  (() => {
    let lastDate = "";

    return messages.map((msg) => {
      const currentDate = formatDate(msg.created_at);

      const showDate = currentDate !== lastDate;

      lastDate = currentDate;

      return (

    <React.Fragment key={msg.id}>
  {showDate && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      margin: "20px 0",
    }}
  >
    <div
      style={{
        background: "#e5e5e5",
        color: "#666",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {currentDate}
    </div>
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
        ? "#DCF8C6"
        : "#fff",
    color: "#000",
    padding: "10px 14px",
    borderRadius:
      msg.sender === "ADMIN"
        ? "18px 18px 4px 18px"
        : "18px 18px 18px 4px",
    maxWidth: "75%",
    boxShadow: "0 1px 3px rgba(0,0,0,.12)",
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
    });
  })()
              }

          <div ref={messagesEndRef}></div>
      </div>

      <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    alignItems: "center",
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "20px",
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
  padding: "14px 18px",
  borderRadius: "30px",
  border: "none",
  outline: "none",
  background: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,.15)",
  fontSize: "15px",
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
