"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";

export default function EarningsPage() {
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    async function loadEarnings() {
      const savedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!savedUser.id) return;

const { data, error } = await supabase
  .from("earnings_history")
  .select("*")
  .eq("user_id", savedUser.id)
  .order("created_at", {
    ascending: false,
  });

      if (!error) {
        setEarnings(data || []);
      }
    }

    loadEarnings();
  }, []);

  return (
    <main className="container">
      <h2>Daily Earnings History</h2>

      {earnings.length === 0 ? (
        <p>No earnings yet.</p>
      ) : (
        earnings.map((item) => (
          <div
            key={item.id}
            className="record-card"
          >
            <h3>
              KES {Number(item.amount).toLocaleString()}
            </h3>

            <p>
              {new Date(
                item.created_at
              ).toLocaleString()}
            </p>
          </div>
        ))
      )}

      <BottomNav />
    </main>
  );
        }
