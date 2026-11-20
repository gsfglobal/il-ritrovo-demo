import { Shell } from '@/components/Shell';
import { GalleryPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('gallery', 'it', 'Gallery — Il Ritrovo Mamoiada', 'Piatti, sala e atmosfera del ristorante Il Ritrovo a Mamoiada.');

export default function Page() {
  return (
    <Shell lang="it" current="gallery" >
      <GalleryPage lang="it" />
    </Shell>
  );
}
