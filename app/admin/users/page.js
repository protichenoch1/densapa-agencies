"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { data } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    setUsers(data || []);
  }

  return (
    <main className="container">
      <h1>👥 Users</h1>

      {users.map((user) => (
        <div
          key={user.id}
          className="announcement"
          style={{ marginBottom: "15px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}
          >
            <span><strong>Name:</strong></span>
            <span>{user.full_name}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}
          >
            <span><strong>Phone:</strong></span>
            <span>{user.phone_number}</span>
          </div>

            <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  }}
>
  <span><strong>Status:</strong></span>
  <span
    style={{
      background: "#28a745",
      color: "#fff",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "12px"
    }}
  >
    ACTIVE
  </span>
</div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}
          >
            <span><strong>Balance:</strong></span>
            <span
  style={{
    color: "#28a745",
    fontWeight: "bold"
  }}
>
  KES {Number(user.balance || 0).toLocaleString()}
</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span><strong>Joined:</strong></span>
            <span>
              {new Date(user.created_at + "Z").toLocaleString(
  "en-KE",
  {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }
)}
            </span>
          </div>
        </div>
      ))}
    </main>
  );
            }
