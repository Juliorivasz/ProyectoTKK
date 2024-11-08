import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export async function getProducts() {
  const { data } = await supabase.from("producto").select("*");
  return data;
}