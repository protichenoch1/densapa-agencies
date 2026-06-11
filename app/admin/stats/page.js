"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminStats() {
  const [stats, setStats] = useState({
    users: 0,
    deposits: 0,
    withdrawals: 0,
    investments: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { count: users } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    const { count: deposits } = await supabase
      .from("deposits")
      .select("*", { count: "exact", head: true });

    const { count: withdrawals } = await supabase
      .from("withdrawals")
      .select("*", { count: "exact", head: true });

    const { count: investments } = await supabase
      .from("investments")
      .select("*", { count: "exact", head: true });

    setStats({
      users: users || 0,
      deposits: deposits || 0,
      withdrawals: withdrawals || 0,
      investments: investments || 0,
    });
  }

  return (
    <main className="container">
      <h1>📊 Statistics</h1>

      <div className="announcement">
        <h3>Total Users</h3>
        <h2>{stats.users}</h2>
      </div>

      <div className="announcement">
        <h3>Total Deposits</h3>
        <h2>{stats.deposits}</h2>
      </div>

      <div className="announcement">
        <h3>Total Withdrawals</h3>
        <h2>{stats.withdrawals}</h2>
      </div>

      <div className="announcement">
        <h3>Total Investments</h3>
        <h2>{stats.investments}</h2>
      </div>
    </main>
  );
    }
