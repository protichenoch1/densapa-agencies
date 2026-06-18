import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    // Get active investments
    const { data: investments, error } = await supabase
      .from("investments")
      .select("*")
      .eq("status", "active");

    if (error) throw error;

    const now = new Date();

    for (const investment of investments) {
      const lastEarning = investment.last_earning_date
        ? new Date(investment.last_earning_date)
        : new Date(investment.created_at);

      const hoursPassed =
        (now - lastEarning) / (1000 * 60 * 60);

      if (hoursPassed >= 24) {
        // Get user balance
        const { data: user } = await supabase
          .from("users")
          .select("balance")
          .eq("id", investment.user_id)
          .single();

        if (!user) continue;

        // Add daily income to balance
        await supabase
          .from("users")
          .update({
            balance:
              Number(user.balance || 0) +
              Number(investment.daily_income || 0),
          })
          .eq("id", investment.user_id);

        // Save earnings history
await supabase
  .from("earnings_history")
  .insert([
    {
      phone_number: investment.phone_number,
      investment_id: investment.id,
      amount: investment.daily_income,
    },
  ]);

        await supabase
  .from("notifications")
  .insert([
    {
      user_id: investment.user_id,
      title: "🎉 Daily Earnings",
      message: `KES ${Number(
        investment.daily_income
      ).toLocaleString()} has been credited to your account.`,
      is_read: false,
    },
  ]);
        
        // Update investment
const newEarningsPaid =
  Number(investment.earnings_paid || 0) + 1;

const updateData = {
  earnings_paid: newEarningsPaid,
  last_earning_date: now.toISOString(),
};

if (
  newEarningsPaid >=
  Number(investment.days)
) {
  updateData.status = "Completed";
}

await supabase
  .from("investments")
  .update(updateData)
  .eq("id", investment.id);
      }
    }

    return Response.json({
      success: true,
      message: "Earnings processed",
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
    }
