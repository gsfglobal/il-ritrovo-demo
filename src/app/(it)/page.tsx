import { Shell } from '@/components/Shell';
import { HomePage } from '@/components/HomePage';
import { meta } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { restaurantJsonLd } from '@/lib/seo';

export const metadata = meta('home', 'it', 'Il Ritrovo Mamoiada — Ristorante tipico sardo e pizzeria in Barbagia', 'Ristorante tipico sardo e pizzeria nel centro di Mamoiada (NU): malloreddus, culurgiones, seadas, pizza. Vicino al Museo delle Maschere. Prenota: +39 388 568 3057.');

export default function Page() {
  return (
    <Shell lang="it" current="home" overHero>
      <JsonLd data={restaurantJsonLd('it')} />
      <HomePage lang="it" />
    </Shell>
  );
}
