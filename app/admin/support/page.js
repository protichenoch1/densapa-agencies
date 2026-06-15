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
      .select("user_id")
      .order("created_at", { ascending: false });

    if (!data) return;

    const uniqueUsers = [
      ...new Set(data.map((item) => item.user_id)),
    ];

    const usersData = [];

    for (const id of uniqueUsers) {
      const { data: user } = await supabase
        .from("users")
        .select("full_name, phone_number")
        .eq("id", id)
        .single();

      if (user) {
        const { count } = await supabase
  .from("support_chat")
  .select("*", { count: "exact", head: true })
  .eq("user_id", id)
  .eq("sender", "USER")
  .eq("is_read", false);

usersData.push({
  id,
  ...user,
  unread: count || 0,
});
      }
    }

    setUsers(usersData);
  }

  return (
    <main className="container">
      <h1>💬 Customer Support</h1>

      {users.map((user) => (
        <div
          key={user.id}
          className="announcement"
          style={{
            marginTop: "15px",
          }}
        >
          <h3>{user.full_name}</h3>

          <p>{user.phone_number}</p>

          <Link href={`/admin/support/${user.id}`}>
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
