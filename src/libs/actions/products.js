import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export async function getProducts(filter) {
  let query = supabase.from("producto").select("*");

  if (filter) {
    query = query.ilike("category", `%${filter}%`);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  
  return data;
}