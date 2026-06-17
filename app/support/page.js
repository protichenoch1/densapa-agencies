"use client";

import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { supabase } from "../../lib/supabase";

export default function SupportPage() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [adminTyping, setAdminTyping] = useState(false);
  const typingTimeout = useRef(null);
  const messagesEndRef = useRef(null);
const inputRef = useRef(null);
const [typing, setTyping] = useState(false);

  useEffect(() => {
  const savedUser = JSON.parse(
  localStorage.getItem("user") || "null"
);

if (
  savedUser &&
  savedUser.phone_number
) {
  setUser(savedUser);
} else {
  setUser(null);
}

  if (savedUser?.phone_number) {
  loadMessages();
  }
}, []);

useEffect(() => {
  if (!user?.phone_number) return;

  loadMessages();

  const channel = supabase
    .channel(`support-chat-${user.phone_number}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "support_chat",
        filter: `session_id=eq.${user.phone_number}`,
      },
      () => {
        loadMessages();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user]);

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  async function loadMessages() {
  if (!user?.phone_number) return;

  const { data, error } = await supabase
    .from("support_chat")
    .select("*")
    .eq("session_id", user.phone_number)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    return;
  }

  setMessages(data || []);

  setAdminTyping(
    data?.some(
      (msg) =>
        msg.sender === "ADMIN" &&
        msg.typing === true
    )
  );
  }

  async function sendMessage() {
  if (!newMessage.trim()) return;

  const sessionId = user?.phone_number;

  if (!sessionId) return;

  const { error } = await supabase
    .from("support_chat")
    .insert([
      {
        session_id: sessionId,
        phone_number: user.phone_number,
        sender: "USER",
        message: newMessage,
      },
    ]);

  if (error) {
    alert(error.message);
    console.log(error);
    return;
  }

  setNewMessage("");
  inputRef.current?.focus();
  loadMessages();
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
      <div
  style={{
    background: "#075E54",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 3px 10px rgba(0,0,0,.15)",
    flexShrink: 0,
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

    <p
      style={{
        margin: "5px 0 0 0",
        opacity: 0.9,
      }}
    >
      🟢 Online
    </p>

    {adminTyping && (
      <p
        style={{
          color: "#25D366",
          fontSize: "13px",
          marginTop: "3px",
          fontStyle: "italic",
        }}
      >
        typing...
      </p>
    )}
  </div>
</div>

    <div
  style={{
    flex: 1,
    overflowY: "auto",
    marginTop: "10px",
    background: "#F5F5F5",
    borderRadius: "15px",
    padding: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,.08)",
  }}
>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign:
                msg.sender === "USER" ? "right" : "left",
              marginBottom: "8px",
            }}
          >
            <div
  style={{
    display: "inline-block",
    background:
      msg.sender === "USER"
        ? "#DCF8C6"
        : "#FFFFFF",
    color: "#000",
    padding: "10px 14px",
    borderRadius:
      msg.sender === "USER"
        ? "12px 12px 3px 12px"
        : "12px 12px 12px 3px",
    maxWidth: "80%",
    boxShadow: "0 1px 2px rgba(0,0,0,.15)",
  }}
>
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

    {msg.sender === "USER" && (
      <span style={{ marginLeft: "6px" }}>
        {msg.is_read ? "✓✓" : "✓"}
      </span>
    )}
  </div>
</div>
          </div>
        ))}

          <div ref={messagesEndRef}></div>
          
      </div>

    <div
  style={{
    flexShrink: 0,
    background: "#fff",
    paddingTop: "8px",
  }}
>
  
  <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "8px",
    alignItems: "center",
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
  onChange={async (e) => {
    setNewMessage(e.target.value);

    setTyping(true);

    const sessionId = user?.phone_number;
    await supabase
      .from("support_chat")
      .update({ typing: true })
      .eq("session_id", sessionId);

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      setTyping(false);

      await supabase
        .from("support_chat")
        .update({ typing: false })
        .eq("session_id", sessionId);
    }, 2000);
  }}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  ➤
</button>
      </div>
    </div>
    </main>
  );
    }
