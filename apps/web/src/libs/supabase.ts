import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export default createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);
