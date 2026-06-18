import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
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
      const lastDate = investment.last_earnings_date
        ? new Date(investment.last_earnings_date)
        : null;

      // Pay only once every 24 hours
      if (
        !lastDate ||
        now - lastDate >= 24 * 60 * 60 * 1000
      ) {
        // Add daily income to user balance
        await supabase.rpc("increment_balance", {
          user_id_input: investment.user_id,
          amount_input: investment.daily_income,
        });

        // Update investment
        await supabase
          .from("investments")
          .update({
            earnings_paid: investment.earnings_paid + 1,
            last_earnings_date: now.toISOString(),
          })
          .eq("id", investment.id);
      }
    }

    return Response.json({
      success: true,
    });
  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
      }
