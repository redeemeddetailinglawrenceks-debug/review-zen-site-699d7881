
DROP POLICY "Anyone can submit a review" ON public.reviews;

CREATE POLICY "Anyone can submit a valid review"
  ON public.reviews FOR INSERT
  WITH CHECK (
    char_length(trim(name)) BETWEEN 1 AND 80
    AND char_length(trim(body)) BETWEEN 1 AND 1000
    AND rating BETWEEN 1 AND 5
  );
