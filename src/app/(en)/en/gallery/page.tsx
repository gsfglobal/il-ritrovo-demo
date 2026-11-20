import { Shell } from '@/components/Shell';
import { GalleryPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('gallery', 'en', 'Gallery — Il Ritrovo Mamoiada', 'Dishes, dining room and atmosphere at Il Ritrovo, Mamoiada.');

export default function Page() {
  return (
    <Shell lang="en" current="gallery" >
      <GalleryPage lang="en" />
    </Shell>
  );
}
