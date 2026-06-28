import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export type Review = {
  id: string;
  name: string;
  rating: number;
  body: string;
  created_at: string;
};

export const reviewSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80, "Max 80 characters"),
  rating: z.number().int().min(1).max(5),
  body: z.string().trim().min(1, "Please share a few words").max(1000, "Max 1000 characters"),
});

export async function fetchReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, body, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  return data ?? [];
}

export async function submitReview(input: z.infer<typeof reviewSchema>): Promise<Review> {
  const parsed = reviewSchema.parse(input);
  const { data, error } = await supabase
    .from("reviews")
    .insert(parsed)
    .select("id, name, rating, body, created_at")
    .single();
  if (error) throw error;
  return data;
}
