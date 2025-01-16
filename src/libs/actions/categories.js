import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export async function getCategories() {
  let query = supabase.from("producto").select("category");


  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  
  return data;
}