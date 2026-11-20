import { Shell } from '@/components/Shell';
import { ReviewsPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('reviews', 'it', 'Recensioni — 4,5/5 su Tripadvisor e Google | Il Ritrovo Mamoiada', 'Cosa dicono gli ospiti del Ritrovo di Mamoiada: 4,5/5 su Tripadvisor (186 recensioni) e Google (313 recensioni).');

export default function Page() {
  return (
    <Shell lang="it" current="reviews" >
      <ReviewsPage lang="it" />
    </Shell>
  );
}
