import { createClient } from "@supabase/supabase-js";
import settings from "./settings.json";

export const supabase = createClient(
  settings.supabaseUrl,
  settings.supabaseAnonKey,
);
