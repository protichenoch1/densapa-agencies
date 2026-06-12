"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user.id) return;

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (!error) {
        setNotifications(data || []);
      }
    }

    loadNotifications();
  }, []);

  function timeAgo(date) {
    const seconds =
      Math.floor(
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

    return `${days} days ago`;
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

            <small
              style={{
                color: "#888",
              }}
            >
              {timeAgo(item.created_at)}
            </small>
          </div>
        ))
      )}
    </main>
  );
              }
