"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
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

    if (minutes < 60)
      return `${minutes} mins ago`;

    if (hours === 1) return "1 hour ago";

    if (hours < 24)
      return `${hours} hours ago`;

    if (days === 1) return "Yesterday";

    if (days < 7)
      return `${days} days ago`;

    return new Date(date + "Z")
      .toLocaleDateString("en-KE");
  }

  return (
    <main className="container">

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => window.history.back()}
          style={{
            border: "none",
            background: "transparent",
            color: "#0A3D91",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            color: "#0A3D91",
          }}
        >
          Notifications
        </h2>

        <div style={{ width: "50px" }}></div>
      </div>

      <button
        onClick={async () => {
          await supabase
            .from("notifications")
            .update({
              is_read: true,
            })
            .eq("user_id", user.id)
            .eq("is_read", false);

          setNotifications((prev) =>
            prev.map((item) => ({
              ...item,
              is_read: true,
            }))
          );

          window.dispatchEvent(
            new Event("notifications-read")
          );
        }}
        style={{
          background: "#0A3D91",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "8px 15px",
          marginBottom: "15px",
          fontSize: "13px",
        }}
      >
        ✓ Mark all as read
      </button>

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
              backgroundColor: item.is_read
                ? "#fff"
                : "#f3f3f3",
              borderLeft: item.is_read
                ? "none"
                : "4px solid #0A3D91",
            }}
          >
            <h3>{item.title}</h3>

            <p
              style={{
                marginTop: "10px",
              }}
            >
              {item.message}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              <span>
                {timeAgo(item.created_at + "Z")}
              </span>

              <span>
                {new Date(
                  item.created_at + "Z"
                ).toLocaleString(
                  "en-KE",
                  {
                    timeZone:
                      "Africa/Nairobi",
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
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
