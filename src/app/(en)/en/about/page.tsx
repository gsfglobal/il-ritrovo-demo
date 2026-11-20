import { Shell } from '@/components/Shell';
import { AboutPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('about', 'en', 'About — Il Ritrovo, restaurant in Mamoiada', 'Il Ritrovo: Sardinian hospitality, generous portions and honest prices on Mamoiada’s main street.');

export default function Page() {
  return (
    <Shell lang="en" current="about" >
      <AboutPage lang="en" />
    </Shell>
  );
}
