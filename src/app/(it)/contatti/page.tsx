import { Shell } from '@/components/Shell';
import { ContactPage } from '@/components/Pages';
import { meta } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { restaurantJsonLd } from '@/lib/seo';

export const metadata = meta('contact', 'it', 'Prenota e contatti — Il Ritrovo, Corso V. Emanuele III 101, Mamoiada', 'Prenota un tavolo al Ritrovo di Mamoiada: +39 388 568 3057. Corso Vittorio Emanuele III, 101 — 08024 Mamoiada (NU). Lunedì chiuso.');

export default function Page() {
  return (
    <Shell lang="it" current="contact" >
      <JsonLd data={restaurantJsonLd('it')} />
      <ContactPage lang="it" />
    </Shell>
  );
}
