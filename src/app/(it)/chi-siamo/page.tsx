import { Shell } from '@/components/Shell';
import { AboutPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('about', 'it', 'Chi siamo — Il Ritrovo, ristorante a Mamoiada', 'Il Ritrovo: ospitalità sarda, porzioni generose e prezzi onesti sul Corso di Mamoiada, in provincia di Nuoro.');

export default function Page() {
  return (
    <Shell lang="it" current="about" >
      <AboutPage lang="it" />
    </Shell>
  );
}
