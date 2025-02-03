import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://audryhcqqwrzxdxqnvyu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5...";
export const supabase = createClient(supabaseUrl, supabaseKey);
