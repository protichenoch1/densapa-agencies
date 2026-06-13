"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

  if (!user.id) return;

  async function loadNotifications() {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (!error) {
    setNotifications(data || []);

    await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("user_id", user.id)
      .eq("is_read", false);

    window.dispatchEvent(
  new Event("notifications-read")
);
  }
    }

loadNotifications();

  const channel = supabase
    .channel("notifications-channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
  setNotifications((prev) => [
    payload.new,
    ...prev,
  ]);

  supabase
    .from("notifications")
    .update({
      is_read: true,
    })
    .eq("id", payload.new.id);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  function timeAgo(date) {
  const seconds = Math.floor(
    (new Date() - new Date(date)) / 1000
  );

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";

  if (minutes === 1) return "1 min ago";
  if (minutes < 60) return `${minutes} mins ago`;

  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;

  if (days === 1) return "Yesterday";

  if (days < 7) return `${days} days ago`;

  return new Date(date).toLocaleDateString("en-KE");
  }

  return (
    <main className="container">
      <h1>🔔 Notifications</h1>

      {notifications.length === 0 ? (
        <div className="announcement">
          No notifications yet.
        </div>
      ) : (
        notifications.map((item) => (
          <div
            key={item.id}
            className="announcement"
            style={{
              marginTop: "15px",
            }}
          >
            <h3>{item.title}</h3>

            <p style={{ marginTop: "10px" }}>
              {item.message}
            </p>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "12px",
    color: "#888"
  }}
>
  <span>
    {timeAgo(item.created_at)}
  </span>

  <span>
    {new Date(item.created_at + "Z").toLocaleString(
      "en-KE",
      {
        timeZone: "Africa/Nairobi",
        day: "numeric",
        month: "short",
        hour12: "numeric",
        minute: "2-digit"
      }
    )}
  </span>
</div>
          </div>
        ))
      )}
    </main>
  );
              }
