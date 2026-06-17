"use client";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../../lib/supabase";

export default function ContactSupportPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adminTyping, setAdminTyping] = useState(false);

  const typingTimeout = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (phoneNumber) {
      loadMessages();
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (!phoneNumber) return;

    const channel = supabase
      .channel("guest-support-chat")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "support_chat",
          filter: `session_id=eq.${phoneNumber}`,
        },
        () => {
          loadMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [phoneNumber]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function loadMessages() {
    if (!phoneNumber) return;

    const { data } = await supabase
      .from("support_chat")
      .select("*")
      .eq("session_id", phoneNumber)
      .order("created_at", { ascending: true });

    setMessages(data || []);

    const isAdminTyping = data?.some(
      (msg) =>
        msg.sender === "ADMIN" &&
        msg.typing === true
    );

    setAdminTyping(isAdminTyping);
  }

  async function sendMessage() {
    if (!phoneNumber) {
      alert("Enter your phone number first");
      return;
    }

    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from("support_chat")
      .insert([
        {
          session_id: phoneNumber,
          phone_number: phoneNumber,
          sender: "USER",
          message: newMessage,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setNewMessage("");
    inputRef.current?.focus();

    loadMessages();
  }

  return (
    <main
      style={{
        maxWidth: "500px",
        margin: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "15px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#075E54",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "15px",
          display: "flex",
          gap: "15px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#128C7E",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
          }}
        >
          👨‍💼
        </div>

        <div>
          <h2 style={{ margin: 0 }}>
            Customer Support
          </h2>

          <p style={{ margin: "5px 0 0" }}>
            🟢 Online
          </p>

          {adminTyping && (
            <p
              style={{
                color: "#25D366",
                fontSize: "13px",
                fontStyle: "italic",
              }}
            >
              typing...
            </p>
          )}
        </div>
      </div>

      {/* Phone input */}
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "15px",
          border: "1px solid #ddd",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      />

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#F5F5F5",
          borderRadius: "15px",
          padding: "15px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign:
                msg.sender === "USER"
                  ? "right"
                  : "left",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background:
                  msg.sender === "USER"
                    ? "#DCF8C6"
                    : "#fff",
                padding: "10px 14px",
                borderRadius: "15px",
                maxWidth: "80%",
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input area */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          background: "#f0f0f0",
          padding: "10px",
          borderRadius: "20px",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flex: 1,
            padding: "14px 18px",
            borderRadius: "30px",
            border: "none",
            background: "#fff",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "none",
            background: "#25D366",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ➤
        </button>
      </div>
    </main>
  );
              }
