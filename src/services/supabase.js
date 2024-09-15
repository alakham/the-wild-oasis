import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rrlzrmnbsavzuotjynof.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJybHpybW5ic2F2enVvdGp5bm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNTEyMzksImV4cCI6MjAzOTcyNzIzOX0.mcC2830J6iPkY7A4jZ_FXGljedPTvQ-xvrp6gQii7LM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
