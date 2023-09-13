import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kmatyrjalsphuypxgchx.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttYXR5cmphbHNwaHV5cHhnY2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0MDk3MzgsImV4cCI6MjAwOTk4NTczOH0.as2I9YdaICbCZ4O4VH4ftl823j011cuL0gajLUMkv_I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
