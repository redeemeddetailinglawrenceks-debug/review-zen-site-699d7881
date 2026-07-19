CREATE POLICY "Anyone can delete a review" ON public.reviews FOR DELETE USING (true);
GRANT DELETE ON public.reviews TO anon;
GRANT DELETE ON public.reviews TO authenticated;