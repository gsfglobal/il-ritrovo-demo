import { Shell } from '@/components/Shell';
import { ContactPage } from '@/components/Pages';
import { meta } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { restaurantJsonLd } from '@/lib/seo';

export const metadata = meta('contact', 'en', 'Booking & contact — Il Ritrovo, Mamoiada', 'Book a table at Il Ritrovo, Mamoiada: +39 388 568 3057. Corso Vittorio Emanuele III, 101. Closed on Mondays.');

export default function Page() {
  return (
    <Shell lang="en" current="contact" >
      <JsonLd data={restaurantJsonLd('en')} />
      <ContactPage lang="en" />
    </Shell>
  );
}
