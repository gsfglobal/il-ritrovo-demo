import { Shell } from '@/components/Shell';
import { ReviewsPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('reviews', 'en', 'Reviews — 4.5/5 on Tripadvisor & Google | Il Ritrovo Mamoiada', 'What guests say about Il Ritrovo in Mamoiada: 4.5/5 on Tripadvisor and Google.');

export default function Page() {
  return (
    <Shell lang="en" current="reviews" >
      <ReviewsPage lang="en" />
    </Shell>
  );
}
