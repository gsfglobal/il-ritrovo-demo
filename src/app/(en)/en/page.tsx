import { Shell } from '@/components/Shell';
import { HomePage } from '@/components/HomePage';
import { meta } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { restaurantJsonLd } from '@/lib/seo';

export const metadata = meta('home', 'en', 'Il Ritrovo Mamoiada — Traditional Sardinian restaurant & pizzeria', 'Traditional Sardinian restaurant and pizzeria in the centre of Mamoiada, Barbagia: malloreddus, culurgiones, seadas, pizza. Book: +39 388 568 3057.');

export default function Page() {
  return (
    <Shell lang="en" current="home" overHero>
      <JsonLd data={restaurantJsonLd('en')} />
      <HomePage lang="en" />
    </Shell>
  );
}
