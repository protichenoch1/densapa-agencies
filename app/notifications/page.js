"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const savedNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );

    setNotifications(savedNotifications.reverse());
  }, []);

  return (
    <main className="container">
      <h1 style={{ marginBottom: "20px" }}>
        🔔 Notifications
      </h1>

      {notifications.length === 0 ? (
        <div
          className="announcement"
          style={{
            textAlign: "center",
            padding: "30px"
          }}
        >
          No notifications yet.
        </div>
      ) : (
        notifications.map((item, index) => (
          <div
            key={index}
            className="announcement"
            style={{
              marginBottom: "15px"
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                color: "#0A3D91"
              }}
            >
              {item.title}
            </div>

            <div
              style={{
                marginTop: "8px",
                color: "#666"
              }}
            >
              {item.message}
            </div>

            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "#999"
              }}
            >
              {item.date}
            </div>
          </div>
        ))
      )}

      <BottomNav />
    </main>
  );
              }
