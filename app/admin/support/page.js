"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export default function AdminSupport() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { data } = await supabase
      .from("support_chat")
      .select("session_id, phone_number")
      .order("created_at", { ascending: false });

    if (!data) return;

    const uniqueSessions = [
  ...new Set(data.map((item) => item.session_id)),
];

    async function loadUsers() {
  const { data } = await supabase
    .from("support_chat")
    .select("session_id, phone_number, is_read, sender")
    .order("created_at", { ascending: false });

  if (!data) return;

  const uniqueSessions = [
    ...new Set(data.map((item) => item.session_id)),
  ];

  const usersData = [];

  for (const sessionId of uniqueSessions) {
    const chat = data.find(
      (item) => item.session_id === sessionId
    );

    const unread = data.filter(
      (item) =>
        item.session_id === sessionId &&
        item.sender === "USER" &&
        item.is_read === false
    ).length;

    usersData.push({
      sessionId,
      phone_number: chat.phone_number,
      unread,
    });
  }

  setUsers(usersData);
    }

  return (
    <main className="container">
      <h1>💬 Customer Support</h1>

      {users.map((user) => (
        <div
          key={user.sessionId}
          className="announcement"
          style={{
            marginTop: "15px",
          }}
        >
          <h3>
  Customer

  {user.unread > 0 && (
    <span
      style={{
        background: "red",
        color: "#fff",
        borderRadius: "50%",
        padding: "4px 10px",
        fontSize: "12px",
        marginLeft: "10px",
      }}
    >
      {user.unread}
    </span>
  )}
</h3>

          <p>{user.phone_number}</p>

          <Link href={`/admin/support/${user.sessionId}`}>
            <button
              className="invest-btn"
              style={{
                marginTop: "10px",
              }}
            >
              Open Chat
            </button>
          </Link>
        </div>
      ))}
    </main>
  );
}
