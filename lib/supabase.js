import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://vhscpwaqskvdbngfjfgc.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoc2Nwd2Fxc2t2ZGJuZ2ZqZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NzEwMTQsImV4cCI6MjA5NjU0NzAxNH0.IPIGHhlWEIvXBvZxGv60MolsICZvvSSKPE4vRZk21sg";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
